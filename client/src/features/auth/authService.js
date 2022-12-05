//Strictly For making HTTP request and sending data back and also storing any data in local storage
import axios from 'axios'

const API_URL = 'http://localhost:5001/api/users/'


//Register user
const register = async (userData) => { 
    const response = await axios.post(API_URL, userData) // storing response from server


    if (response.data) { //when using axios in puts the data in an object called data
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Register user
const login = async (userData) => { 
    const response = await axios.post(API_URL + 'login', userData) // storing response from server


    if (response.data) { //when using axios in puts the data in an object called data
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Logot user
const logout = () => { 
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService