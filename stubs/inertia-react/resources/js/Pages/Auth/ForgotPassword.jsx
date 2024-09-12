import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Helmet } from 'react-helmet';

const ForgotPassword = ({ status }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <AuthenticationCard logo={<AuthenticationCardLogo slot="logo" />}>
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a
                    password reset link that will allow you to choose a new one.
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

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

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton disabled={processing} style={{ opacity: processing ? 0.25 : 1 }}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default ForgotPassword;
