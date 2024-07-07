import { useState,useEffect } from "react";
import { useTheme } from "../../Provider/ThemeProvider";
import { changeTitleHeader } from "../../Utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import codeigniter from "../../Utils/axios";

import ModalCategory from "./ModalCategory";
import ModalDelete from "../../Components/ModalDelete/ModalDelete";

export default function CategoriesList(){

    const theme = useTheme();
    const [categories,setCategories] = useState([]);
    const [titleModal,setTitleModal] = useState("");
    const [titleButton,setTitleButton] = useState("");
    const [viewNotification,setNotification] = useState(false);
    const [openModal,setModal] = useState(false);
    const [viewDelete,setViewDelete] = useState(false);
    const [id,setId] = useState<number>(0);
    const [categoryName,setCategoryName] = useState("");
    const [isHidden,setisHidden] = useState(0);
    const [isNew,setIsNew] = useState(0);

    const getCategories = async() => {
        await codeigniter.get('/categories').then((response) => {
            setCategories(response.data);
        })
    }

    useEffect(() => {
        changeTitleHeader('Categorias');
        getCategories();
    },[]);

    const openModalAddCategory = () => {
        setTitleModal('Añadir Categoria');
        setTitleButton('Guardar');
        setId(0);
        setCategoryName("");
        setisHidden(0);
        setIsNew(0);
        setModal(true);
    }

    const openModalUpdateCategory = (e:any) => {
        setTitleModal('Actualizar Categoria');
        setTitleButton('Actualizar');
        setId(e.currentTarget.getAttribute('data-id'));
        setCategoryName(e.currentTarget.getAttribute('data-name'));
        setisHidden(e.currentTarget.getAttribute('data-hidden'));
        setIsNew(e.currentTarget.getAttribute('data-new'));
        setModal(true);
    }

    const openModalDelete = (e:any) => {
        setId(e.currentTarget.getAttribute('data-id'));
        setViewDelete(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const deleteCategory = async(id:number) => {

        await codeigniter.delete('/categories/' + id).then(() => {
            getCategories();
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

    return(
        <main className={(theme.theme == "light") ? "column has-background-light pb-4 vh-100" : 'column has-background-dark pb-4 vh-100'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">Categorias</span>
                </div>
            </div>
            <div className="column is-12 has-text-right">
                <button className="button is-link" onClick={() => openModalAddCategory()}>Agregar Categorias</button>
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
                            (categories.length > 0) ? 

                                categories.map((category:any) => {

                                    return(
                                        <tr key={category.id} id={'category_' + category.id}>
                                            <th style={{alignContent:'center'}}>{category.name}</th>
                                            <td>
                                                <button className="button is-success m-1 has-text-white" data-id={category.id} data-name={category.name} data-new={category.is_new} data-hidden={category.hidden} onClick={(e) => openModalUpdateCategory(e)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="button is-danger m-1 has-text-white" data-id={category.id} onClick={(e) => openModalDelete(e)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ) 
                                })
                            : (
                                <tr>
                                    <td colSpan={2} className="has-text-centered">No existen categorias registradas.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalCategory titleButton={titleButton} id={id} title={titleModal} name={categoryName} newCategory={isNew} hidden={isHidden} open={openModal} changeOpen={closeModal} />
            <ModalDelete open={viewDelete} deleteFunction ={deleteCategory} changeOpen={closeModalDelete} title="Eliminar Categoria" id={id} description="Desea eliminar esta categoria?" />
        </main>
    )
}