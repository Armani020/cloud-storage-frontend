import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../actions/file";
import {useInput} from "../../hooks/inputHooks";

const Popup = ({open, setOpen}) => {
    const dir = useInput('', "minLength")
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dir.value))
        setOpen(false)
        dir.setValue('')
    }

    return (
        <div>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
                <DialogTitle>Create folder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter folder name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={dir.value}
                        onChange={e => dir.onChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={createHandler}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Popup;