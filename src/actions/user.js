import axios from "axios";

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
