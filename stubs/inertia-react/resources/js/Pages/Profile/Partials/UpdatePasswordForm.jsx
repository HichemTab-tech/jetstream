import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const UpdatePasswordForm = () => {
    const { data, setData, put, processing, recentlySuccessful, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const updatePassword = (e) => {
        put(route('user-password.update'), {
            errorBag: 'updatePassword',
            preserveScroll: true,
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
            onSuccess: () => reset(),
        });
    };

    return (
        <FormSection
            onSubmit={updatePassword}
            title="Update Password"
            description="Ensure your account is using a long, random password to stay secure."
        >
            <FormSection.Slot slot="form">
                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="current_password" value="Current Password" />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>
            </FormSection.Slot>

            <FormSection.Slot slot="actions">
                <ActionMessage on={recentlySuccessful} className="me-3">
                    Saved.
                </ActionMessage>

                <PrimaryButton disabled={processing} className={`${processing ? 'opacity-25' : ''}`}>
                    Save
                </PrimaryButton>
            </FormSection.Slot>
        </FormSection>
    );
};

export default UpdatePasswordForm;
