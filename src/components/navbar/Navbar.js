import React from 'react';
import {AppBar, Button, CssBaseline, IconButton, Toolbar, Typography} from "@mui/material";
import {WbCloudyOutlined} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch();

    return (
        //<Box sx={{ flexGrow: 1 }}>
        <AppBar position={"static"}>
            <CssBaseline/>
            <Toolbar>
                <IconButton>
                    <WbCloudyOutlined
                        fontSize="large"
                    />
                </IconButton>
                <Typography
                    variant="h6"
                    //component="span"
                    sx={{flexGrow: 1}}
                >
                    Cloud Storage
                </Typography>
                { !isAuth && <Button color="inherit">
                    <NavLink to="/login" style={{textDecoration: 'none', color: 'white'}}>Login</NavLink>
                </Button> }
                { !isAuth && <Button color="inherit">
                    <NavLink to="/registration" style={{textDecoration: 'none', color: 'white'}}>Registration</NavLink>
                </Button> }
                { isAuth && <Button color="inherit" onClick={() => dispatch(logout())}>
                    Logout
                </Button> }
            </Toolbar>
        </AppBar>
        //</Box>
    );
};

export default Navbar;