import axios from "axios";
import {setUser} from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        console.log(email + ' ' + password)
        const response = await axios.post(`http://localhost:8080/api/user/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e);
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
            alert(e);
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
            alert(e.data)
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }
}
