import axios from 'axios';
export async function signIn(email, password, signed) {
    try {
        const res = await axios.post('https://pointfair.onrender.com/auth/login', {email: email, password: password, signed: signed});
        return res.data;
    } catch (err) {
        return err.response.data ? err.response.data['msg'] : "Ocorreu um erro, tente mais tarde.";
    }
}