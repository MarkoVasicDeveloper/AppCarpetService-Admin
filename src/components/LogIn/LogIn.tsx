import { faMailBulk, faSignature } from '@fortawesome/free-solid-svg-icons';
import Input from '../layout/input/Input';
import { useInputText } from '../../hooks/useInputText';
import { useEffect } from 'react';
import { Button } from '../layout/button/Button';

export default function LogIn(): JSX.Element {
    const { data, edit } = useInputText({});

    useEffect(() => console.log(data), [data]);

    return (
        <section id="logIn">
            <div className="container">
                <Input id={'username'} icon={faMailBulk} label='Korisnicko ime:' onChangeInput={edit} name={'username'} required />
                <Input id={'password'} icon={faSignature} label='Lozinka' onChangeInput={edit} name={'password'} required />
            </div>
            <Button title={'Uloguj se'} onClickFunction={() => { }} type='submit' />
        </section>
    )
}