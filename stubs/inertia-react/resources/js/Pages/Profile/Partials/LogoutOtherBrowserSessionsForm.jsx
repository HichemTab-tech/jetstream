// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import DialogModal from '@/Components/DialogModal'; // This should be adapted to a React modal component.
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Slot from '@/Components/Slot.jsx';

const LogoutOtherBrowserSessionsForm = ({ sessions }) => {
    const [confirmingLogout, setConfirmingLogout] = useState(false);
    const passwordInputRef = useRef(null);
    const {
        data,
        setData,
        processing,
        errors,
        post,
        delete: deleteRequest,
        reset,
    } = useForm({
        password: '',
    });

    const confirmLogout = () => {
        setConfirmingLogout(true);
        setTimeout(() => {
            passwordInputRef.current.focus();
        }, 250);
    };

    const logoutOtherBrowserSessions = () => {
        deleteRequest(route('other-browser-sessions.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
                passwordInputRef.current.focus();
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingLogout(false);
        reset();
    };

    return (
        <ActionSection
            title="Browser Sessions"
            description="Manage and log out your active sessions on other browsers and devices."
        >
            <div className="max-w-xl text-sm text-gray-600">
                If necessary, you may log out of all of your other browser sessions across all of your devices. Some of
                your recent sessions are listed below; however, this list may not be exhaustive. If you feel your
                account has been compromised, you should also update your password.
            </div>

            {sessions.length > 0 && (
                <div className="mt-5 space-y-6">
                    {sessions.map((session, index) => (
                        <div key={index} className="flex items-center">
                            <div>
                                {session.agent.is_desktop ? (
                                    <svg
                                        className="w-8 h-8 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-8 h-8 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <div className="text-sm text-gray-600">
                                    {session.agent.platform ? session.agent.platform : 'Unknown'} -{' '}
                                    {session.agent.browser ? session.agent.browser : 'Unknown'}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {session.ip_address},{' '}
                                    {session.is_current_device ? (
                                        <span className="text-green-500 font-semibold">This device</span>
                                    ) : (
                                        `Last active ${session.last_active}`
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center mt-5">
                <PrimaryButton onClick={confirmLogout}>Log Out Other Browser Sessions</PrimaryButton>
            </div>

            <DialogModal show={confirmingLogout} onRequestClose={closeModal}>
                <Slot slot="title">Log Out Other Browser Sessions</Slot>
                <Slot slot="content">
                    Please enter your password to confirm you would like to log out of your other browser sessions
                    across all of your devices.
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
                                if (e.key === 'Enter') logoutOtherBrowserSessions();
                            }}
                        />

                        <InputError message={errors.password} />
                    </div>
                </Slot>

                <Slot slot="footer">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton
                        className="ml-3"
                        disabled={processing}
                        onClick={logoutOtherBrowserSessions}
                        style={{ opacity: processing ? 0.25 : 1 }}
                    >
                        Log Out Other Browser Sessions
                    </PrimaryButton>
                </Slot>
            </DialogModal>
        </ActionSection>
    );
};

export default LogoutOtherBrowserSessionsForm;
