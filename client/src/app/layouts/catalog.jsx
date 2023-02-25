import React from "react";
import { useParams } from "react-router-dom";
import CakesList from "../components/page/cakeList";
import EditPage from "../components/ui/editPage";
import FullCard from "../components/ui/fullCard";

const Catalog = () => {
    const params = useParams();
    const { cardId, edit } = params;
    return (
        <>
            {cardId ? (
                edit === "edit" ? (
                    <EditPage id={cardId} />
                ) : (
                    <FullCard id={cardId} />
                )
            ) : (
                <CakesList />
            )}
        </>
    );
};
export default Catalog;
