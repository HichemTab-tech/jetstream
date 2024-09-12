// noinspection JSUnresolvedReference

import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import SectionBorder from '@/Components/SectionBorder';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import { usePage } from '@inertiajs/react';

const Show = () => {
    const { auth, jetstream, sessions, confirmsTwoFactorAuthentication } = usePage().props;

    return (
        <AppLayout
            title="Profile"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                {jetstream.canUpdateProfileInformation && (
                    <>
                        <UpdateProfileInformationForm user={auth.user} jetstream={jetstream} />
                        <SectionBorder />
                    </>
                )}

                {jetstream.canUpdatePassword && (
                    <>
                        <UpdatePasswordForm className="mt-10 sm:mt-0" />
                        <SectionBorder />
                    </>
                )}

                {jetstream.canManageTwoFactorAuthentication && (
                    <>
                        <TwoFactorAuthenticationForm
                            requiresConfirmation={confirmsTwoFactorAuthentication}
                            className="mt-10 sm:mt-0"
                        />
                        <SectionBorder />
                    </>
                )}

                <LogoutOtherBrowserSessionsForm sessions={sessions} className="mt-10 sm:mt-0" />

                {jetstream.hasAccountDeletionFeatures && (
                    <>
                        <SectionBorder />
                        <DeleteUserForm className="mt-10 sm:mt-0" />
                    </>
                )}
            </div>
        </AppLayout>
    );
};

export default Show;
