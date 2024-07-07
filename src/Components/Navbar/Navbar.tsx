import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun,faMoon,faUser} from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket,faTableColumns} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../../Provider/ThemeProvider";
import NavbarProps from "./InterfaceNavbar";

export default function Navbar({hiddenButtonsAuth}:NavbarProps){
    const Theme = useTheme();
    const [theme,setTheme] = useState(Theme.theme);
    const buttonsAuth = hiddenButtonsAuth;
    const Auth = useAuth();
    const user = JSON.parse(Auth.user);
    const navigate = useNavigate();
    const [toggleBurguer,setToggleBurguer] = useState(false);

    const logoutUser = () => {
        Auth.logout();
        navigate('/account/login');
    }

    const handleTheme = () => {
        let theme_selectable = (theme == 'light') ? 'dark' : 'light';
        setTheme(theme_selectable);
        Theme.handlerTheme(theme_selectable);
    }

    const toggleNav = () => {

        setToggleBurguer(prevState => {
            return !prevState;
        })
    }

    return(
        <>
            {
                (buttonsAuth == 1) ? 

                <nav className="navbar border-bottom">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to={"/"}><strong>TecnoHub</strong></Link>
                        <a role="button" onClick={() => toggleNav()} className={(toggleBurguer) ? 'navbar-burger is-active' : "navbar-burger"} aria-label="menu" data-target="navbarmenu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarmenu" className={(toggleBurguer) ? "navbar-menu is-active" : 'navbar-menu'}>
                        <div className="navbar-start">
                            <Link className="navbar-item has-text-weight-medium" to={"/"}>Inicio</Link>
                            <Link className="navbar-item has-text-weight-medium" to={"/about"}>Acerca del proyecto</Link>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                {
                                    (Auth.token) ? 
                                    <>
                                        <div className="navbar-item has-dropdown is-hoverable">
                                            <span className="navbar-link">{user.name + " " + user.last_name }</span>
                                            <div className="navbar-dropdown is-right">
                                                {
                                                    (user.role_id == 1) ? (

                                                        <Link className="navbar-item" to={"/dashboard/overview"}>
                                                            <FontAwesomeIcon icon={faTableColumns} />
                                                            &nbsp; Panel de Administraci&oacute;n
                                                        </Link>
                                                    ) : 

                                                    ""
                                                } 
                                               
                                                <Link className="navbar-item" to={"/user/profile"}>
                                                    <FontAwesomeIcon icon={faUser} />
                                                    &nbsp; Perfil
                                                </Link>
                                                <a href="" className="navbar-item" onClick={() => logoutUser()}>
                                                <FontAwesomeIcon icon={faRightFromBracket} /> 
                                                &nbsp;Cerrar Sesi&oacute;n
                                                </a>
                                            </div>
                                        </div>
                                        <button onClick={() => handleTheme()} className="button is-ghost">
                                            {
                                                (theme == "light") ? 
                                                <FontAwesomeIcon icon={faMoon} size="lg" />
                                                :
                                                <FontAwesomeIcon icon={faSun} size="lg" />
                                            }
                                        </button>
                                    </>
                                    :
                                    <div className="buttons">
                                        <Link className="button " to={'/account/login'}>Iniciar Sesi&oacute;n</Link>
                                        <Link className="button is-link has-text-white" to={'/account/register'}>Registarse</Link>
                                        <button onClick={() => handleTheme()} className="button is-ghost">
                                            {
                                                (theme == "light") ? 
                                                <FontAwesomeIcon icon={faMoon} />
                                                :
                                                <FontAwesomeIcon icon={faSun} />
                                            }
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>

                : 

                <nav className="navbar border-bottom">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to={"/"}>TecnoHub</Link>
                        <a role="button" onClick={() => toggleNav()} className={(toggleBurguer) ? 'navbar-burger is-active' : "navbar-burger"} aria-label="menu" data-target="navbarmenu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className={(toggleBurguer) ? "navbar-menu is-active" : 'navbar-menu'}>
                        <div className="navbar-start">
                            <Link className="navbar-item has-text-weight-medium" to={"/"}>Inicio</Link>
                            <Link className="navbar-item has-text-weight-medium" to={"/about"}>Acerca de proyecto</Link>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <button onClick={() => handleTheme()} className="button is-ghost">
                                        {
                                            (theme == "light") ? 
                                            <FontAwesomeIcon icon={faMoon} />
                                            :
                                            <FontAwesomeIcon icon={faSun} />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </>
    )
}