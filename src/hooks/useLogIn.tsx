import { useState } from 'react';

import api, { ApiResponse } from "../api/api";

import { useAppDispatch } from './useAppDispatch';
import { useNavigate } from 'react-router-dom';

import { setAdmin } from '../redux/administrator/adminSlice';

export function useLogIn() {
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const sendData = (data: Record<string, unknown>) => {

        if (!data.username && data.password) return setMessage('Kredenciali nisu popunjeni.');

        const login = async (): Promise<ApiResponse> => {
            return await api("auth/administrator", "post", { username: data.username, password: data.password }, 'administrator');
        };

        login()
            .then((res: ApiResponse) => {
                if (res.status !== 'ok') return setMessage('Network error')
                if (res.data?.text === 'error' && res.data.statusCode === -1001 || res.data?.statusCode === -2002) return setMessage('Lozinka ili mail nisu tacni');

                dispatch(setAdmin({
                    id: res.data?.id,
                    identity: res.data?.identity,
                    token: res.data?.token,
                    refreshToken: res.data?.refreshToken,
                    tokenExpire: res.data?.tokenExpire
                }));

                navigate('/home', { replace: true });
            })
            .catch((error: unknown) => console.log(error))
    };

    return { sendData, message };
}