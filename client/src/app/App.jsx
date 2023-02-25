import React from "react";
// import CakesList from "./components/page/cakeList";
import Main from "./layouts/main";
import { Route } from "react-router-dom";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";
import Catalog from "./layouts/catalog";
import AppLoader from "./components/ui/HOC/appLoader";
import LogOut from "./layouts/logOut";
import CakeForm from "./components/ui/cakeForm";

const App = () => {
    return (
        <div className="App">
            <AppLoader>
                <NavBar />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={LogOut} />
                <Route path="/newcard" component={CakeForm} />
                <Route path="/catalog/:cardId?/:edit?" component={Catalog} />
                <Route exact path="/" component={Main} />
                {/* <header className="App-header"> */}
                {/* <Main /> */}
                {/* <CakesList /> */}
                {/* <Route path="/logout" component={LogOut} /> */}
                {/* </header> */}
            </AppLoader>
        </div>
    );
};

export default App;
