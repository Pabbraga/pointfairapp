import axios from 'axios';
export async function signIn(email, password) {
    try {
        const res = await axios.post('http://10.0.2.2:8000/auth/login', {email: email, password: password});
        return res.data;
    } catch (err) {
        console.log(err);
        return err.response.data['msg'];
    }
}