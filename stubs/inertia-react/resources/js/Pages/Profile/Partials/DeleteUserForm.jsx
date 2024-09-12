// noinspection JSCheckFunctionSignatures

import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal'; // Assume this is a React modal component you have
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Slot from '@/Components/Slot.jsx';

const DeleteUserForm = () => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInputRef = useRef(null);
    const {
        data,
        setData,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
        setTimeout(() => {
            passwordInputRef.current?.focus();
        }, 250);
    };

    const deleteUser = () => {
        destroy(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
                passwordInputRef.current?.focus();
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <ActionSection title="Delete Account" description="Permanently delete your account.">
            <div className="max-w-xl text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </div>

            <div className="mt-5">
                <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>
            </div>

            {/* Delete Account Confirmation Modal */}
            <DialogModal show={confirmingUserDeletion} onRequestClose={closeModal}>
                <Slot slot="title">Delete Account</Slot>
                <Slot slot="content">
                    Are you sure you want to delete your account? Once your account is deleted, all of its resources and
                    data will be permanently deleted. Please enter your password to confirm you would like to
                    permanently delete your account.
                    <div className="mt-4">
                        <TextInput
                            ref={passwordInputRef}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            autoComplete="current-password"
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') deleteUser();
                            }}
                        />

                        {errors.password && <InputError message={errors.password} />}
                    </div>
                </Slot>

                <Slot slot="footer">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <DangerButton
                        className="ml-3"
                        disabled={processing}
                        style={{ opacity: processing ? 0.25 : 1 }}
                        onClick={deleteUser}
                    >
                        Delete Account
                    </DangerButton>
                </Slot>
            </DialogModal>
        </ActionSection>
    );
};

export default DeleteUserForm;
