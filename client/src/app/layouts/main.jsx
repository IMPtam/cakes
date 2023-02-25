import React from "react";
import { Link } from "react-router-dom";
// import NavBar from "../components/ui/navBar";
// import NavBar from "../components/ui/navBar";
import "./main.css";

const Main = () => {
    return (
        <div className="wrapper">
            {/* <div className="header">
                <div className="header__container _container">
                    <NavBar />
                </div>
            </div> */}
            <main className="page">
                <div className="page__main-block main-block">
                    <div className="main-block__container _container">
                        <div className="main-block__body">
                            <h1 className="main-block__title">
                                <i>Торты на заказ</i>
                            </h1>
                            <div className="main-block__text">
                                <i>
                                    Делаем торты и пряники на заказ под разные
                                    мероприятия. Доставка c 09.00 до 16.00
                                </i>
                            </div>
                            <Link
                                to="/catalog"
                                href=""
                                className="main-block__buton"
                            >
                                Выбрать торт
                            </Link>
                        </div>
                    </div>
                    <div className="main-block__image _ibg">
                        <img src="./pexels-photo-827529.jpeg" alt="fon_image" />
                    </div>
                </div>
                <div className="page__products products">
                    <div className="products__body">
                        <h1 className="products__title">Торты на заказ</h1>
                        <div className="products__subtitle">
                            <center>
                                Наш ассортимент отличается многообразием. Кексы
                                c различными начинками, имбирное печенье c
                                ручной росписью и торты от классических до
                                уникальных собственных рецептов.
                            </center>{" "}
                        </div>
                        <div className="products__catalog catalog">
                            <div className="catalog__item">
                                <img
                                    src=""
                                    alt=""
                                    className="catalog__item_image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="products__image _ibg">
                        <img
                            src="seamless-pattern-with-pastries-buns-cakes-croissant-bread-baking-doodle-background_511024-864.webp"
                            alt="fon_image"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;

/* //  <div className="main-block__body">
//      <h1 className="main-block__title">
//          <i>Торты на заказ</i>
//      </h1>
//      <div className="main-block__text">
//          <i>
//              Делаем торты и пряники на заказ под разные мероприятия. Доставка с
//              09.00 до 16.00
//          </i>
//      </div>
//      <a href="" className="main-block__buton">
//          Выбрать торт
//      </a>
//  </div>; */

/* // return (
    //     <div className="min-vh-100 overflow-hidden d-flex">
    //         <div className=" container position-relative">
    //             <main className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
    //                 <img src="./pexels-photo-827529.jpeg" alt="fon_image" />
    //             </main>
    //             <header className="position-absolute top-0 start-0">
    //                 <NavBar />
    //             </header>
    //         </div>
    //     </div>
    ); */
