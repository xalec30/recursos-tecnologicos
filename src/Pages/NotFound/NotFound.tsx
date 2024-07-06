import { Link } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"

export default function NotFound(){

    return(
        <>
            <Navbar hiddenButtonsAuth={1}/>
            <div className="container">
                <div className="columns is-multiline is-mobile is-centered mt-4">
                    <div className="column is-12 is-half has-text-centered mt-4">
                        <h1 className="title is-1" style={{fontSize:'100px'}}>404</h1>
                        <p>Pagina no encontrada</p>
                    </div>
                    <div className="column is-12 is-half has-text-centered mt-4">
                        <Link className="button is-link" to={'/'}>Volver al inicio</Link>
                    </div>
                </div>
            </div>
        </>
    )
}