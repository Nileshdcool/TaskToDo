import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface DeleteConfirmDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="custom-confirm-alert">
            <h1>Confirm to delete</h1>
            <p>Are you sure you want to delete this todo?</p>
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