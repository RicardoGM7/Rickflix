import { useState, useEffect } from "react" 
import api from "../../services/api"
import './home.css'

import { Link } from "react-router-dom"

function Home() {
    const  [Filmes, setFilmes] = useState ([])
    const  [Loading, setLoading] = useState(true)

    useEffect(()=> { 

        async function loadFilmes() {
            const response = await api.get ("movie/now_playing", {
                params: {
                api_key: 'bd4f2c7696e179a5672b318a1cf2996b',
                language: 'pt-BR',
                page: 1,
                }   
            })   
            setFilmes(response.data.results.slice(0,16))
        }
        loadFilmes()
        setLoading(false)
    },[])

    if(Loading) {
        return(
            <strong>Carregando Dados...</strong>
        )
    }
    
    return(
        <div id="container">
   
        {Filmes.map((item) =>{
            return(
                <article className="lista-filmes" classkey={item.id}>
                    <strong>{item.title}</strong>
                    <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/>
                    <Link to={`/Detalhes/${item.id}`}>Acessar</Link>
                </article>
            )  
        })
        }
        </div>   
    )
}

export default Home