import { useEffect, useState } from 'react';

import { faMailBulk, faSignature } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import Input from '../layout/input/Input';
import { SocialLink } from '../layout/social/SocialLink';
import { Button } from '../layout/button/Button';

import { useInputText } from '../../hooks/useInputText';
import { useLogIn } from '../../hooks/useLogIn';

export default function LogIn(): JSX.Element {
    const [disabled, setDisabled] = useState(true);

    const { data, edit } = useInputText({});
    const { sendData, message } = useLogIn();

    useEffect(() => {
        if (!data.username || !data.password) return setDisabled(true);
        setDisabled(false);
    }, [data]);

    return (
        <section id="logIn">
            <h1>Washer - Administrator Log in</h1>
            <div className="container">
                <h2>Ulogujte se</h2>
                <div className="social">
                    <SocialLink icon={faFacebook} link={"facebook.com"} />
                    <SocialLink icon={faInstagram} link={"instagram.com"} />
                </div>
                <Input id={'username'} icon={faMailBulk} label='Korisnicko ime' onChangeInput={edit} name={'username'} placeholder='Korisnicko ime' required />
                <Input id={'password'} icon={faSignature} label='Lozinka' onChangeInput={edit} name={'password'} placeholder='Lozinka' required />
                <Button title={'Uloguj se'} onClickFunction={() => sendData(data)} type='submit' disabled={disabled} />
            </div>
            <div className="message">{message}</div>
        </section>
    )
}