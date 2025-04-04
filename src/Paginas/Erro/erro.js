import './erro.css'
import { Link } from 'react-router-dom'

function Erro(){
    return(
        <div className="erro">
        <h1>404</h1>
        <strong>Pagina Não Encontrada</strong>
        <Link to={'/'}>Pagina Inicial</Link>
        </div>
    )
}

export default Erro