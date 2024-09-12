import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Helmet } from 'react-helmet';

const ConfirmPassword = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const confirmingPassword = useRef(false);
    const passwordInputRef = useRef(null);

    const startConfirmingPassword = () => {
        axios.get(route('password.confirmation')).then((response) => {
            if (response.data.confirmed) {
                //emit('confirmed');
            } else {
                confirmingPassword.value = true;

                setTimeout(() => passwordInput.value.focus(), 250);
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => {
                reset();
                passwordInputRef.current?.focus();
            },
        });
    };

    return (
        <>
            <Helmet>
                <title>Secure Area</title>
            </Helmet>
            <AuthenticationCard logo={<AuthenticationCardLogo slot="logo" />}>
                <div className="mb-4 text-sm text-gray-600">
                    This is a secure area of the application. Please confirm your password before continuing.
                </div>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            ref={passwordInputRef}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autoComplete="current-password"
                            autoFocus
                        />
                        {errors.password && <InputError message={errors.password} />}
                    </div>

                    <div className="flex justify-end mt-4">
                        <PrimaryButton
                            className="ml-4"
                            disabled={processing}
                            style={{ opacity: processing ? 0.25 : 1 }}
                        >
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default ConfirmPassword;
