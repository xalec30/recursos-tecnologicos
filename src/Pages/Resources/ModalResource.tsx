import { useState,useEffect } from "react";
import codeigniter from "../../Utils/axios";
import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
import { isValidUrl } from "../../Utils/utils";


export default function ModalAddResource({open,title,changeOpen,titleButton,id,name,url,description,shortDescription,category,tagsList}:any){

    const [resourceId,setResourceId] = useState(0);
    const [notificationError,setNotificationError] = useState<any>("");
    const [notificationSuccess,setNotificationSuccess] = useState<any>("");
    const [buttonIsLoading,setButtonisLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    const [tags,setTags] = useState([]);
    const [resourceName,setResourceName] = useState("");
    const [resourceUrl,setResourceUrl] = useState("");
    const [resourceDescription,setResourceDescription] = useState("");

    const [resourceShortDescription,setResourceShortDescription] = useState("");
    const [resourceShortDescriptionCount,setResourceShortDescriptionCount] = useState(0);
    const [resourceCategory,setResourceCategory] = useState(0); 
    const [resourceTags,setResourceTags] = useState<any[]>([]);

    const getCategories = async() => {
        
        await codeigniter.get('/categories').then((response) => {
            setCategories(response.data);
        })
    }

    const getTags = async() => {

        await codeigniter.get('/tags').then((response) => {
            setTags(response.data);
        })
    }

    useEffect(() => {
        getCategories();
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


        if(name == ""){
            setResourceId(0);
            setResourceName("");
            setResourceUrl("");
            setResourceDescription("");
            setResourceShortDescription("");
            setResourceCategory(0);
        }else{
            setResourceId(id);
            setResourceName(name);
            setResourceUrl(url);
            setResourceDescription(description);
            setResourceShortDescription(shortDescription);
            setResourceCategory(category);
            setTagsResource(tagsList);    
        
        }

    },[name]);

    const updateResource = async() => {
        setButtonisLoading(true);
        setNotificationError("");
        console.log(resourceId);

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

        if(!resourceShortDescription){
            setNotificationError("Campo Descripciòn corta es requerido");
            setButtonisLoading(false);
            return;
        }

        if(!resourceDescription){
            setNotificationError("Campo Descripciòn es requerido");
            setButtonisLoading(false);
            return;
        }

        //create
        if(resourceId == 0){

            await codeigniter.post('/assets',{
                'name' : resourceName,
                'url': resourceUrl,
                'short_description' : resourceShortDescription,
                'description': resourceDescription,
                'category' : resourceCategory,
                'tags': resourceTags 
            }).then(() => {
                setNotificationSuccess('Categoria creada');
                setTimeout(() => {
                  setNotificationSuccess("");
                  window.location.reload();
      
                },1000);
                return;
            }).catch((error) => {
      
                if(error.response){
                  let errors = error.response.data.messages;
                  setNotificationError(Object.values(errors)[0]);
                  setButtonisLoading(false);
                }
            });

        //update
        }else{

            await codeigniter.put('/assets/' + resourceId,{
                'name' : resourceName,
                'url': resourceUrl,
                'short_description' : resourceShortDescription,
                'description': resourceDescription,
                'category' : resourceCategory,
                'tags': resourceTags 
            }).then(() => {
                setNotificationSuccess('Recurso actualizado');
                
                setTimeout(() => {
                  setNotificationSuccess("");
                  window.location.reload();
      
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
    }

    const handlerName = (e:any) => {
        setNotificationError("");
        setResourceName(e.currentTarget.value);
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

            let description = (shortDescription.length > 150) ? prevState : shortDescription;
            return description;
        });
        setResourceShortDescriptionCount(prevState => {
            let count = (shortDescription.length > 150) ? prevState : shortDescription.length; 
            return count;
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

    return(
        <div className={(open) ? "modal is-active": 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head border-bottom">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={() => changeOpen(false)}></button>
                </header>
                <section className="modal-card-body">
                    <div className={(notificationError) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>{notificationError}</div>
                    <div className={(notificationSuccess) ? "notification has-text-white is-success" : 'notification is-success has-text-white is-hidden'}>{notificationSuccess}</div>
                    <form method='post'>
                        <div className="field mt-4">
                            <label className="label">Nombre de Recurso<span className="has-text-danger">*</span></label>
                            <div className="control">
                                <input className="input" value={resourceName} onChange={(e) => handlerName(e)} type="text" placeholder="" />
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">URL<span className="has-text-danger">*</span></label>
                            <div className="control">
                                <input className="input" value={resourceUrl} onChange={(e) => handlerUrl(e)}  type="text" placeholder="https://example.com" />
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">Descripcion Corta<span className="has-text-danger">*</span></label>
                            <div className="control">
                                <textarea className="textarea" value={resourceShortDescription} onChange={(e) => handlerShortDescription(e)} style={{resize:"none"}} placeholder=""></textarea>
                                <span>{resourceShortDescriptionCount} /150</span>
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">Descripcion<span className="has-text-danger">*</span></label>
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
                            <label className="label">Tags</label>
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