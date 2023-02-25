import React from "react";
import PropTypes from "prop-types";
import "./smallCard.css";

const SmallCard = ({ card }) => {
    return (
        <div className="product">
            <div className="product-photo">
                <img src={card.image} alt="Карточка товара" />
            </div>
            <h3 className="text-decoration-none">{card.name}</h3>
            <p>{card.annotate}</p>
        </div>
    );
};

SmallCard.propTypes = {
    card: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SmallCard;

// <div className="card mb-3">
//     <div className="card-body">
//         {/* {onlineUser._id === curentUser._id && (
//             <button
//                 className="position-absolute top-0 end-0 btn btn-light btn-sm"
//                 onClick={() => handlePage()}
//             >
//                 <i className="bi bi-gear"></i>
//             </button>
//         )} */}

//         {/* <div className="d-flex flex-column align-items-center text-center position-relative"> */}
//         <div className="product-photo">
//             <img
//                 // src={curentUser.image}
//                 src="../../../../public/pexels-photo-827529.jpeg"
//                 className="rounded-circle"
//                 width="150"
//             />
//             {/* <div className="mt-3">
//                 {/* <h4>{curentUser.name}</h4> */}
//                 <h4>Торт номер 1</h4>
//                 <p className="text-secondary mb-1">
//                     {/* {curentUser.profession.name} */}
//                     Цена
//                 </p> */}
//                 {/* <div className="text-muted">
//                     <i
//                         className="bi bi-caret-down-fill text-primary"
//                         role="button"
//                     ></i>
//                     <i
//                         className="bi bi-caret-up text-secondary"
//                         role="button"
//                     ></i>
//                     <span className="ms-2">{curentUser.rate}</span>
//                 </div> */}
//             {/* </div> */}
//         </div>
//     </div>
// </div>
