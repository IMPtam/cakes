import React from "react";
import PropTypes from "prop-types";

const FilesUpload = ({ label, name, onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>

            <div className="input-group has-validation">
                <input
                    type="file"
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};
FilesUpload.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default FilesUpload;
