import ItemMenu from "../ItemMenu/ItemMenu"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faAngleUp } from '@fortawesome/free-solid-svg-icons';
import codeigniter from "../../Utils/axios";
import { useTheme } from "../../Provider/ThemeProvider";
import { NavLink } from "react-router-dom";

export default function CategoriesList(){

    const [categories,setCategories] = useState([]);
    const [categoriesDropdown,setCategoriesDropdown] = useState(false);
    const theme = useTheme();

    useEffect(() => {

        const getCategories = async() => {

            await codeigniter.get('/categories?page=-1').then((response) => {
                setCategories(response.data);
            })
        }

        getCategories();
    },[]);

    const handlerDropdow = () =>{
        setCategoriesDropdown(prevState => {
            return !prevState;
        })
    }

    return(
        <>
        <aside className="column is-one-fifth menu p-3 border-right vh-100 is-hidden-mobile">
             <div className="p-3">
                <p className="pb-2 has-text-centered">Categorias</p>
                <ul className="menu-list">

                    {   
                        (categories.length > 0 ) ? 

                            categories.map<any>((category:any) => {

                                let name = category.name;

                                return <ItemMenu key={category.id} name={category.name} href={'/category/' + name} />
                            })

                        :

                        <li>No existen categorias</li>
                    }

                </ul>
             </div>
        </aside>
        <aside className={(theme.theme == "light") ? "column is-full has-background-light menu p-3 is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only" : 'column is-full has-background-dark menu p-3 is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only'}>
            <div className={(categoriesDropdown) ? "dropdown w-100 pt-4 pr-4 pl-4 is-active" : 'dropdown w-100 pt-4 pr-4 pl-4'}>
                <div className="dropdown-trigger w-100">
                    <button className="button is-link w-100" onClick={() => handlerDropdow()} aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Categorias</span>
                    <span className="icon is-small is-position-right">
                       { (categoriesDropdown) ?  <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} /> }
                    </span>
                    </button>
                </div>
                <div className="dropdown-menu w-100 pb-4 pr-4 pl-4" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {   
                            (categories.length > 0 ) ? 

                                categories.map<any>((category:any) => {
                                    return <NavLink className={({isActive}) => { return isActive ? "dropdown-item is-active" : "dropdown-item"}} key={category.id} to={'/category/' + category.name}>{category.name}</NavLink>
                                })

                            :

                            <a>No existen categorias</a>
                        }
                    </div>
                </div>
            </div>
        </aside>
        </>
    )
}