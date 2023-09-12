import ReactDom from 'react-dom'
import { Button } from '../layout/button/Button';

interface ModalProps {
    open: boolean
    children: React.ReactNode
    close: () => void
}

export function Modal({ open, children, close }: ModalProps): React.ReactPortal | null {
    if (!open) return null;

    return ReactDom.createPortal(
        <section id="modal">
            <Button title="Close" onClickFunction={close} implementClass="fixed" />
            <div className="modal-content">
                {children}
            </div>
        </section>,
        document.getElementById('portal') as HTMLDivElement
    )
}