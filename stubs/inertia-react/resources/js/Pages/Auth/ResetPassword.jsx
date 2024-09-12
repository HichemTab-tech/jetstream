import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Helmet } from 'react-helmet';

const ResetPassword = ({ email, token }) => {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.update'), {
            onFinish: () => {
                setData({
                    password: '',
                    password_confirmation: '',
                });
            },
        });
    };

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <AuthenticationCard logo={<AuthenticationCardLogo slot="logo" />}>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel value="Email" />
                        <TextInput
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="email"
                            className="mt-1 block w-full"
                            required
                            autoFocus
                            autoComplete="username"
                        />
                        {errors.email && <InputError message={errors.email} />}
                    </div>

                    <div className="mt-4">
                        <InputLabel value="Password" />
                        <TextInput
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autoComplete="new-password"
                        />
                        {errors.password && <InputError message={errors.password} />}
                    </div>

                    <div className="mt-4">
                        <InputLabel value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton disabled={processing} style={{ opacity: processing ? 0.25 : 1 }}>
                            Reset Password
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default ResetPassword;
