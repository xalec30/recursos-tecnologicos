import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { changeTitleHeader } from "../../Utils/utils";
import Navbar from "../../Components/Navbar/Navbar";

export default function LostPassword(){
    const [email,setEmail] = useState<String>("");
    const [errorLostPassword,setErrorLostPassword] = useState<String>('');
    const [successLostPassword,setSuccessLostPassword] = useState<String>('');
    const [buttonLoading,setButtonLoading] = useState<Number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        changeTitleHeader("Recuperar contraseña");
    });

    const handleEmail = (e:any) => {
        setEmail(e.target.value);
        setErrorLostPassword("");
        setButtonLoading(0);
    }

    const closeNotification = () => {
        setErrorLostPassword("");

    }

    const sendLostPassword = () => {
        setButtonLoading(1);

        if(!email){
            setErrorLostPassword('Campo correo eletronico es requerido.');
            setButtonLoading(0);
            return;
        }

        setSuccessLostPassword("Se ha enviado un link a su correo eletronico.");
        
        setTimeout(() => {
            setSuccessLostPassword("");
            setButtonLoading(0);

            navigate("/account/login");
        },3000);

    }
 
    return(
        <>
            <Navbar hiddenButtonsAuth={0}/>
            <div className="container p-4">
                <div className="columns is-centered">
                    <div className="column is-6 has-text-centered mt-4">
                        <h2 className="subtitle is-2">Recuperar Contraseña</h2>
                    </div>
                </div>
                <div className="columns is-centered">
                    <section className=" column is-6 mb-4">
                        <div className={(errorLostPassword) ? "notification notification-danger is-danger is-light" : 'notification notification-danger is-danger is-light is-hidden'}>
                            <button className="delete" onClick={() => closeNotification()}></button>
                            {errorLostPassword}
                        </div>
                        <div className={(successLostPassword) ? "notification notification-success is-success is-light" : 'notification notification-success is-success is-light is-hidden'}>
                            {successLostPassword}
                        </div>
                        <form>
                            <div className="field mt-4">
                                <label className="label">Correo Eletronico</label>
                                <div className="control has-icons-left">
                                    <input className="input" onKeyUp={(e) => handleEmail(e)} type="text" placeholder="" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-2">
                                <button type="button" onClick={() => sendLostPassword()} className={(buttonLoading == 1) ? "button is-link is-fullwidth mt-4 is-loading" : 'button is-link is-fullwidth mt-4'}>Recuperar contraseña</button>
                            </div>
                            <div className="field">
                                <Link className="button  is-fullwidth mt-4" to={ '/account/login' }>Volver</Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}