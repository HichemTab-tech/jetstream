// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import ConfirmsPassword from '@/Components/ConfirmsPassword';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const TwoFactorAuthenticationForm = () => {
    const { auth, confirmsTwoFactorAuthentication } = usePage().props;
    const user = auth.user;
    const [enabling, setEnabling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [disabling, setDisabling] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [setupKey, setSetupKey] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        delete: destroy,
    } = useForm({
        code: '',
    });

    const twoFactorEnabled = !enabling && user.two_factor_enabled;

    const fetchQrCode = async () => {
        const response = await axios.get(route('two-factor.qr-code'));
        console.log(response);
        setQrCode(response.data.svg);
    };

    const fetchSetupKey = async () => {
        const response = await axios.get(route('two-factor.secret-key'));
        console.log(response);
        setSetupKey(response.data.secretKey);
    };

    const fetchRecoveryCodes = async () => {
        const response = await axios.get(route('two-factor.recovery-codes'));
        console.log(response);
        setRecoveryCodes(response.data);
    };

    const enableTwoFactorAuthentication = () => {
        setEnabling(true);
        post(route('two-factor.enable'), {
            preserveScroll: true,
            onSuccess: (res) => {
                console.log(res);
                Promise.all([fetchQrCode(), fetchSetupKey(), fetchRecoveryCodes()]).then();
            },
            onFinish: () => {
                setEnabling(false);
                setConfirming(confirmsTwoFactorAuthentication);
            },
        });
    };

    const confirmTwoFactorAuthentication = () => {
        post(route('two-factor.confirm'), {
            onSuccess: () => {
                setConfirming(false);
                setQrCode(null);
                setSetupKey(null);
            },
            onError: () => {
                setData('code', ''); // Clear the input
            },
        });
    };

    const regenerateRecoveryCodes = () => {
        axios.post(route('two-factor.recovery-codes')).then(() => fetchRecoveryCodes());
    };

    const disableTwoFactorAuthentication = () => {
        setDisabling(true);
        destroy(route('two-factor.disable'), {
            onSuccess: () => {
                setDisabling(false);
                setConfirming(false);
            },
        });
    };

    // noinspection JSValidateTypes
    return (
        <ActionSection
            title="Two Factor Authentication"
            description="Add additional security to your account using two factor authentication."
        >
            {twoFactorEnabled && !confirming && (
                <h3 className="text-lg font-medium text-gray-900">You have enabled two factor authentication.</h3>
            )}

            {twoFactorEnabled && confirming && (
                <h3 className="text-lg font-medium text-gray-900">Finish enabling two factor authentication.</h3>
            )}

            {!twoFactorEnabled && (
                <h3 className="text-lg font-medium text-gray-900">You have not enabled two factor authentication.</h3>
            )}

            <div className="mt-3 max-w-xl text-sm text-gray-600">
                <p>
                    When two factor authentication is enabled, you will be prompted for a secure, random token during
                    authentication. You may retrieve this token from your phone's Google Authenticator application.
                </p>
            </div>

            {twoFactorEnabled && (
                <div>
                    {qrCode && (
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-gray-600">
                                {confirming ? (
                                    <p className="font-semibold">
                                        To finish enabling two factor authentication, scan the following QR code using
                                        your phone's authenticator application or enter the setup key and provide the
                                        generated OTP code.
                                    </p>
                                ) : (
                                    <p>
                                        Two factor authentication is now enabled. Scan the following QR code using your
                                        phone's authenticator application or enter the setup key.
                                    </p>
                                )}
                            </div>

                            <div
                                className="mt-4 p-2 inline-block bg-white"
                                dangerouslySetInnerHTML={{ __html: qrCode }}
                            />

                            {setupKey && (
                                <div className="mt-4 max-w-xl text-sm text-gray-600">
                                    <p className="font-semibold">
                                        Setup Key: <span>{setupKey}</span>
                                    </p>
                                </div>
                            )}

                            {confirming && (
                                <div className="mt-4">
                                    <InputLabel htmlFor="code" value="Code" />
                                    <TextInput
                                        name="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        className="mt-1 block w-1/2"
                                        autoFocus
                                        autoComplete="one-time-code"
                                    />
                                    <InputError message={errors.code} />
                                </div>
                            )}
                        </div>
                    )}

                    {recoveryCodes.length > 0 && !confirming && (
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-gray-600">
                                <p className="font-semibold">
                                    Store these recovery codes in a secure password manager. They can be used to recover
                                    access to your account if your two factor authentication device is lost.
                                </p>
                            </div>

                            <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
                                {recoveryCodes.map((code) => (
                                    <div key={code}>{code}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-5">
                <div>
                    {!twoFactorEnabled ? (
                        <ConfirmsPassword
                            show={true}
                            onConfirmed={enableTwoFactorAuthentication}
                            renderButton={(onClick) => (
                                <PrimaryButton
                                    className={enabling ? ' opacity-25' : ''}
                                    disabled={enabling}
                                    onClick={onClick}
                                >
                                    Enable
                                </PrimaryButton>
                            )}
                        />
                    ) : (
                        <>
                            <ConfirmsPassword
                                onConfirmed={confirmTwoFactorAuthentication}
                                show={confirming}
                                renderButton={(onClick) => (
                                    <PrimaryButton
                                        type="button"
                                        className={'me-3' + (enabling ? ' opacity-25' : '')}
                                        disabled={enabling}
                                        onClick={onClick}
                                    >
                                        Confirm
                                    </PrimaryButton>
                                )}
                            />
                            <ConfirmsPassword
                                onConfirmed={regenerateRecoveryCodes}
                                show={recoveryCodes.length > 0 && !confirming}
                                renderButton={(onClick) => (
                                    <SecondaryButton type="button" className="me-3" onClick={onClick}>
                                        Regenerate Recovery Codes
                                    </SecondaryButton>
                                )}
                            />
                            <ConfirmsPassword
                                onConfirmed={fetchRecoveryCodes}
                                show={recoveryCodes.length === 0 && !confirming}
                                renderButton={(onClick) => (
                                    <SecondaryButton type="button" className="me-3" onClick={onClick}>
                                        Confirm
                                    </SecondaryButton>
                                )}
                            />
                            <ConfirmsPassword
                                onConfirmed={disableTwoFactorAuthentication}
                                show={confirming}
                                renderButton={(onClick) => (
                                    <SecondaryButton
                                        type="button"
                                        className={enabling ? ' opacity-25' : ''}
                                        disabled={disabling}
                                        onClick={onClick}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                )}
                            />
                            <ConfirmsPassword
                                onConfirmed={disableTwoFactorAuthentication}
                                show={!confirming}
                                renderButton={(onClick) => (
                                    <DangerButton
                                        type="button"
                                        className={enabling ? ' opacity-25' : ''}
                                        disabled={disabling}
                                        onClick={onClick}
                                    >
                                        Disable
                                    </DangerButton>
                                )}
                            />
                        </>
                    )}
                </div>
            </div>
        </ActionSection>
    );
};

export default TwoFactorAuthenticationForm;
