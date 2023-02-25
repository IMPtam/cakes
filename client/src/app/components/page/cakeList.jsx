import React from "react";
import SmallCard from "../ui/smallCard";
import "./cakeList.css";
import { useDispatch, useSelector } from "react-redux";
import { getCakes, getCakesLoadingStatus, removeCake } from "../../store/cakes";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import { getOnlineUserData } from "../../store/users";
// import CakeForm from "../ui/cakeForm";
import history from "../../utils/histore";

const CakesList = () => {
    const cakes = useSelector(getCakes());
    const dispatch = useDispatch();
    const cakesLoading = useSelector(getCakesLoadingStatus());
    const onlineUser = useSelector(getOnlineUserData());
    const handleChange = () => {
        const redirect = "/newcard";
        history.push(redirect);
    };
    const handleDelete = (id) => {
        dispatch(removeCake(id));
    };

    if (cakes && !cakesLoading) {
        return (
            <div>
                {onlineUser && (
                    <div className="cakeList_btm">
                        <button
                            className="btn btn-primary "
                            onClick={() => handleChange()}
                        >
                            Добавить товар
                        </button>
                    </div>
                )}

                <ul className="products clearfix">
                    {cakes.map((cake) => (
                        <li className="product-wrapper" key={cake._id}>
                            <Link to={`/catalog/${cake._id}`}>
                                <SmallCard card={cake} />
                            </Link>
                            {onlineUser && (
                                <div className=" d-flex justify-content-center">
                                    <button
                                        className="btn btn-danger "
                                        onClick={() => handleDelete(cake._id)}
                                    >
                                        Удалить Х
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return <Loader />;
    }
};

export default CakesList;
