import axios from 'axios';
export async function signIn() {
    try {
        const res = await axios.get('http://10.0.2.2:8000/user/64504f18617dbaa7a94de644');
        return res.data['nmUser'];
    } catch (err) {
        console.log(err);
    }
}