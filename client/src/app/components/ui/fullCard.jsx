import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCakesByIds, getCakesLoadingStatus } from "../../store/cakes";
import BackHistoryButton from "../common/backButton";
import Loader from "../common/loader";
import { getOnlineUserData } from "../../store/users";
// import "./fullcard.css";
import history from "../../utils/histore";

const FullCard = ({ id }) => {
    const cake = useSelector(getCakesByIds(id));
    const cakesLoading = useSelector(getCakesLoadingStatus());
    const onlineUser = useSelector(getOnlineUserData());
    const handlePage = () => {
        const redirect = `${history.location.pathname}` + "/edit";
        history.push(redirect);
    };

    if (cake && !cakesLoading) {
        return (
            <div>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`.${cake.image}`}
                            className="img-fluid rounded-start"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            {onlineUser && (
                                <button
                                    className="btn btn-warning btn-sm "
                                    onClick={() => handlePage()}
                                >
                                    Редактировать
                                </button>
                            )}
                            <h5 className="card-title">{cake.name}</h5>

                            <p className="card-text align-text-bottom">
                                <small className="text-muted">
                                    {cake.annotate}
                                </small>
                            </p>
                        </div>
                    </div>
                    <div>{cake.discription}</div>
                </div>

                <BackHistoryButton />
            </div>
        );
    } else {
        return <Loader />;
    }
};
FullCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
export default FullCard;
