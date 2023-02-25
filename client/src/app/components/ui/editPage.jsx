import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { validator } from "../../utils/validator";
import TextAria from "../common/textAria";
import TextField from "../common/textField";
import BackHistoryButton from "../common/backButton";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getCakesLoadingStatus,
    getCakesByIds,
    modifyCake
} from "../../store/cakes";

// import { getOnlineUserData } from "../../store/users";

const EditPage = ({ id }) => {
    const history = useHistory();
    const [data, setData] = useState();
    // const onlineUser = useSelector(getOnlineUserData());
    const dispatch = useDispatch();
    const cakesLoading = useSelector(getCakesLoadingStatus());
    const cake = useSelector(getCakesByIds(id));
    const [errors] = useState({});

    // console.log(onlineUser);

    useEffect(() => {
        if (!cakesLoading) {
            setData(() => ({
                name: cake.name,
                image: cake.image,
                annotate: cake.annotate,
                discription: cake.discription
            }));
        }
    }, [cakesLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        dispatch(
            modifyCake({
                ...data,
                _id: cake._id
            })
        );

        history.push(`/catalog/${cake._id}`);
    };

    // useEffect(() => {
    //     validate();
    // }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // const validate = () => {
    //     const errors = validator(data);
    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    // const isValid = Object.keys(errors).length === 0;

    if (data) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Название"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextAria
                                    label="Краткое описание"
                                    name="annotate"
                                    value={data.annotate}
                                    onChange={handleChange}
                                    error={errors.annotate}
                                />
                                <TextAria
                                    label="Полное описание"
                                    name="discription"
                                    value={data.discription}
                                    onChange={handleChange}
                                    error={errors.discription}
                                />
                                <button
                                    type="submit"
                                    // disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Загрузка...";
};
EditPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default EditPage;
