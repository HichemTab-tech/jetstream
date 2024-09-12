// noinspection JSUnresolvedReference

import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const UpdateTeamNameForm = ({ team, permissions }) => {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: team.name,
    });

    useEffect(() => {
        setData('name', team.name);
    }, [team.name]);

    const updateTeamName = async () => {
        put(route('teams.update', team), {
            errorBag: 'updateTeamName',
            preserveScroll: true,
        });
    };

    return (
        <FormSection onSubmit={updateTeamName} title="Team Name" description="The team's name and owner information.">
            <FormSection.Slot slot="form">
                <div className="col-span-6">
                    <InputLabel>Team Owner</InputLabel>
                    <div className="flex items-center mt-2">
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={team.owner.profile_photo_url}
                            alt={team.owner.name}
                        />
                        <div className="ms-4 leading-tight">
                            <div className="text-gray-900">{team.owner.name}</div>
                            <div className="text-gray-700 text-sm">{team.owner.email}</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name">Team Name</InputLabel>
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        type="text"
                        className="mt-1 block w-full"
                        disabled={!permissions.canUpdateTeam}
                    />
                    {errors.name && <InputError>{errors.name.message}</InputError>}
                </div>
            </FormSection.Slot>
            {permissions.canUpdateTeam && (
                <FormSection.Slot slot="actions">
                    <ActionMessage on={recentlySuccessful} className="me-3">
                        Saved.
                    </ActionMessage>
                    <PrimaryButton type="submit" disabled={processing} className={processing ? 'opacity-25' : ''}>
                        Save
                    </PrimaryButton>
                </FormSection.Slot>
            )}
        </FormSection>
    );
};

export default UpdateTeamNameForm;
