import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm';
import SectionBorder from '@/Components/SectionBorder';
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager';
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm';

const TeamSettings = ({ team, availableRoles, permissions }) => {
    return (
        <AppLayout
            title="Team Settings"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Team Settings</h2>}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <UpdateTeamNameForm team={team} permissions={permissions} />

                    <TeamMemberManager
                        className="mt-10 sm:mt-0"
                        team={team}
                        availableRoles={availableRoles}
                        userPermissions={permissions}
                    />

                    {permissions.canDeleteTeam && !team.personal_team && (
                        <>
                            <SectionBorder />
                            <DeleteTeamForm className="mt-10 sm:mt-0" team={team} />
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default TeamSettings;
