import './log.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify' 

function Login() {  
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()


    async function login() {
        await signInWithEmailAndPassword(auth, email, senha)
        .then((value)=> {
            toast.success('Logado com sucesso')
            navigate('/', {replace: true})
        })
        .catch((error)=>{
            console.log(error.code)
            if (error.code == "auth/user-not-found") {
                toast.error("Usuário não encontrado. Verifique o e-mail ou cadastre-se.");
              } 
            else if (error.code == "auth/wrong-password") {
                toast.error("Senha incorreta. Tente novamente ou redefina sua senha.");
              } 
            else if (error.code == "auth/invalid-credential") {
                toast.error("Senha ou Email incorreto. Tente novamente ou redefina sua senha.");
              } 
            else if (error.code == "auth/invalid-email") {
                toast.error("E-mail inválido. Verifique e tente novamente.");
              }
              else if (error.code == "auth/network-request-failed") {
                toast.error("Falha na conexão. Verifique sua internet e tente novamente.");
              } else {
                toast.error("Preencha todos os campos!");
                return;
              }
            
        })


    }


    return(
    <div className="container">
            <div className='header'>
        <Link to='/'>RICKFLIX</Link>
    </div>
        <div className="campo-login">
            <h1>Entrar</h1>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Email" className="input-login"/>
            <input value={senha} onChange={(e) => {setSenha(e.target.value)}} type="password" placeholder="Senha" className="input-login"/>
            <button onClick={login} className="btn-login">Entrar</button>
            <div className='register-campo'>
                <p>Não tem uma conta?<Link to="/Register" className="link-cadastro">Cadastrar-se</Link></p>
            
            </div>
        </div>
    </div>
    )

}

export default Login