import axios from "axios";
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:8080/api/files?parent=${dirId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}
            })
            dispatch(setFiles(response.data))
            console.log(response.data)
        } catch (e) {
            alert(e.response.message)
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:8080/api/files?parent=${dirId}`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if (dirId) {
                formData.append('parent', dirId)
            }

            const response = await axios.post(`http://localhost:8080/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(uploadFile.progress)
                        //dispatch(changeUploadFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.message)
        }
    }
}

export async function downloadFile(file) {
    const response = await fetch(`http://localhost:8080/api/files/download?fileId=${file.id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/files?fileId=${file.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}
            })
            dispatch(deleteFileAction(file.id))
            alert(response.data.message)
        } catch (e) {
            alert(e.response.message)
        }
    }
}