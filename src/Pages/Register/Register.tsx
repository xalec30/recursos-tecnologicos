import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { scrollToTop } from "../../Utils/utils";
import { changeTitleHeader } from "../../Utils/utils";
import codeigniter from "../../Utils/axios";

import Navbar from "../../Components/Navbar/Navbar"

export default function Register(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [buttonLoading,setButtonLoading] = useState(0);
    const [errorRegister,setErrorRegister] = useState<String>("");
    const [successRegister,setSuccessRegister] = useState<String>("");
    const navigate = useNavigate();

    useEffect(() => {
       changeTitleHeader('Registrarse');
    },[]);

    const handleUsername = (e:any) => {
        setUsername(e.target.value);
        setErrorRegister("");
    }

    const handleFirstName = (e:any) => {
        setFirstName(e.target.value);
        setErrorRegister("");
    }

    const handleMiddleName = (e:any) => {
        setMiddleName(e.target.value);
        setErrorRegister("");
    }

    const handleLastName = (e:any) => {
        setLastName(e.target.value);
        setErrorRegister("");
    }

    const handlePassword = (e:any) => {
        setPassword(e.target.value);
        setErrorRegister("");
    }

    const handleRepeatPassword = (e:any) => {
        setRepeatPassword(e.target.value);
        setErrorRegister("");
    }

    const handleEmail = (e:any) => {
        setEmail(e.target.value);
        setErrorRegister("");
    }

    const closeNotification = () => {
        setErrorRegister("");
    }

    const registerUser = async() => {
        scrollToTop();
        setButtonLoading(1);

        if(!username){
            setErrorRegister("Campo usuario es requerido.");
            setButtonLoading(0);
            return;
        }

        if(!firstName){
            setErrorRegister("Campo nombre es requerido.");
            setButtonLoading(0);
            return;
        }

        if(!lastName){
            setErrorRegister("Campo apellido es requerido.");
            setButtonLoading(0);
            return;
        }

        if(!email){
            setErrorRegister("Campo correo electronico es requerido.");
            setButtonLoading(0);
            return;
        }

        if(!password){
            setErrorRegister("Campo contraseña es requerido.");
            setButtonLoading(0);
            return;
        }

        if(!repeatPassword){
            setErrorRegister("Campo repetir contraseña es requerido.");
            setButtonLoading(0);
            return;
        }

        if(password != repeatPassword){
            setErrorRegister("Contraseñas no coinciden.");
            setButtonLoading(0);
            return;
        }

        await codeigniter.post('/users',{
            'username': username,
            'name': firstName,
            'middle_name': middleName,
            'last_name': lastName,
            'email': email,
            'password': password
        }).then(() => {
            setSuccessRegister('Usuario Registrado.');
            setTimeout(() => {
                navigate("/account/login");
            },2000);
            return;
        }).catch(function (error) {

            if(error.response){

                let errors = error.response.data.messages;
                let message = new String(Object.values(errors)[0]);
                if(Object.values(errors)[0] == 'The email field must contain a valid email address.'){
                    message = new String("Correo Electronico no valido");
                }

                setErrorRegister(message);
            }
        })

      
    }

    return (
        <>
            <Navbar hiddenButtonsAuth={0} />
            <div className="container pt-4">
                <div className="columns is-centered">
                    <div className="column is-6 has-text-centered mt-4">
                        <h2 className="subtitle is-2">Registrarse</h2>
                    </div>
                </div>
                <div className="columns is-multiline is-centered">
                    <section className=" column is-6">
                        <div className={(errorRegister) ? "notification is-danger is-light" : "notification is-danger is-light is-hidden"}>
                            <button className="delete" onClick={() => closeNotification()}></button>
                            {errorRegister}
                        </div>
                        <div className={(successRegister) ? "notification is-success is-light" : 'notification is-success is-light is-hidden'}>
                            {successRegister}
                        </div>
                        <form>
                            <div className="field mt-4">
                                <label className="label">Usuario <span className="has-text-danger">*</span></label>
                                <div className="control has-icons-left">
                                    <input className="input" id="username" onKeyUp={(e) => handleUsername(e)} type="text" placeholder="" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Nombre <span className="has-text-danger">*</span></label>
                                <div className="control">
                                    <input className="input" onKeyUp={(e) => handleFirstName(e)} type="text" placeholder="" />
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Segundo nombre (Opcional)</label>
                                <div className="control">
                                    <input className="input" type="text" onKeyUp={(e) => handleMiddleName(e)} placeholder="" />
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Apellido <span className="has-text-danger">*</span></label>
                                <div className="control">
                                    <input className="input" type="text" onKeyUp={(e) => handleLastName(e)} placeholder="" />
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Correo Electronico <span className="has-text-danger">*</span></label>
                                <div className="control has-icons-left">
                                    <input className="input" placeholder="" onKeyUp={(e) => handleEmail(e)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Contraseña</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="password" onKeyUp={(e) => handlePassword(e)} placeholder="" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Repetir contraseña</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="password" onKeyUp={(e) => handleRepeatPassword(e)} placeholder="" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-2">
                                <button type="button" onClick={() => registerUser()} className={(buttonLoading == 1) ? "button is-link is-fullwidth mt-4 is-loading" : "button is-link is-fullwidth mt-4"}>Registrarse</button>
                            </div>
                            <div className="field separator">
                                <span className="separator-text">or</span>
                            </div>
                            <div className="field">
                                <Link className="button is-fullwidth mt-4" to={ '/account/login' }>Iniciar Sesi&oacute;n</Link>
                            </div>
                        </form>
                    </section>
                    <section className="column is-12 p-4"></section>
                </div>
            </div>
        </>
    )
}