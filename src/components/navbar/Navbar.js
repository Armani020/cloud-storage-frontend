import React from 'react';
import {AppBar, Button, CssBaseline, IconButton, Toolbar, Typography} from "@mui/material";
import {WbCloudyOutlined} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        //<Box sx={{ flexGrow: 1 }}>
        <AppBar position={"static"}>
            <CssBaseline />
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
                <Button color="inherit">
                    <NavLink to="/login" style={{textDecoration: 'none', color: 'white'}}>Login</NavLink>
                </Button>
                <Button color="inherit">
                    <NavLink to="/registration" style={{textDecoration: 'none', color: 'white'}}>Registration</NavLink>
                </Button>
            </Toolbar>
        </AppBar>
        //</Box>
    );
};

export default Navbar;