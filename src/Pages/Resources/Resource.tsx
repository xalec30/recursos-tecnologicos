import { useState,useEffect } from "react";
import { useTheme } from "../../Provider/ThemeProvider";
import { changeTitleHeader } from "../../Utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import codeigniter from "../../Utils/axios";

import ModalDelete from "../../Components/ModalDelete/ModalDelete";
import ModalAddResource from "./ModalResource";


export default function Resource(){

    const theme = useTheme();
    const [viewNotification,setNotification] = useState(false);
    const [viewDelete,setViewDelete] = useState(false);
    const [id,setId] = useState<number>(0);
    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [description,setDescription] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    const [category,setCategory] = useState(0);
    const [resources,setResources] = useState([]);
    const [openModal,setModal] = useState(false);
    const [titleModal,setTitleModal] = useState("");
    const [titleButton,setTitleButton] = useState("");
    const [tags,setTags] = useState([]);


    const getResources = async() => {
        await codeigniter.get('/assets').then((response) => {
            setResources(response.data);
        })
    }

    useEffect(() => {
        getResources();
        changeTitleHeader('Recursos');
    },[]);


    const deleteResource = async(id:number) => {

        await codeigniter.delete('/assets/' + id).then(() => {
            getResources();
            setNotification(true);
            setViewDelete(false);

            setTimeout(() => {
                setNotification(false);
            },1000);
        })
    }

    const closeModalDelete = () => {
        setViewDelete(false);
    }

    const openModalAddResource = () => {
        setTitleButton('Guardar');
        setTitleModal('Nuevo Recurso');
        setId(0);
        setName("");
        setUrl("");
        setDescription("");
        setCategory(0);
        setTags([]);
        setShortDescription("");

        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const openModalUpdateResource = (e:any) => {

        setTitleButton('Actualizar');
        setTitleModal('Actualizar Recurso');
        setId(e.currentTarget.getAttribute('data-id'));
        setName(e.currentTarget.getAttribute('data-name'));
        setUrl(e.currentTarget.getAttribute('data-url'));
        setDescription(e.currentTarget.getAttribute('data-description'));
        setShortDescription(e.currentTarget.getAttribute('data-short-description'));
        setCategory(e.currentTarget.getAttribute('data-category'));
        setTags(JSON.parse(e.currentTarget.getAttribute('data-tags')));
        setModal(true);
    }

    const openModalDelete = (e:any) => {
        setId(e.currentTarget.getAttribute('data-id'));
        setViewDelete(true);
    }

    return(
        <main className={(theme.theme == "light") ? "column has-background-light pb-4 vh-100" : 'column has-background-dark pb-4 vh-100'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">Recursos</span>
                </div>
            </div>
            <div className="column is-12 has-text-right">
                <button className="button is-link" onClick={() => openModalAddResource()}>Agregar Recurso</button>
            </div>
            <div className="column is-12">
                <div className={(viewNotification) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>Categoria Eliminada</div>
            </div>
            <div className="column is-12">
                <table className="table is-fullwidth rounded">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (resources.length > 0) ? 

                                resources.map((resource:any) => {
                                  
                                    return(
                                        <tr key={resource.id} id={'reosurce_' + resource.id}>
                                            <td>{resource.name}</td>
                                            <td>
                                                <button onClick={(e) => openModalUpdateResource(e)} data-id={resource.id} data-name={resource.name} data-url={resource.url} data-short-description={resource.short_description} data-description={resource.description} data-category={resource.category} data-tags={JSON.stringify(resource.tags)} className="button is-success mr-3 has-text-white">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="button is-danger has-text-white" data-id={resource.id} onClick={(e) => openModalDelete(e)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ) 
                                })
                            : (
                                <tr>
                                    <td colSpan={2} className="has-text-centered">No existen Recursos registradas.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalAddResource titleButton={titleButton} name={name} url={url} id={id} description={description} shortDescription={shortDescription} category={category} tagsList={tags} title={titleModal} open={openModal} changeOpen={closeModal}/>
            <ModalDelete open={viewDelete} deleteFunction ={deleteResource} changeOpen={closeModalDelete} title="Eliminar Recurso" id={id} description="Desea eliminar este recurso?" />
        </main>
    )
}