import ItemMenu from "../ItemMenu/ItemMenu"
import { useEffect, useState } from "react";
import codeigniter from "../../Utils/axios";

export default function CategoriesList(){

    const [categories,setCategories] = useState([]);

    useEffect(() => {

        const getCategories = async() => {

            await codeigniter.get('/categories').then((response) => {
                setCategories(response.data);
            })
        }

        getCategories();
    },[]);


    return(
        <aside className="column is-one-fifth menu p-3 border-right vh-100 is-hidden-mobile">
             <div className="p-3">
                <p className="pb-2 has-text-centered">Categorias</p>
                <ul className="menu-list">

                    {
                        categories.map<any>((category:any) => {
                            return <ItemMenu key={category.id} name={category.name} href={'/category/' + category.name} />
                        })
                    }

                </ul>
             </div>
        </aside>
    )
}