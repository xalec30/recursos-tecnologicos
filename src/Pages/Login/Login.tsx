import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../Provider/AuthProvider";
import { changeTitleHeader } from "../../Utils/utils";
import codeigniter from "../../Utils/axios";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export default function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorAuth,setErrorAuth] = useState("");
    const [buttonLoading,setButtonLoading] = useState(0);
    const navigate = useNavigate();
    const Auth = useAuth();
 

    useEffect(() => {
        changeTitleHeader('Iniciar Sesión');
    },[]);


    const handlerUsername = (e:any) => {
        setUsername(e.target.value);
        setErrorAuth("");
    }

    const handlerPassword = (e:any) => {
        setPassword(e.target.value);
        setErrorAuth("");
    }

    const closeNotification = () => {
        setErrorAuth("");
    }

    const AuthLogin = async() => {

        setButtonLoading(1);

        if(!username){
            setErrorAuth("Campo usuario es requerido.");
            setButtonLoading(0);
            return;
        }

        if(!password){
            setErrorAuth("Campo contraseña es requerido.");
            setButtonLoading(0);
            return;
        }

        await codeigniter.post('/auth',{
            'username': username,
            'password': password
        }).then((response) => {

            let user = response.data.user_data;
    
            if(user.status == 2){
                setErrorAuth("Usuario Bloqueado");
                setButtonLoading(0);
                return;
            }
            
            localStorage.setItem('token','1');
            localStorage.setItem('user',JSON.stringify(response.data.user_data));
            Auth.login();
            
            if(response.data.user_data.role_id == 1){
                navigate("/dashboard/overview");
            }else{
                navigate("/");
            }

            return;
            
        }).catch(function (error) {

            if(error.response){
                let errors = error.response.data.messages;
                setErrorAuth(errors.error);
            }  

            setButtonLoading(0);
        })
    }

    return(
        <>
            <Navbar hiddenButtonsAuth={0} />
            <div className="container p-4">
                <div className="columns is-centered">
                    <div className="column is-6 has-text-centered mt-4">
                        <h2 className="subtitle is-2">Iniciar Sesi&oacute;n</h2>
                    </div>
                </div>
                <div className="columns is-centered">
                    <section className=" column is-6">
                        <div className={ (errorAuth.length > 0) ?  "notification is-danger is-light": 'notification is-danger is-light is-hidden'}>
                            <button className="delete" onClick={() => closeNotification()}></button>
                            {errorAuth}
                        </div>
                        <form>
                            <div className="field mt-4">
                                <label className="label">Usuario</label>
                                <div className="control has-icons-left">
                                    <input className="input" onKeyUp={(e) => handlerUsername(e)} type="text" placeholder="" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Contraseña</label>
                                <div className="control has-icons-left">
                                    <input className="input" onKeyUp={(e) => handlerPassword(e)} type="password" placeholder="" />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>
                            <div className="field mt-2">
                                <Link to="/account/lostpassword">¿Olvidaste tu contraseña?</Link>
                            </div>
                            <div className="field mt-2">
                                <button type="button" onClick={() => AuthLogin()} className={(buttonLoading == 1) ? 'button is-link is-fullwidth mt-4 is-loading' : 'button is-link is-fullwidth mt-4'}>Iniciar</button>
                            </div>
                            <div className="field separator">
                                <span className="separator-text">or</span>
                            </div>
                            <div className="field">
                                <Link className="button is-fullwidth mt-4" to={ '/account/register' }>Registrarse</Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            <Footer/>
        </>
    )
}