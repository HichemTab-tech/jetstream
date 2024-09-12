import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';

const CreateTeam = () => {
    return (
        <AppLayout
            title="Create Team"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Team</h2>}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <CreateTeamForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default CreateTeam;
