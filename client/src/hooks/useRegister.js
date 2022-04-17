import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { registerFail, registerUser } from '../slices/auth/authSlice';
import { setAlert } from '../slices/alert/alertSlice';
import { useState } from 'react';

export const useRegister = async (name, email, password) => {
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
    } catch(err) {
        const errors = err.response.data.errors;
        let errorMessage = "";
        errors.forEach(error => errorMessage += ` ${error.msg}`)
        dispatch(setAlert({ msg: errorMessage !== "" ? errorMessage : "Error while registering user", alertType: 'danger'}))
        dispatch(registerFail());
        setLoading(false);
    }

    return {loading}
}