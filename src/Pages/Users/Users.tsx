import { useState,useEffect,useRef } from "react";
import { useTheme } from "../../Provider/ThemeProvider";
import { useAuth } from "../../Provider/AuthProvider";
import { changeTitleHeader } from "../../Utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faEye,faBan,faFlag } from '@fortawesome/free-solid-svg-icons';
import codeigniter from "../../Utils/axios";

import ModalViewUser from "./ModalViewUser";
import ModalDelete from "../../Components/ModalDelete/ModalDelete";

export default function Users(){

    const buttonsAction = useRef<any>([]);
    const theme = useTheme();
    const [users,setUsers] = useState([]);

    const [viewDetail,setViewDetail] = useState(false);
    const [viewDelete,setViewDelete] = useState(false);
    const [viewNotification,setNotification] = useState(false);

    const [username,setUsername] = useState("");
    const [firstName,setFirstName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [userId,setUserId] = useState("");
    const Auth = useAuth();
    const AuthUser = JSON.parse(Auth.user);

    const getUsers = async() => {
        
        await codeigniter.get('/users').then((response) => {
            setUsers(response.data);
        })
    }

    useEffect(() => {
        changeTitleHeader('Usuarios Registrados');
        getUsers();
    },[]);

    const openModalView = (e:any) => {
        let data= JSON.parse(e.currentTarget.getAttribute('data-user'));
        setUsername(data.username);
        setFirstName(data.name);
        setMiddleName(data.middle_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setViewDetail(true);
    }

    const openModalDelete = (e:any) => {
        setUserId(e.currentTarget.getAttribute('data-id'));
        setViewDelete(true);
    }

    const closeModalView = (e:any) => {
        setViewDetail(e);
    }

    const closeModalDelete = (e:any) => {
        setViewDelete(e);
    }

    const deleteUser = async(id:Number) => {
    
        await codeigniter.delete('/users/' + id).then(() => {
           
            setNotification(true);
            getUsers();
            setViewDelete(false);
            setTimeout(() => {
                setNotification(false);
            },1000);
        })
    }

    const HandleblockUser = async(index:number) => {
       
        const button = buttonsAction.current[index];
        let userId = button.getAttribute('data-id');

        if(button.getAttribute('data-status') == 1){

            await codeigniter.post('/users/block/' + userId).then(() => {
                button.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="flag" class="svg-inline--fa fa-flag " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"></path></svg>';
                button.classList.remove('is-danger');
                button.classList.add('is-success');
                button.setAttribute('data-status',2);
            })


        }else{

            await codeigniter.post('/users/unblock/' + userId).then(() => {
                button.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban" class="svg-inline--fa fa-ban " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg>';
                button.classList.remove('is-success');
                button.classList.add('is-danger');
                button.setAttribute('data-status',1);
            })
        }

        
        
    }

    return(
        <main className={(theme.theme == "light") ? "column has-background-light pb-4" : 'column has-background-dark pb-4'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">Usuarios Registrados</span>
                </div>
            </div>
            <div className="column is-12">
                <div className={(viewNotification) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>Usuario Eliminado</div>
            </div>
            <div className="column is-12">
                <table className="table is-fullwidth rounded">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre y Apellido</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (users.length > 0) ? 

                                users.map((user:any,index:number) => {
                                        return(
                                            <tr key={user.id} id={'user_' + user.id}>
                                                <td>{user.username}</td>
                                                <td>{user.name + ' ' + user.last_name}</td>
                                                <td>{user.email}</td>
                                                { (user.id == AuthUser.id) ? 
                                                    <td>
                                                        <button ref={(e) => buttonsAction.current.push(e)} className="button m-1 is-success has-text-white" data-user={JSON.stringify(user)} onClick={(e) => openModalView(e)}>
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </button>
                                                    </td>
                                                :
                                                    <td>
                                                       
                                                        <button data-status={user.status} key={(index)} ref={(e) => buttonsAction.current.push(e)} data-id={user.id} onClick={() => HandleblockUser(index)} className={ (user.status == 1) ? "button is-danger has-text-white m-1" : 'button is-success has-text-white m-1'}>
                                                            {
                                                                (user.status == 1) ? 
                                                                <FontAwesomeIcon icon={faBan} />
                                                                :
                                                                <FontAwesomeIcon icon={faFlag} />
                                                            }
                                                            
                                                        </button>
                                                        <button className="button is-success has-text-white m-1" data-user={JSON.stringify(user)} onClick={(e) => openModalView(e)}>
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </button>
                                                        <button data-id={user.id} onClick={(e) => openModalDelete(e)} className="button is-danger has-text-white m-1">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                }
                                                
                                            </tr>
                                        ) 
                                })
                            : (
                                <tr>
                                    <td colSpan={4} className="has-text-centered">No existen usuarios registrados.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalViewUser username={username} firstName={firstName} middleName={middleName} lastName={lastName} email={email} open={viewDetail} changeOpen={closeModalView}/>
            <ModalDelete open={viewDelete} deleteFunction={deleteUser} changeOpen={closeModalDelete} title="Eliminar Usuario" id={userId} description="Desea eliminar este usuario?" />
        </main>
    )
}