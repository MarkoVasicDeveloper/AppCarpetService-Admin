/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import api, { ApiResponse } from "../api/api";

export function useLogIn() {
    const [message, setMessage] = useState('');

    const sendData = (data: Record<string, any>) => {

        if (!data.username && data.password) return setMessage('Kredenciali nisu popunjeni.');
        console.log(data)

        const login = async (): Promise<ApiResponse> => {
            return await api("auth/administrator", "post", { username: data.username, password: data.password }, 'administrator');
        };

        login()
            .then(() => {


            })
            .catch((error: unknown) => console.log(error))
    };

    return { sendData, message };
}
