import React from 'react';
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager';
import AppLayout from '@/Layouts/AppLayout';

const APIIndex = ({ tokens, availablePermissions, defaultPermissions }) => {
    return (
        <AppLayout
            title="API Tokens"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">API Tokens</h2>}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <ApiTokenManager
                        tokens={tokens}
                        availablePermissions={availablePermissions}
                        defaultPermissions={defaultPermissions}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default APIIndex;
