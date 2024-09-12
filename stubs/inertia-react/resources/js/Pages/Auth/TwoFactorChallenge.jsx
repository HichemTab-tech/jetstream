import React, { useState, useRef, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Helmet } from 'react-helmet';

const TwoFactorChallenge = () => {
    const [recovery, setRecovery] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const recoveryCodeInputRef = useRef(null);
    const codeInputRef = useRef(null);

    const toggleRecovery = () => {
        setRecovery(!recovery);
        setData(recovery ? { code: '' } : { recovery_code: '' });
    };

    useEffect(() => {
        if (recovery) {
            recoveryCodeInputRef.current?.focus();
        } else {
            codeInputRef.current?.focus();
        }
    }, [recovery]);

    const submit = (e) => {
        e.preventDefault();
        post(route('two-factor.login'));
    };

    return (
        <>
            <Helmet>
                <title>Two-factor Confirmation</title>
            </Helmet>
            <AuthenticationCard logo={<AuthenticationCardLogo slot="logo" />}>
                <div className="mb-4 text-sm text-gray-600">
                    {!recovery
                        ? 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
                        : 'Please confirm access to your account by entering one of your emergency recovery codes.'}
                </div>

                <form onSubmit={submit}>
                    {!recovery ? (
                        <>
                            <InputLabel value="Code" />
                            <TextInput
                                id="code"
                                ref={codeInputRef}
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                type="text"
                                inputMode="numeric"
                                className="mt-1 block w-full"
                                autoFocus
                                autoComplete="one-time-code"
                            />
                            <InputError message={errors.code} />
                        </>
                    ) : (
                        <>
                            <InputLabel value="Recovery Code" />
                            <TextInput
                                id="recovery_code"
                                ref={recoveryCodeInputRef}
                                value={data.recovery_code}
                                onChange={(e) => setData('recovery_code', e.target.value)}
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="one-time-code"
                            />
                            <InputError message={errors.recovery_code} />
                        </>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="button"
                            className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
                            onClick={toggleRecovery}
                        >
                            {recovery ? 'Use an authentication code' : 'Use a recovery code'}
                        </button>

                        <PrimaryButton
                            className="ml-4"
                            disabled={processing}
                            style={{ opacity: processing ? 0.25 : 1 }}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default TwoFactorChallenge;
