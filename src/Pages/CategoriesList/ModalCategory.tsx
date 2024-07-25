import { useState,useEffect } from "react";
import codeigniter from "../../Utils/axios";

export default function ModalCategory({id,title,open,changeOpen,newCategory,name,hidden,titleButton}:any){
   
    const [categoryId,setCategoryId] = useState(id); 
    const [categoryName,setCategoryName] = useState("");
    const [categoryNameCount,setCategoryNameCount] = useState(0);
    const [isHidden,setIsHidden] = useState<number>(hidden);
    const [isNew,setIsNew] = useState<number>(newCategory);
    const [notificationError,setNotificationError] = useState<any>("");
    const [notificationSuccess,setNotificationSuccess] = useState<any>("");
    const [buttonIsLoading,setButtonisLoading] = useState(false);
  
    useEffect(() => {
        
        if(name != ""){
            setCategoryId(id);
            setCategoryName(name);
            setCategoryNameCount(name.length);
            setIsHidden(hidden);
            setIsNew(newCategory);
        }else{
            setCategoryId(0);
            setCategoryName("");
            setCategoryNameCount(0);
            setIsHidden(0);
            setIsNew(0);
        }
    },[name]);
  
    const handlerName = (e:any) => {
        let name = e.currentTarget.value;
        
        setCategoryName(prevState => {
        
            let nameTemp = (name.length > 100) ? prevState : name;
            return nameTemp;
        });

        setCategoryNameCount(prevState => {

            let count = (name.length > 100) ? prevState : name.length;
            return count;

        })
    }

    const handlerIsNew = (e:any) => {
        
        if(e.currentTarget.checked == true){
            setIsNew(1);
        }else{
            setIsNew(0);
        }
    }

    const handlerIsHidden = (e:any) => {

        if(e.currentTarget.checked == true){
            setIsHidden(1);
        }else{
            setIsHidden(0);
        }
    }

    const updateCategory = async() => {

        setButtonisLoading(true);

        if(!categoryName){
            setNotificationError('Nombre de categoria es requerido');
            setButtonisLoading(false);
            return;
        }

        //add
        if(categoryId == 0){

            await codeigniter.post('/categories',{
                'name' : categoryName,
                'is_new': isNew,
                'is_hidden' : isHidden 
              }).then(() => {
                setNotificationSuccess('Categoria creada');
                setTimeout(() => {
                  window.location.reload();
                },2000);
                return;
              }).catch((error) => {
      
                if(error.response){
                  let errors = error.response.data.messages;
                  let message = new String(Object.values(errors)[0]);
                  setNotificationError(message);
                  setButtonisLoading(false);
                }
              });

        //update
        }else{
           
            await codeigniter.put('/categories/' + categoryId,{
                'name' : categoryName,
                'is_new':isNew,
                'is_hidden' : isHidden 
              }).then(() => {
                setNotificationSuccess('Categoria actualizada');
                
                setTimeout(() => {
                  window.location.reload();
                },1000);
                return;
                
              }).catch((error) => {
      
                if(error.response){
                  let errors = error.response.data.messages;
                  let message = new String(Object.values(errors)[0]);
                  setNotificationError(message);
                  setButtonisLoading(false);
                }
              });
        }

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
                            <label className="label">Nombre de categoria <span className="has-text-danger">*</span></label>
                            <div className="control">
                                <input className="input" onChange={(e) => handlerName(e)} value={categoryName} type="text" placeholder="" />
                                <span>{categoryNameCount} /100</span>
                            </div>
                        </div>
                        <div className="field mt-4">
                          <label className="checkbox">
                            <input type="checkbox" onChange={(e) => handlerIsNew(e)} checked={(isNew == 1) ? true : false} />
                            &nbsp; Marcar como nueva categoria
                          </label>
                        </div>
                        <div className="field mt-4">
                          <label className="checkbox">
                          <input type="checkbox" onChange={(e) => handlerIsHidden(e)} checked={(isHidden == 1) ? true : false}/>
                             &nbsp; Ocultar
                          </label>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot p-4">
                    <div className="buttons">
                        <button className={(buttonIsLoading) ? "button is-link is-loading" : 'button is-link'} onClick={() => updateCategory()}>{titleButton}</button>
                        <button className="button" onClick={() => changeOpen(false)}>Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}