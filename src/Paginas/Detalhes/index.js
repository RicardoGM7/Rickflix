import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import './detalhes.css'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, fire } from '../../firebase'
import {doc, deleteDoc, onSnapshot, collection, addDoc} from 'firebase/firestore'





import api from '../../services/api';


function Filme(){
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [name,setName] = useState('');
  const [comentario, setComentario] = useState('')
  const [email, setEmail] = useState('')
  const [listaComents, setListaComents] = useState([])
  const [uid, setUid] = useState('')
  const [idPost, setIdPost] = useState()


//carregando filme da api
  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("FILME NAO ENCONTRADO")
      })
    }

    loadFilme();


    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [id])

  //salvando filme no local storage 
  function SalvarFilme() {
    const minhaLista = localStorage.getItem("@listadefilmes")
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (item) => item.id === filme.id)
    
    if(hasFilme){
      toast.error('Esse filme já está salvo')
      return;
    }
    filmesSalvos.push(filme)
    localStorage.setItem("@listadefilmes", JSON.stringify(filmesSalvos))
    toast.success('Filme salvo som sucesso!')
  }

  //carregando informações do login
  useEffect(()=> {
      const unsubscribe = onAuthStateChanged(auth, (user)=> {

        if(user){
          setName(user.displayName || "Usuário Anônimo")
          setEmail(user.email)
          setUid(user.uid)
        } else {
          setName('Usuário')
        }
      })
      return () => unsubscribe();
  },[])

  //publicando comentario
  async function publicar() {
    try {
      const docRef = await addDoc(
        collection(fire, 'filmes', filme.title, 'comentarios'),
        { uid, name, email, comentario }
      );
  
      setIdPost(docRef.id);
      toast.success('Comentário publicado');
      setComentario('');
    } catch (erro) {
      toast.error('Erro ao comentar: ' + erro);
    }
  }
  
  //carregando comentarios
  useEffect(()=>{
    if(!filme.title) return;

    async function loadPosts(){
      const posts = onSnapshot(collection(fire, 'filmes', filme.title,'comentarios'),(snapshot)=>{
        let lista = [];

        snapshot.forEach((infos)=>{
          lista.push({...infos.data(), idPost: infos.id})
         })
         
         setListaComents(lista)

      })}
    
  loadPosts();},[filme.title])
   
  //Excluir comentário
  async function ExcluirComentário(id) {
    const docDel = doc(fire, 'filmes', filme.title, 'comentarios', id) 
    await deleteDoc(docDel)
    .then(()=>{
      toast.success('Comentário excluido com sucesso')
    })  
  }
  
  
  
  //loading
  if(loading){
    return(
        <div className='container'>
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
      </div>
    )
  }




  
  return(
    <>
    <div id='container-filmes'>
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
    <div className='detalhes-filme'> 
      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>
      <strong>Avalição: {filme.vote_average} / 10</strong>
      <div>
      <button><a target='blank' href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a></button>
      <button onClick= {SalvarFilme} >Salvar</button>
      </div>
    </div> 
    </div>
    </div>

    <div className='container-comentarios'>
    <h2>Comentários</h2>


    {(email) ? (<div className='comentarios'>
    <p>Seja bem vindo, {name}</p>
    <input value={comentario} onChange={(e)=>{ setComentario(e.target.value)}} type='text' placeholder='Comente sua opinião sobre o filme.'/>
    <div id='publicar'>
   <button onClick={publicar} >Publicar</button>
    </div>
    </div>) : <div className='comentarios'>
      <p>Faça login para conseguir comentar:</p>
      <Link to='/login'>Entrar</Link>
      </div>}


    <div id='linha'></div>
    
    {listaComents.map((posts)=>{
      return(
        <div className='comentarios-postados'  key={posts.uid}>
          <strong>{posts.name}</strong>
          <p>{posts.comentario}</p>

        {posts.email == email && <button onClick={()=>{ExcluirComentário(posts.idPost)}} >Excluir Comentário</button>}
        </div>
      )
    
    })}

    </div>
    </>


    
  )
}

export default Filme;