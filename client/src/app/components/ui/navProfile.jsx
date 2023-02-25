import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOnlineUserData } from "../../store/users";
const NavProfile = () => {
    const onlineUser = useSelector(getOnlineUserData());
    // const [isOpen, setOpen] = useState();
    // const toggleMenu = () => {
    //     setOpen((prevState) => !prevState);
    // };
    if (!onlineUser) return "Загрузка Профиля...";
    return (
        <div className=" d-flex">
            <div className="me-2">{onlineUser.name}</div>
            <img
                src={onlineUser.image}
                alt=""
                height="40"
                className="img-responsive rounded-circle"
            />
            <div>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
