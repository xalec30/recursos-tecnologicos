import { useTheme } from "../../Provider/ThemeProvider";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { changeTitleHeader } from "../../Utils/utils"
import codeigniter from "../../Utils/axios";

import ModalTag from "./ModalTag";
import ModalDelete from "../../Components/ModalDelete/ModalDelete";

export default function Tags(){

    const theme = useTheme();
    const [page,setPage] = useState<number>(1);
    const [tags,setTags] = useState([]);
    const [titleModal,setTitleModal] = useState("");
    const [openModal,setModal] = useState(false);
    const [titleButton,setTitleButton] = useState("");
    const [viewNotification,setNotification] = useState(false);
    const [viewDelete,setViewDelete] = useState(false);
    const [id,setId] = useState<number>(0);
    const [tagName,setTagName] = useState("");

    const getTags = async(page:number) => {

        await codeigniter.get('/tags?page=' + page).then((response) => {
            setTags(response.data);
        })
    }

    const openModalAddTag = () => {
        setTitleModal("Añadir Etiqueta");
        setTitleButton("Guardar");
        setTagName("");
        setModal(true);
    }

    const openModalUpdateTag = (e:any) => {
        setTitleModal('Actualizar Etiqueta');
        setTitleButton('Actualizar');
        setTagName(e.currentTarget.getAttribute('data-name'));
        setId(e.currentTarget.getAttribute('data-id'));
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const closeModalDelete = () => {
        setViewDelete(false);
    }

    const openModalDelete = (e:any) => {
        setId(e.currentTarget.getAttribute('data-id'));
        setViewDelete(true);
    }

    const deleteTag = async() => {
   
        await codeigniter.delete('/tags/' + id ).then(() => {
            getTags(page);
            setNotification(true);
            setViewDelete(false);

            setTimeout(() => {
                setNotification(false);
            },1000);
        })
    }

    useEffect(() => {
        changeTitleHeader('Etiquetas');
        getTags(page);
    },[])

    const nextPage = () => {
        setPage(prevState => {
            prevState += 1;
            getTags(prevState);
            return prevState;
        })
    }

    const previousPage = () => {
        setPage(prevState => {
            prevState -= 1;
            getTags(prevState);
            return prevState;
        })
    }


    return (
        <main className={(theme.theme == "light") ? "column has-background-light pb-4 vh-100" : 'column has-background-dark pb-4 vh-100'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">Etiquetas</span>
                </div>
            </div>
            <div className="column is-12 has-text-right">
                <button className="button is-link" onClick={() => openModalAddTag()}>Agregar Etiquetas</button>
            </div>
            <div className="column is-12">
                <div className={(viewNotification) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>Etiqueta Eliminada</div>
            </div>
            <div className="column is-12">
                <span>Pagina {page}</span>
            </div>
            <div className="column is-12">
                <table className="table is-fullwidth is-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (tags.length > 0) ? 

                                tags.map((tag:any) => {

                                    return(
                                        <tr key={tag.id} id={'tag_' + tag.id}>
                                            <td style={{alignContent:'center'}}>{tag.name}</td>
                                            <td>
                                                <button className="button is-success m-1 has-text-white" data-id={tag.id} data-name={tag.name} onClick={(e) => openModalUpdateTag(e)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="button is-danger m-1 has-text-white" data-id={tag.id} onClick={(e) => openModalDelete(e)} >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ) 
                                })
                            : (
                                <tr>
                                    <td colSpan={2} className="has-text-centered">No existen etiquetas registradas.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="column is-12">
                <div className="buttons is-justify-content-flex-end">
                    <button className={(page > 1) ? "button is-link" : 'button is-link is-hidden'} disabled={(page == 1) ? true : false } onClick={() => previousPage()}>Anterior</button>
                    <button className={(tags.length >= 10) ? "button is-link" : 'button is-link is-hidden'} disabled={(tags.length == 10 ) ? false : true} onClick={() => nextPage()}>Siguiente</button>
                </div>
            </div>
            <ModalTag id={id} title={titleModal} tagName={tagName} open={openModal} changeOpen={closeModal} titleButton={titleButton} />
            <ModalDelete open={viewDelete} deleteFunction ={deleteTag} changeOpen={closeModalDelete} title="Eliminar Etiqueta" id={id} description="Desea eliminar esta etiqueta?" />
        </main>
    )
}