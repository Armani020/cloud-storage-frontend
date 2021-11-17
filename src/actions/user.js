import axios from "axios";
import {setUser} from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        console.log(email + ' ' + password)
        const response = await axios.post(`http://localhost:8080/api/user/registration`, {
            email,
            password
        })
        console.log(response.data)
        alert(response.data)
    } catch (e) {
        console.log(e.response.data)
        alert(e.response.data);
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            console.log(email + ' ' + password)
            const response = await axios.post(`http://localhost:8080/api/user/login`, {
                email,
                password
            })
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            console.log(response.data)
            dispatch(auth())
        } catch (e) {
            //alert(e.response.data);
            alert("Log in error")
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            console.log(localStorage.getItem('access_token'))
            const response = await axios.get(`http://localhost:8080/api/user/auth`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            })
            console.log(response.data)
            dispatch(setUser(response.data))
            //localStorage.setItem('access_token', )
        } catch (e) {
            //console.log(e.response.data.error_message)
            //alert(e.response.data.error_message)
            alert("You are not authorized")
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }
}
