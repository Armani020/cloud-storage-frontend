import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import {Box, Button, CircularProgress, Container, Input, LinearProgress, Typography} from "@mui/material";
import {ArrowBack, CreateNewFolder, Upload} from "@mui/icons-material";
import FileList from "./FileList";
import Popup from "./Popup";
import {setCurrentDir} from "../../reducers/fileReducer";
import styled from "@emotion/styled";
import {percent} from "../../utils/sizeFormatter";

const Disk = () => {
    const userSpace = useSelector(state => state.user.currentUser.usedSpace)
    const [open, setOpen] = useState(false);
    const [openDrag, setOpenDrag] = useState(false)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    const Input = styled('input')({
        display: 'none',
    });

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }


    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setOpenDrag(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setOpenDrag(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setOpenDrag(false)
    }

    return (!openDrag ?
            <Container maxWidth="lg" component={"main"} sx={{marginTop: 3}}
                       onDrop={dropHandler}
                       onDragEnter={dragEnterHandler}
                       onDragLeave={dragLeaveHandler}
                       onDragOver={dragEnterHandler}>
                <Box>
                    <Button size={"large"} sx={{ marginRight: 3, marginBottom: 2 }} onClick={() => backClickHandler()}>
                        <ArrowBack/>
                    </Button>
                    <Button sx={{ marginRight: 3, marginBottom: 2 }} onClick={handleClickOpen}>
                        <CreateNewFolder/>
                    </Button>
                    <label htmlFor="contained-button-file">
                        <Input id="contained-button-file" multiple type="file"
                               onChange={(event) => fileUploadHandler(event)}/>
                        <Button component="span" sx={{ marginBottom: 2 }}>
                            <Upload/>
                        </Button>
                    </label>
                    {/*<Box sx={{ width: '100%' }}>*/}
                    {/*    //{userSpace}*/}
                    <CircularProgress variant="determinate" value={percent(userSpace)} />
                    {/*</Box>*/}
                    <FileList/>
                    <Popup open={open} setOpen={setOpen}/>
                </Box>
            </Container>
            :
            <Container sx={{
                alignItems: "center",
                justifyContent: "center"
            }} onDrop={dropHandler}
                       onDragEnter={dragEnterHandler}
                       onDragLeave={dragLeaveHandler}
                       onDragOver={dragEnterHandler}
            >
                <Box sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed',
                    height: 'calc(100vh - 120px)'
                }}
                >
                    <Typography variant={"h3"} component={"div"}>
                        Drag your files here
                    </Typography>
                </Box>
            </Container>
    );
};

export default Disk;