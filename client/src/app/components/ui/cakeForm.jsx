import React, { useState } from "react";
import PropTypes from "prop-types";
// import { validator } from "../../utils/validator";
import TextAria from "../common/textAria";
import TextField from "../common/textField";
import BackHistoryButton from "../common/backButton";
import { useDispatch } from "react-redux";
import { addCake } from "../../store/cakes";
import FilesUpload from "../common/filesUpload";

const CakeForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        annotate: "",
        discription: "",
        image: ""
    });
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        const newCake = {
            ...data
        };
        dispatch(addCake(newCake));
    };

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
                                // error={errors.name}
                            />
                            <FilesUpload
                                label="Изображение"
                                name="image"
                                value={data.image}
                                onChange={handleChange}
                            />
                            <TextAria
                                label="Краткое описание"
                                name="annotate"
                                value={data.annotate}
                                onChange={handleChange}
                                // error={errors.annotate}
                            />

                            <TextAria
                                label="Полное описание"
                                name="discription"
                                value={data.discription}
                                onChange={handleChange}
                                // error={errors.discription}
                            />
                            <button
                                type="submit"
                                // disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Создать карточку
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
CakeForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default CakeForm;
