import React from 'react';
import { useForm } from '@inertiajs/react';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';

const CreateTeamForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const { auth } = usePage().props;

    const createTeam = (e) => {
        post(route('teams.store'));
    };

    return (
        <FormSection
            onSubmit={createTeam}
            title="Team Details"
            description="Create a new team to collaborate with others on projects."
        >
            <FormSection.Slot slot="form">
                <div className="col-span-6">
                    <InputLabel>Team Owner</InputLabel>
                    <div className="flex items-center mt-2">
                        <img
                            className="object-cover w-12 h-12 rounded-full"
                            src={auth.user.profile_photo_url}
                            alt={auth.user.name}
                        />
                        <div className="ml-4 leading-tight">
                            <div className="text-gray-900">{auth.user.name}</div>
                            <div className="text-sm text-gray-700">{auth.user.email}</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name">Team Name</InputLabel>
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        className="block w-full mt-1"
                        autoFocus
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
            </FormSection.Slot>

            <FormSection.Slot slot="actions">
                <PrimaryButton disabled={processing}>Create</PrimaryButton>
            </FormSection.Slot>
        </FormSection>
    );
};

export default CreateTeamForm;
