import { useState,useEffect } from "react"
import { Link } from "react-router-dom";
import "./index.css"
import { toast } from 'react-toastify'

function MeusFilmes () {
    const [FilmesSalvos, setFilmesSalvos] = useState([]);
    useEffect(()=>{
        

        const listaSalva = localStorage.getItem('@listadefilmes')
        let lista = JSON.parse(listaSalva)
        setFilmesSalvos(lista)
    }, [])

    function Excluir(id) {
        let filtroId = FilmesSalvos.filter( (item)=>{
            return(item.id !== id)

        })
        toast.success('Filme excluido da sua lista')
        setFilmesSalvos(filtroId)
        localStorage.setItem('@listadefilmes', JSON.stringify(filtroId))
    }
    



    return(
        <div className="container-geral">
            
        <div className="container-lista"> 
        <h1>Meus Filmes Salvos</h1> 
        {FilmesSalvos.length === 0 && <article className="linha-salvos">Você não tem nenhum filme salvo :(</article>}
        {FilmesSalvos.map((item) =>{
            return(
                <div className="linha-salvos">
                <article>{item.title}</article>
                <div>
                <Link to={`/Detalhes/${item.id}`}>Detalhes</Link>
                <button onClick={() => {Excluir(item.id)}}>Excluir</button>
                </div>
                </div>
            )  
        })
        }
        </div> 
        </div>
    )
}

export default MeusFilmes