import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { registerFail, registerUser } from '../slices/auth/authSlice';

export const useRegister = async (name, email, password) => {
    const dispatch = useDispatch();

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch(registerUser({ token: res.data }));
    } catch(err) {
        const errors = err.response.data.errors;
        dispatch(registerFail());
    }
}