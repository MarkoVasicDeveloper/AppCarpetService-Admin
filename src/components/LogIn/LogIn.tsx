import { faMailBulk, faSignature } from '@fortawesome/free-solid-svg-icons';
import Input from '../layout/input/Input';
import { useInputText } from '../../hooks/useInputText';
import { useEffect, useState } from 'react';
import { Button } from '../layout/button/Button';

export default function LogIn(): JSX.Element {
    const { data, edit } = useInputText({});

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!data.username || !data.password) return setDisabled(true);
        setDisabled(false);
    }, [data]);

    return (
        <section id="logIn">
            <div className="container">
                <h2>Ulogujte se</h2>
                <Input id={'username'} icon={faMailBulk} label='Korisnicko ime' onChangeInput={edit} name={'username'} placeholder='Korisnicko ime' required />
                <Input id={'password'} icon={faSignature} label='Lozinka' onChangeInput={edit} name={'password'} placeholder='Lozinka' required />
                <Button title={'Uloguj se'} onClickFunction={() => { }} type='submit' disabled={disabled} />
            </div>
        </section>
    )
}