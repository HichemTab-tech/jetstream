import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import Checkbox from '@/Components/Checkbox';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';

const ApiTokenManager = ({ tokens, availablePermissions, defaultPermissions }) => {
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);

    const createApiTokenForm = useForm({
        name: '',
        permissions: defaultPermissions,
    });

    const updateApiTokenForm = useForm({
        permissions: [],
    });

    const deleteApiTokenForm = useForm({});

    const createApiToken = () => {
        createApiTokenForm.post(route('api-tokens.store'), {
            onSuccess: () => {
                setDisplayingToken(true);
                createApiTokenForm.reset();
            },
        });
    };

    const manageApiTokenPermissions = (token) => {
        updateApiTokenForm.setData('permissions', token.abilities);
        setManagingPermissionsFor(token);
    };

    const updateApiToken = () => {
        updateApiTokenForm.put(route('api-tokens.update', { id: managingPermissionsFor.id }), {
            onSuccess: () => setManagingPermissionsFor(null),
        });
    };

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token);
    };

    const deleteApiToken = () => {
        deleteApiTokenForm.delete(route('api-tokens.destroy', { id: apiTokenBeingDeleted.id }), {
            onSuccess: () => setApiTokenBeingDeleted(null),
        });
    };

    return (
        <div>
            {/* Generate API Token */}
            <FormSection onSubmit={createApiToken}>
                <div slot="title">Create API Token</div>
                <div slot="description">
                    API tokens allow third-party services to authenticate with our application on your behalf.
                </div>
                <div slot="form">
                    {/* Token Name */}
                    <div className="col-span-6 sm:col-span-4">
                        <InputLabel value="Name" />
                        <TextInput
                            value={createApiTokenForm.data.name}
                            onChange={(e) => createApiTokenForm.setData('name', e.target.value)}
                            type="text"
                            autoFocus
                        />
                        <InputError message={createApiTokenForm.errors.name} />
                    </div>
                    {/* Token Permissions */}
                    {availablePermissions.length > 0 && (
                        <div className="col-span-6">
                            <InputLabel value="Permissions" />
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availablePermissions.map((permission) => (
                                    <label key={permission} className="flex items-center">
                                        <Checkbox
                                            checked={createApiTokenForm.data.permissions.includes(permission)}
                                            onChange={(e) =>
                                                createApiTokenForm.setData('permissions',
                                                    e.target.checked
                                                        ? [...createApiTokenForm.data.permissions, permission]
                                                        : createApiTokenForm.data.permissions.filter(p => p !== permission))
                                            }
                                            value={permission}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">{permission}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div slot="actions">
                    <ActionMessage on={createApiTokenForm.recentlySuccessful} className="me-3">Created.</ActionMessage>
                    <PrimaryButton disabled={createApiTokenForm.processing}>
                        Create
                    </PrimaryButton>
                </div>
            </FormSection>

            {/* List and manage API tokens */}
            {tokens.length > 0 && (
                <>
                    <SectionBorder />
                    <ActionSection>
                        <div slot="title">Manage API Tokens</div>
                        <div slot="description">
                            You may delete any of your existing tokens if they are no longer needed.
                        </div>
                        <div slot="content">
                            {tokens.map((token) => (
                                <div key={token.id} className="flex items-center justify-between">
                                    <div className="break-all">{token.name}</div>
                                    <div className="flex items-center ml-2">
                                        {token.last_used_ago && <div className="text-sm text-gray-400">Last used {token.last_used_ago}</div>}
                                        {availablePermissions.length > 0 && (
                                            <button
                                                className="cursor-pointer ml-6 text-sm text-gray-400 underline"
                                                onClick={() => manageApiTokenPermissions(token)}
                                            >
                                                Permissions
                                            </button>
                                        )}
                                        <button
                                            className="cursor-pointer ml-6 text-sm text-red-500"
                                            onClick={() => confirmApiTokenDeletion(token)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ActionSection>
                </>
            )}

            {/* Modal Dialogs for token info, permissions, and deletion confirmation */}
            <DialogModal show={displayingToken} onClose={() => setDisplayingToken(false)}>
                <div slot="title">API Token</div>
                <div slot="content">
                    Please copy your new API token. For your security, it won't be shown again.
                </div>
                <div slot="footer">
                    <SecondaryButton onClick={() => setDisplayingToken(false)}>Close</SecondaryButton>
                </div>
            </DialogModal>

            <DialogModal show={managingPermissionsFor != null} onClose={() => setManagingPermissionsFor(null)}>
                <div slot="title">API Token Permissions</div>
                <div slot="content">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availablePermissions.map((permission) => (
                            <label key={permission} className="flex items-center">
                                <Checkbox
                                    checked={updateApiTokenForm.data.permissions.includes(permission)}
                                    onChange={(e) =>
                                        updateApiTokenForm.setData('permissions',
                                            e.target.checked
                                                ? [...updateApiTokenForm.data.permissions, permission]
                                                : updateApiTokenForm.data.permissions.filter(p => p !== permission))
                                    }
                                    value={permission}
                                />
                                <span className="ml-2 text-sm text-gray-600">{permission}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div slot="footer">
                    <SecondaryButton onClick={() => setManagingPermissionsFor(null)}>Cancel</SecondaryButton>
                    <PrimaryButton disabled={updateApiTokenForm.processing} onClick={updateApiToken}>
                        Save
                    </PrimaryButton>
                </div>
            </DialogModal>

            <ConfirmationModal show={apiTokenBeingDeleted != null} onClose={() => setApiTokenBeingDeleted(null)}>
                <div slot="title">Delete API Token</div>
                <div slot="content">Are you sure you would like to delete this API token?</div>
                <div slot="footer">
                    <SecondaryButton onClick={() => setApiTokenBeingDeleted(null)}>Cancel</SecondaryButton>
                    <DangerButton disabled={deleteApiTokenForm.processing} onClick={deleteApiToken}>
                        Delete
                    </DangerButton>
                </div>
            </ConfirmationModal>
        </div>
    );
};

export default ApiTokenManager;
