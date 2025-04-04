import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify'



function Register() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate();


    async function registrar() {
        if (nome !== '' && email !== '' && senha !== '') {
            await createUserWithEmailAndPassword(auth, email, senha)
                .then(async (value) => {
                    await updateProfile(value.user, { displayName: nome });
                    toast.success('Usuário cadastrado com sucesso!');
                    setEmail('');
                    setSenha('');
                    setNome('');
                    navigate('/', { replace: true });
                })
                .catch((error) => {
                    if(error == 'auth/invalid-email'){
                    toast.error('E-mail inválido! Verifique e tente novamente.')
                        return;
                    }
                    else if( error == 'auth/email-already-in-use'){
                    toast.error("Este e-mail já está cadastrado. Tente fazer login.");
                        return;
                    }
                    else if(error == 'auth/weak-password') {
                    toast.error("A senha precisa ter pelo menos 6 caracteres."); 
                        return; 
                    }
                    else if(error.code === "auth/network-request-failed"){
                        toast.error("Falha na conexão. Verifique sua internet e tente novamente.");
                        return;
                    } 
                    else if (error.code === "auth/internal-error") {
                        toast.error("Erro inesperado. Tente novamente mais tarde.");
                        return;
                      }
                });
        } else {
            toast.alert('Preencha todos os campos');
        }
    }


    return(
    <div className="container">
            <div className='header'>
        <Link to='/'>RICKFLIX</Link>
    </div>
        <div className="campo-login">
            <h1>Registrar</h1>
            <input value={nome} onChange={(e) => {setNome(e.target.value)}} type="text" placeholder="Nome de usuário" className="input-register"/>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}}type="text" placeholder="Email" className="input-register"/>
            <input value={senha} onChange={(e) => {setSenha(e.target.value)}} type="password" placeholder="Senha" className="input-register"/>
            <button onClick= {registrar} className="btn-register">Registrar-se</button>
            <div className='login-campo'>
                <p>Já tem uma conta? <Link to="/Login" className="link-cadastro">Entrar</Link></p>
            </div>
        </div>
    </div>
    )

}

export default Register