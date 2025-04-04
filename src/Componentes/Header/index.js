import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./header.css";
import { signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from 'react-toastify'

function Header() {

    const [log,setLog] = useState(false)

    useEffect(()=> {
        onAuthStateChanged(auth, (user)=> {
            if (user) {
                setLog(true)
            }
        })
    },[])
    

    async function Deslogar() {
        await signOut(auth)
        .then(()=> {
            setLog(false)
            toast.success('Usuário deslogado com sucesso')})
        .catch(()=>{toast.error('Erro ao deslogar')})
    } 
    



    return(
        <header>
        <Link to='/' className="logo">RICKFLIX</Link>
        <div>
        <Link to='/MeusFilmes' className='meusFilmes'>Meus Filmes Salvos</Link>

        {!log ? (<Link to='/login' className="login">Entrar</Link>) : <button onClick={Deslogar} className="login">Deslogar</button> }
        </div>
        </header>
    )
}

export default Header