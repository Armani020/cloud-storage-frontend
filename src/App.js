import React, {useEffect} from "react";
import Navbar from "./components/navbar/Navbar";
import Disk from "./components/disk/Disk";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/user";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <div>
                    {!isAuth ?
                        <Switch>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to="/login"/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/" component={Disk}/>
                            <Redirect to="/"/>
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
