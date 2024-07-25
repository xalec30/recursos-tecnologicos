import { useState,useEffect } from "react";
import codeigniter from "../../Utils/axios";
import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
import { isValidUrl } from "../../Utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload,faXmark } from '@fortawesome/free-solid-svg-icons';
import placeholder from "../../assets/img/placeholder.webp";


export default function ModalAddResource({open,refresh,title,changeOpen,titleButton,id,name,url,description,shortDescription,category,tagsList,imageUrl}:any){

    const [resourceId,setResourceId] = useState(0);
    const [notificationError,setNotificationError] = useState<any>("");
    const [notificationSuccess,setNotificationSuccess] = useState<any>("");
    const [buttonIsLoading,setButtonisLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const [tags,setTags] = useState([]);
    const [resourceName,setResourceName] = useState("");
    const [resourceNameCount,setResourceNameCount] = useState(0);
    const [resourceUrl,setResourceUrl] = useState("");
    const [resourceDescription,setResourceDescription] = useState("");
    const [resourceShortDescription,setResourceShortDescription] = useState("");
    const [resourceShortDescriptionCount,setResourceShortDescriptionCount] = useState(0);
    const [resourceCategory,setResourceCategory] = useState(0); 
    const [resourceTags,setResourceTags] = useState<any[]>([]);
    const [fileImage,setFileImage] = useState<any>();
    const [fileImagePreview,setFileImagePreview] = useState<string>();
    const [isFile,setIsFile] = useState(0);

    const getCategories = async(page:number) => {
        
        await codeigniter.get('/categories?page=' + page).then((response) => {
            setCategories(response.data);
        })
    }

    const getTags = async() => {

        await codeigniter.get('/tags?page=-1').then((response) => {
            setTags(response.data);
        })
    }

    useEffect(() => {
        getCategories(-1);
        getTags();
        setTimeout(() => {
            BulmaTagsInput.attach('#select-tag');

            let selectTag:any = document.getElementById('select-tag');
            
            selectTag?.BulmaTagsInput().on('after.add', function(data:any) {
               setResourceTags(prevState => {
                   return [...prevState,data.item.value];
               });              
            });

            selectTag?.BulmaTagsInput().on('after.remove', function(item:any) {
               

                setResourceTags(prevState => {

                    let index = prevState.indexOf(item.value);

                    if (index > -1) {
                        prevState.splice(index, 1);
                    }

                    return prevState;
                });
             });
        }, 1200);
        
    },[])

    const setTagsResource = (tags:any) => {
        let selectTag:any = document.getElementById('select-tag');
        selectTag?.BulmaTagsInput().add(tags);
    }

    useEffect(() => {

        setNotificationError("");
        setNotificationSuccess("");


        if(name == ""){
            setResourceId(0);
            setResourceName("");
            setResourceNameCount(0);
            setResourceUrl("");
            setResourceDescription("");
            setResourceShortDescription("");
            setResourceShortDescriptionCount(0);
            setResourceCategory(0);
            setFileImagePreview(placeholder);
            setIsFile(0)
            
        }else{
            setResourceId(id);
            setResourceName(name);
            setResourceNameCount(name.length);
            setResourceUrl(url);
            setResourceDescription(description);
            setResourceShortDescription(shortDescription);
            setResourceShortDescriptionCount(shortDescription.length);
            setResourceCategory(category);
            setTagsResource(tagsList);
            if(imageUrl){
                setFileImagePreview(imageUrl);
                setIsFile(1)
            }else{
                setFileImagePreview(placeholder);
                setIsFile(0);
            }
        
        }

    },[open]);

    const updateResource = async() => {

        setButtonisLoading(true);
        setNotificationError("");

        if(!resourceName){
            setNotificationError("Campo nombre es requerido");
            setButtonisLoading(false);
            return;
        }

        if(!resourceUrl){
            setNotificationError("Campo URL es requerido");
            setButtonisLoading(false);
            return;
        }else{

            if(!isValidUrl(resourceUrl)){
                setNotificationError("URL no es valido");
                setButtonisLoading(false);
                return;
            }
        }

        let formData = new FormData();
        formData.append('id',resourceId.toString());
        formData.append('image',fileImage);
        formData.append('name',resourceName);
        formData.append('url',resourceUrl);
        formData.append('short_description',resourceShortDescription);
        formData.append('description',resourceDescription);
        formData.append('category',resourceCategory.toString());
        formData.append('tags',resourceTags.toString());
        formData.append('isImage',isFile.toString());

        //create
        
        await codeigniter.post('/assets',formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response:any) => {
            
            setNotificationSuccess(response.data.message);
            
            setTimeout(() => {
                setNotificationSuccess("");
                setButtonisLoading(false);
                setResourceId(0);
                setResourceName("");
                setResourceNameCount(0);
                setResourceUrl("");
                setResourceDescription("");
                setResourceShortDescription("");
                setResourceShortDescriptionCount(0);
                setResourceCategory(0);
                setFileImagePreview(placeholder);
                setIsFile(0)
                
               refresh();
            },1000);
            return;
            
        }).catch((error) => {
    
            if(error.response){
                let errors = error.response.data.messages;
                setNotificationError(Object.values(errors)[0]);
                setButtonisLoading(false);
            }
        });
    }

    const handlerName = (e:any) => {

        let ResourceName = e.currentTarget.value;
        setNotificationError("");
        
        setResourceName(prevState => {
            return (ResourceName.length > 100) ? prevState : ResourceName;
        });

        setResourceNameCount(prevState => {
            return (ResourceName.length > 100) ? prevState : ResourceName.length;
        })  
    }

    const handlerUrl = (e:any) => {
        setNotificationError("");
        setResourceUrl(e.currentTarget.value);
    }

    const handlerDescription = (e:any) => {
        setNotificationError("");
        setResourceDescription(e.currentTarget.value);
    }

    const handlerShortDescription = (e:any) => {
        let shortDescription = e.currentTarget.value;
        setNotificationError("");

        setResourceShortDescription(prevState => {
            return (shortDescription.length > 150) ? prevState : shortDescription;
        });
        
        setResourceShortDescriptionCount(prevState => {
            return (shortDescription.length > 150) ? prevState : shortDescription.length; 
        });

        return;
    }

    const handlerCategory = (e:any) => {
        setNotificationError("");
        setResourceCategory(e.currentTarget.value);
    }

    const handlerTags = (e:any) => {
        setNotificationError("");
        setResourceTags(e.currentTarget.value);
    }

    const handlerImage = (e:any) => {
        setFileImage(e.target.files[0]);
        setIsFile(1);
        setFileImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const removeImage = () => {
        setFileImagePreview(placeholder);
        setFileImage("");
        setIsFile(0);
    }

    return(
        <div className={(open) ? "modal is-active p-4": 'modal p-4'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head border-bottom">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={() => changeOpen(false)}></button>
                </header>
                <section className="modal-card-body p-4">
                    <div className={(notificationError) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>{notificationError}</div>
                    <div className={(notificationSuccess) ? "notification has-text-white is-success" : 'notification is-success has-text-white is-hidden'}>{notificationSuccess}</div>
                    <form method='post'>
                        <div className="field mt-4">
                            <label className="label">Nombre de Recurso<span className="has-text-danger">*</span></label>
                            <div className="control">
                                <input className="input" value={resourceName} onChange={(e) => handlerName(e)} type="text" placeholder="" />
                                <span>{resourceNameCount} /100</span>
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">URL<span className="has-text-danger">*</span></label>
                            <div className="control">
                                <input className="input" value={resourceUrl} onChange={(e) => handlerUrl(e)}  type="text" placeholder="https://example.com" />
                            </div>
                        </div>
                        <div className="field mt-4">
                            <figure className="image is-5by4 border">
                                <button type="button" onClick={() => removeImage()} className={(fileImagePreview == placeholder) ? "button is-danger is-pulled-right is-hidden" : "button is-danger is-pulled-right"} style={{zIndex:1,borderRadius:'20px',marginTop:'5px',marginRight:'5px'}}> <FontAwesomeIcon icon={faXmark} /></button>
                                <img src={fileImagePreview} />
                            </figure>
                            <div className="file w-100">
                                <label className="file-label w-100">
                                    <input className="file-input" type="file" onChange={(e) => handlerImage(e)} name="image" />
                                    <span className="file-cta mt-4 w-100 has-text-centered">
                                        <span className="file-icon">
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                        <span className="file-label  has-text-centered">Subir imagen</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">Descripcion Corta</label>
                            <div className="control">
                                <textarea className="textarea" value={resourceShortDescription} onChange={(e) => handlerShortDescription(e)} style={{resize:"none"}} placeholder=""></textarea>
                                <span>{resourceShortDescriptionCount} /150</span>
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">Descripcion</label>
                            <div className="control">
                                <textarea className="textarea" value={resourceDescription} onChange={(e) => handlerDescription(e)} style={{resize:"none"}} placeholder=""></textarea>
                            </div>
                        </div>
                        <div className="field mt-4"> 
                          <label className="label">Categorias</label>
                          <div className="select">
                            <select id="categories" className="w-100" value={resourceCategory} onChange={(e) => handlerCategory(e)}>
                              <option key={0} value={0} >Sin categorizar</option>
                              {
                                categories.map((category:any) => 
                                  <option key={category.id} value={category.id}>{category.name}</option>
                                )
                              }
                            </select>
                          </div>
                        </div> 

                        <div className="field">
                            <label className="label">Etiquetas</label>
                            <div className="control">
                                <select id="select-tag" multiple data-type="tags" data-placeholder="Seleccionar Etiquetas" data-no-results-label="No hay resultados" value={resourceTags} onChange={(e) => handlerTags(e)}>
                                    {
                                        (tags.length > 0) ? 

                                            tags.map((tags:any) => 
                                                <option key={tags.id} value={tags.id}>{tags.name}</option>
                                            )
                                        : ''
                                    }
                                </select>
                            </div>
                        </div>

                    </form>
                </section>
                <footer className="modal-card-foot p-4">
                    <div className="buttons">
                        <button className={(buttonIsLoading) ? "button is-link is-loading" : 'button is-link'} onClick={() => updateResource()}>{titleButton}</button>
                        <button className="button" onClick={() => changeOpen(false)}>Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}