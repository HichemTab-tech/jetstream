import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Helmet } from 'react-helmet';

const Register = ({ hasTermsAndPrivacyPolicyFeature }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <AuthenticationCard logo={<AuthenticationCardLogo slot="logo" />}>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel value="Name" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            required
                            autoFocus
                            autoComplete="name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="mt-4">
                        <InputLabel value="Email" />
                        <TextInput
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="email"
                            className="mt-1 block w-full"
                            required
                            autoComplete="username"
                        />
                        <InputError message={errors.email} />
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
                        <InputError message={errors.password} />
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
                        <InputError message={errors.password_confirmation} />
                    </div>

                    {hasTermsAndPrivacyPolicyFeature && (
                        <div className="mt-4">
                            <Checkbox
                                id="terms"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                                name="terms"
                                required
                            />
                            <label htmlFor="terms" className="ml-2">
                                I agree to the{' '}
                                <Link href={route('terms.show')} className="underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href={route('policy.show')} className="underline">
                                    Privacy Policy
                                </Link>
                            </label>
                            <InputError message={errors.terms} />
                        </div>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Already registered?
                        </Link>

                        <PrimaryButton
                            className="ml-4"
                            disabled={processing}
                            style={{ opacity: processing ? 0.25 : 1 }}
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default Register;
