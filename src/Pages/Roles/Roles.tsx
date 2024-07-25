import { useState, useEffect } from "react";
import { useTheme } from "../../Provider/ThemeProvider";
import { changeTitleHeader } from "../../Utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import codeigniter from "../../Utils/axios";

import ModalDelete from "../../Components/ModalDelete/ModalDelete";
import ModalRole from "./ModalRole";

export default function Roles(){

    const theme = useTheme();
    const [roles,setRoles] = useState([]);
    const [id,setId] = useState(0);
    const [titleModal,setTitleModal] = useState("");
    const [titleButton,setTitleButton] = useState("");
    const [openModal,setModal] = useState(false);
    const [viewNotification,setNotification] = useState("");
    const [viewDelete,setViewDelete] = useState(false);
    const [name,setName] = useState<String>("");
    const [capabilitiesRole,setCapabilitiesRole] = useState("");

    const getRoles = async() => {
        
        await codeigniter.get('/roles').then((response) => {
            setRoles(response.data);
        })
    }

    useEffect(() => {
        getRoles();
        changeTitleHeader("Roles");
    },[]);

    const openModalRole = () => {
        setTitleModal('Añadir Rol');
        setTitleButton('Guardar');
        setId(0);
        setName("");
        setCapabilitiesRole("");
        setModal(true);
    }

    

    const closeModal = () => {
        setModal(false);
    }

    const openModalUpdateCategory = (e:any) => { 
        setTitleModal('Actualizar Rol');
        setTitleButton("Actualizar");  
        setId(e.currentTarget.getAttribute('data-id'));
        setName(e.currentTarget.getAttribute('data-name'));
        setCapabilitiesRole(e.currentTarget.getAttribute('data-capabilities'));
        setModal(true);
    }

    const deleteRole = async() => {

        await codeigniter.delete('/roles/' + id).then(() => {
            getRoles();
            setNotification("Rol Eliminado");
            setViewDelete(false);
            
            setTimeout(() => {
               setNotification("");
            },1000);
        })
    }

    const openModalDelete = (e:any) => {
        setId(e.currentTarget.getAttribute('data-id'));
        setViewDelete(true);
    }

    const closeModalDelete = () => {
        setViewDelete(false);
    }

    return(
        <main className={(theme.theme == "light") ? "column has-background-light pb-4 vh-100" : 'column has-background-dark pb-4 vh-100'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">Roles</span>
                </div>
            </div>
            <div className="column is-12 has-text-right">
                <button className="button is-link" onClick={() => openModalRole()}>Agregar Rol</button>
            </div>
            <div className="column is-12">
                <div className={(viewNotification) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>Categoria Eliminada</div>
            </div>
            
            <div className="column is-12">
                <div className="table-container rounded">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (roles.length > 0) ? 

                                    roles.map((role:any) => {

                                        return(
                                            <tr key={role.id} id={'role_' + role.id}>
                                                <td>{role.name}</td>
                                                <td>
                                                    
                                                    <button className="button is-success m-1 has-text-white" onClick={(e) => openModalUpdateCategory(e)} data-capabilities={JSON.stringify(role.capabilities)} data-id={role.id} data-name={role.name} disabled={(role.id == 1) ? true : false}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                    <button className="button is-danger m-1 has-text-white" data-id={role.id} onClick={(e) => openModalDelete(e)} disabled={(role.id == 1 || role.id == 2) ? true : false}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ) 
                                    })
                                : (
                                    <tr>
                                        <td colSpan={2} className="has-text-centered">No existen roles registradas.</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>  
            <ModalRole open={openModal} name={name} id={id} capabilitiesRole={capabilitiesRole} changeOpen={closeModal} title={titleModal} titleButton={titleButton}  />
            <ModalDelete open={viewDelete} deleteFunction ={deleteRole} changeOpen={closeModalDelete} title="Eliminar Rol" id={id} description="Desea eliminar este rol?" />
        </main>
    )
}