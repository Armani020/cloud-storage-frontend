import React from 'react';
import {Button, CssBaseline, TableBody, TableCell, TableRow} from "@mui/material";
import {Delete, FileCopy, FileDownloadOutlined, Folder} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../actions/file";
import sizeFormatter from "../../utils/sizeFormatter";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file.id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <CssBaseline>
            <TableBody>
                <TableRow hover role="checkbox" tabIndex={-1} onClick={() => openDirHandler(file)}>
                    <TableCell align="center">{file.type === 'dir' ? <Folder color="primary"/> :
                        <FileCopy color="primary"/>}</TableCell>
                    <TableCell sx={{ width: 400 }}>{file.name}</TableCell>
                    <TableCell>{file.date.slice(0, 10)}</TableCell>
                    {file.type !== 'dir' ? <TableCell align="right">{sizeFormatter(file.size)}</TableCell> : <TableCell align="center"> </TableCell>}
                    <TableCell align="center"><Button onClick={(e) => deleteClickHandler(e)}><Delete/></Button> </TableCell>
                    {file.type !== 'dir' ?
                        <TableCell align="center"> <Button onClick={(e) => downloadClickHandler(e)}><FileDownloadOutlined/></Button> </TableCell> :
                        <TableCell align="center"> </TableCell>
                    }
                </TableRow>
            </TableBody>
        </CssBaseline>
    );
};


export default File;