import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import useTheme from "../hooks/useTheme";
import "./navBar.css";

const NavBar = () => {
    const [isOpen, setOpen] = useState();
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const isLoggedIn = useSelector(getIsLoggedIn());
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className="navbar navbar-expand-md ">
            <div className={`container-fluid ${theme}`}>
                <Link to="/">
                    {/* <a className="navbar-brand" href="#"> */}
                    <img
                        src="logo_nataly_3.png"
                        alt="Логотип"
                        className="m-1"
                    />
                    {/* </a> */}
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    onClick={toggleMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={
                        "offcanvas offcanvas-end" + (isOpen ? " show" : "")
                    }
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5
                            className="offcanvas-title"
                            id="offcanvasNavbarLabel"
                        >
                            +375298688810
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={toggleMenu}
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                            <li className="nav-item ">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Рецепты
                                </a>
                            </li>
                            <li className="nav-item ">
                                <Link to="/catalog" className="nav-link">
                                    Каталог
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-link"
                                    type="button"
                                    onClick={toggleTheme}
                                >
                                    Сменить фон
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="call_login d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link to="/login" className="header__login login">
                            <img src="person-circle.svg" alt="Вход" />
                            Вход
                        </Link>
                    )}
                    <a href="" className="header__phone phone">
                        <img src="telephone.svg" alt="Телефон" />
                        +375(29)86-888-10
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

// <nav className="navbar navbar-expand-md bg-danger ">
//     <div className="container-fluid">
//         <a className="navbar-brand" href="#">
//             <img
//                 src="logo_nataly_3.png"
//                 alt="Логотип"
//                 className="m-1"
//             />
//         </a>
//         <button
//             className="navbar-toggler"
//             type="button"
//             // data-bs-toggle="collapse"
//             // data-bs-target="#navbarSupportedContent"
//             // aria-controls="navbarSupportedContent"
//             // aria-expanded="false"
//             // aria-label="Toggle navigation"
//             onClick={toggleMenu}
//         >
//             <span className="navbar-toggler-icon"></span>
//         </button>

//         <div
//             className={
//                 "collapse navbar-collapse" + (isOpen ? " show" : "")
//             }
//             id="navbarNavDropdown"
//         >
//             <ul className="navbar-nav">
//                 <li className="nav-item">
//                     <a
//                         className="nav-link active"
//                         aria-current="page"
//                         href="#"
//                     >
//                         Рецепты
//                     </a>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link" href="#">
//                         Каталог
//                     </a>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link" href="#">
//                         О нас
//                     </a>
//                 </li>
//             </ul>
//         </div>
//         <div className="call-login ">
//             <a href="" className="header__login login">
//                 <img src="person-circle.svg" alt="Вход" />
//                 Вход
//             </a>
//             <a href="" className="header__phone phone">
//                 <img src="telephone.svg" alt="Вход" />
//                 +375(29)86-888-10
//             </a>
//         </div>
//     </div>
// </nav>
