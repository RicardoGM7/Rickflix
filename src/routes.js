import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Home from "./Paginas/Home"
import Erro from "./Paginas/Erro/erro"
import Detalhes from "./Paginas/Detalhes"
import MeusFilmes from "./Paginas/MeusFilmes"
import Login from "./Paginas/Login"
import Register from "./Paginas/Register"

import Header from "./Componentes/Header"

function RoutesApp () {
    return(
        <BrowserRouter>
        <MainLayout />
        </BrowserRouter>
    )
}

function MainLayout() {
    const location = useLocation();
    const semHeader = ['/login', '/Register'];

    return(
        <>
        {!semHeader.includes(location.pathname)  && <Header/>}
        <Routes>
            <Route path="/Register" element= { <Register/> }/>
            <Route path="/Login" element= { <Login/> }/>
            <Route path='/' element= { <Home/> }/>
            <Route path='/Detalhes/:id' element= { <Detalhes/>}/>
            <Route path='/MeusFilmes' element= { <MeusFilmes/> }/>
            <Route path='*' element= { <Erro/> }/>
        </Routes>
        </>
    )
}



export default RoutesApp