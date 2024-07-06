import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar"
import CategoriesList from "../../Components/CategoriesList/CategoriesList";
import Footer from "../../Components/Footer/Footer";


export default function Dashboard(){

    return(
        <>
            <Navbar hiddenButtonsAuth={1}/>
            <div className="columns is-multiline is-mobile mb-0">
                <CategoriesList/>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}