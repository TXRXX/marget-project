import axios from 'axios';
import Cookies from 'js-cookie';

export async function login(username, password) {
    const response = await axios.post('/login', {
        username,
        password
    });
    Cookies.set('token', response.data.accessToken);
}

export async function logout() {
    await axios.get('/logout');
    Cookies.remove('token');
}

export async function register(username, password, email, phone, firstname, lastname) {
    const response = await axios.post('/register', {
        username,
        password,
        email,
        phone,
        firstname,
        lastname,
    });
    return response.data;
}
