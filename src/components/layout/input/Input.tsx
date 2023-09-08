import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputParam {
    onChangeInput: (data: string) => void
    onEnter?: (() => void)
    type?: string
    name: string
    id: string
    required?: boolean
    footnoteTitle?: string
    placeholder?: string
    icon?: IconDefinition
    cleanUp?: boolean
    label?: string
}

export default function Input({ ...data }: InputParam): JSX.Element {
    const [dirty, setDirty] = useState(false);
    const [implementClass, setImplementClass] = useState('');
    const input = useRef<HTMLInputElement>(null);

    const { validation, message, invalid } = useFormValidation(data.onChangeInput, data.name, dirty, data.required);

    function setOnEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter') {
            (event.target as HTMLInputElement).value = ''
            data.onChangeInput(data.name)
            if (data.onEnter) data.onEnter();
        }
    }

    useEffect(() => { input.current!.value = '' }, [data.cleanUp]);
    useLayoutEffect(() => {
        if (data.label) return setImplementClass('text-input');
        setImplementClass('login-input');
    }, [data.label])

    return (
        <div className='input-container'>
            {data.label ?
                <label htmlFor={data.id} className={dirty ? 'show-label' : ''}>{data.label}</label>
                : ''}
            <div className="input">
                {data.icon !== undefined ?
                    <span>
                        <FontAwesomeIcon icon={data.icon} />
                    </span>
                    : ''}
                <input
                    ref={input}
                    className={invalid ? 'input-invalid' : implementClass}
                    name={data.name}
                    type={data.type ?? 'text'}
                    onChange={(event) => { validation(event) }}
                    onKeyUp={(event) => { setOnEnter(event) }}
                    id={data.id}
                    onFocus={() => { setDirty(true) }}
                    onBlur={(event) => { validation(event) }}
                    value={data.type === 'radio' ? data.id : undefined}
                    title={data.footnoteTitle}
                    placeholder={data.placeholder}
                />
            </div>
            {
                data.required ?
                    <div className='message'>
                        <span className='invalid'>{message}</span>
                    </div> : ''
            }
        </div>
    )
}