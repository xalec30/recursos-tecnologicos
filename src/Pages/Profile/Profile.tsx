import { useEffect, useState } from "react";
import { changeTitleHeader } from "../../Utils/utils";
import { useTheme } from "../../Provider/ThemeProvider";
import { useAuth } from "../../Provider/AuthProvider";
import codeigniter from "../../Utils/axios";


export default function Profile(){
    
    const theme = useTheme();
    const Auth = useAuth();
    const data = JSON.parse(Auth.user);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [middleName,setMidleName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [notificationError,setNotificationError] = useState("");
    const [notificationSuccess,setNotificationSuccess] = useState("");
    const [buttonLoading,setButtonLoading] = useState(false);
   
    useEffect(() => {
        changeTitleHeader('Perfil del Usuario');
        setUsername(data.username);
        setEmail(data.email);
        setName(data.name);
        setMidleName(data.middle_name);
        setLastName(data.last_name);
    
    },[]);

    const closeNotificationError = () => {
        setNotificationError("");
    }

    const handleName = (e:any) => {
        setName(e.currentTarget.value);
    }

    const handleMiddleName = (e:any) => {
        setMidleName(e.currentTarget.value);
    }

    const handleLastName = (e:any) => {
        setLastName(e.currentTarget.value);
    }

    const handlePassword = (e:any) => {
        setPassword(e.currentTarget.value)
    }

    const handleRepeatPassword = (e:any) => {
        setRepeatPassword(e.currentTarget.value);
    }

    const updateUser = async() => {
        setButtonLoading(true);
        setNotificationError("");
        
        if(!name){
            setNotificationError("Campo Primer Nombre es requerido")
            setButtonLoading(false);
            return;
        }

        if(!lastName){
            setNotificationError("Campo Apellido es requerido");
            setButtonLoading(false);
            return;
        }

        if(password || repeatPassword){

            if(!password){
                setNotificationError("Campo contraseña es requerido");
                setButtonLoading(false);
                return;
            }

            if(!repeatPassword){
                setNotificationError("Campo Repetir contraseña es requerido");
                setButtonLoading(false);
                return;
            }

            if(password != repeatPassword){
                setNotificationError("Contraseña no coinciden");
                setButtonLoading(false);
                return;
            }

        }


       
        await codeigniter.put('/users/' + data.id,{
            'id': data.id,
            'username' : username,
            'email' : email,
            'name' : name,
            'middle_name' : middleName,
            'last_name' : lastName,
            'password': (password) ? password : data.password,
            'role_id': data.role_id
        }).then((response) => {
            setNotificationSuccess('Datos Actualizados');
            Auth.setUser(JSON.stringify(response.data.user));
            localStorage.setItem('user',JSON.stringify(response.data.user));
            setButtonLoading(false);
            setTimeout(() => {
                setNotificationSuccess('');
            },2000);
        });
    }

    return(
       <main className={(theme.theme == "light") ? "container is-fluid is-background-light" : 'container is-fluid is-background-dark'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">Perfil</span>
                </div>
            </div>
            <div className="column is-12">
                <form className="box" method="post">
                    <div className={(notificationError) ? "notification notification-error is-danger is-light" : "notification notification-error is-hidden is-danger is-light"}>
                        <button type="button" onClick={() => closeNotificationError()} className="delete"></button>
                        {notificationError}
                    </div>
                    <div className={(notificationSuccess) ? "notification notification-success is-success is-light" : "notification notification-success is-hidden is-success is-light"}>
                        {notificationSuccess}
                    </div>
                    <div className="columns is-multiline">
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Usuario <span className="has-text-danger">*</span></label>
                                <div className="control">
                                    <input className="input" id="username" defaultValue={username} type="text" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Correo Electronico <span className="has-text-danger">*</span></label>
                                <div className="control">
                                    <input className="input" id="email" defaultValue={email} type="text" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Primer Nombre <span className="has-text-danger">*</span></label>
                                <div className="control">
                                    <input className="input" id="name" defaultValue={name} onKeyUp={(e) => handleName(e)} type="text" placeholder="" />
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Segundo Nombre</label>
                                <div className="control">
                                    <input className="input" onKeyUp={(e) => handleMiddleName(e)} defaultValue={middleName} type="text" placeholder="" />
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Apellido <span className="has-text-danger">*</span></label>
                                <div className="control">
                                    <input className="input" onKeyUp={(e) => handleLastName(e)} defaultValue={lastName} type="text" placeholder="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-12">
                            <h4 className="title is-6">Cambiar Contraseña (Opcional)</h4>
                        </div>
                    </div>
                    <div className="columns is-multiline">
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Contraseña</label>
                                <div className="control">
                                    <input className="input" onKeyUp={(e) => handlePassword(e)} type="password" autoComplete="off" />
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Confirmar Contraseña</label>
                                <div className="control">
                                    <input className="input" onKeyUp={(e) => handleRepeatPassword(e)} type="password" autoComplete="off" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column has-text-right">
                        <button type="button" className={(buttonLoading) ? "button is-link is-loading" : 'button is-link'} onClick={() => updateUser()}>Guardar cambios</button>
                    </div>
                </form>
            </div>
       </main>
        
    )
}