import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {DeleteConfirmDialogProps} from '@/types/delete-confirm-dialog-props.interface';
import { MESSAGES } from '@/constants/messages';

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="custom-confirm-alert">
            <h1>{MESSAGES.CONFIRM_TO_DELETE}</h1>
            <p>{MESSAGES.CONFIRM_DELETE}</p>
            <div className="button-group">
                <button onClick={onConfirm} className="confirm-button">Yes</button>
                <button onClick={onCancel} className="cancel-button">No</button>
            </div>
        </div>
    );
};

export const showDeleteConfirm = (onConfirm: () => void) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return <DeleteConfirmDialog onConfirm={() => { onConfirm(); onClose(); }} onCancel={onClose} />;
        },
        overlayClassName: "custom-overlay"
    });
};

export default DeleteConfirmDialog;