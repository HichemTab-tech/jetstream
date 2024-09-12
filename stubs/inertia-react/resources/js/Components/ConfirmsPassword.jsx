import { useState, useRef } from 'react';
import DialogModal from './DialogModal';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import TextInput from './TextInput';

const ConfirmsPassword = ({
    title = 'Confirm Password',
    content = 'For your security, please confirm your password to continue.',
    button = 'Confirm',
    onConfirmed,
    renderButton = null,
    show = false,
    children,
}) => {
    const [confirmingPassword, setConfirmingPassword] = useState(false);
    const [form, setForm] = useState({
        password: '',
        error: '',
        processing: false,
    });
    const passwordInputRef = useRef(null);

    const startConfirmingPassword = () => {
        axios.get(route('password.confirmation')).then((response) => {
            if (response.data.confirmed) {
                onConfirmed();
            } else {
                setConfirmingPassword(true);
                setTimeout(() => passwordInputRef.current?.focus(), 250);
            }
        });
    };

    const confirmPassword = () => {
        setForm((prev) => ({ ...prev, processing: true }));

        axios
            .post(route('password.confirm'), { password: form.password })
            .then(() => {
                setForm((prev) => ({ ...prev, processing: false }));
                closeModal();
                onConfirmed();
            })
            .catch((error) => {
                setForm((prev) => ({
                    ...prev,
                    processing: false,
                    error: error.response.data.errors.password[0],
                }));
                passwordInputRef.current?.focus();
            });
    };

    const closeModal = () => {
        setConfirmingPassword(false);
        setForm({
            password: '',
            error: '',
            processing: false,
        });
    };

    return (
        <span>
            <span>{show && renderButton && renderButton(startConfirmingPassword)}</span>

            <DialogModal show={confirmingPassword} onClose={closeModal}>
                <h3 slot="title">{title}</h3>
                <div slot="content">
                    {content}

                    <div className="mt-4">
                        <TextInput
                            ref={passwordInputRef}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            autoComplete="current-password"
                            onKeyUp={(e) => e.key === 'Enter' && confirmPassword()}
                        />

                        <InputError message={form.error} className="mt-2" />
                    </div>
                </div>

                <div slot="footer">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" disabled={form.processing} onClick={confirmPassword}>
                        {button}
                    </PrimaryButton>
                </div>
            </DialogModal>
        </span>
    );
};

export default ConfirmsPassword;
