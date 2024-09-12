// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
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
import Slot from '@/Components/Slot.jsx';

const TeamMemberManager = ({ team, availableRoles, userPermissions }) => {
    const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
    const [managingRoleFor, setManagingRoleFor] = useState(null);
    const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
    const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState(null);

    const addTeamMemberForm = useForm({
        email: '',
        role: null,
    });
    const updateRoleForm = useForm({
        role: null,
    });
    const leaveTeamForm = useForm();
    const removeTeamMemberForm = useForm();

    const addTeamMember = () => {
        addTeamMemberForm.post(route('team-members.store', team));
    };

    const cancelTeamInvitation = (invitation) => {
        router.delete(route('team-invitations.destroy', invitation));
    };

    const manageRole = (teamMember) => {
        setManagingRoleFor(teamMember);
        updateRoleForm.setData('role', teamMember.membership.role);
        setCurrentlyManagingRole(true);
    };

    const updateRole = () => {
        updateRoleForm.put(route('team-members.update', [team, managingRoleFor]));
        setCurrentlyManagingRole(false);
    };

    const confirmLeavingTeam = () => {
        setConfirmingLeavingTeam(true);
    };

    const leaveTeam = () => {
        leaveTeamForm.delete(route('team-members.destroy', [team, managingRoleFor]));
    };

    const confirmTeamMemberRemoval = (teamMember) => {
        setTeamMemberBeingRemoved(teamMember);
    };

    const removeTeamMember = () => {
        removeTeamMemberForm.delete(route('team-members.destroy', [team, teamMemberBeingRemoved]));
        setTeamMemberBeingRemoved(null);
    };

    const displayableRole = (role) => {
        return availableRoles.find((r) => r.key === role)?.name;
    };

    return (
        <div>
            {userPermissions.canAddTeamMembers && (
                <>
                    <SectionBorder />

                    <FormSection
                        onSubmit={addTeamMember}
                        title="Add Team Member"
                        description="Add a new team member to your team, allowing them to collaborate with you."
                    >
                        <FormSection.Slot slot="form">
                            <div className="col-span-6">
                                <div className="max-w-xl text-sm text-gray-600">
                                    Please provide the email address of the person you would like to add to this team.
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <TextInput
                                    id="email"
                                    value={addTeamMemberForm.data.email}
                                    onChange={(e) => addTeamMemberForm.setData('email', e.target.value)}
                                    type="email"
                                    className="mt-1 block w-full"
                                />
                                {addTeamMemberForm.errors.email && (
                                    <InputError message={addTeamMemberForm.errors.email} />
                                )}
                            </div>

                            {availableRoles.length > 0 && (
                                <div className="col-span-6 lg:col-span-4">
                                    <InputLabel htmlFor="roles">Role</InputLabel>
                                    {addTeamMemberForm.errors.role && (
                                        <InputError message={addTeamMemberForm.errors.role} />
                                    )}
                                    <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                                        {availableRoles.map((role, i) => (
                                            <button
                                                key={role.key}
                                                type="button"
                                                className={`relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                                                    i > 0
                                                        ? 'border-t border-gray-200 focus:border-none rounded-t-none'
                                                        : ''
                                                } ${i !== availableRoles.length - 1 ? 'rounded-b-none' : ''}`}
                                                onClick={() => addTeamMemberForm.setData('role', role.key)}
                                            >
                                                <div
                                                    className={
                                                        addTeamMemberForm.role && addTeamMemberForm.role !== role.key
                                                            ? 'opacity-50'
                                                            : ''
                                                    }
                                                >
                                                    <div className="flex items-center">
                                                        <div
                                                            className={
                                                                'text-sm text-gray-600' +
                                                                (addTeamMemberForm.role === role.key
                                                                    ? 'font-semibold'
                                                                    : '')
                                                            }
                                                        >
                                                            {role.name}
                                                        </div>
                                                        {addTeamMemberForm.data.role === role.key && (
                                                            <svg
                                                                className="ml-2 h-5 w-5 text-green-400"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 text-xs text-gray-600">{role.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </FormSection.Slot>
                        <FormSection.Slot slot="actions">
                            <ActionMessage on={addTeamMemberForm.recentlySuccessful} className="me-3">
                                Added.
                            </ActionMessage>
                            <PrimaryButton disabled={addTeamMemberForm.processing}>Add</PrimaryButton>
                        </FormSection.Slot>
                    </FormSection>
                </>
            )}
            {team.team_invitations.length > 0 && userPermissions.canAddTeamMembers && (
                <>
                    <SectionBorder />

                    <ActionSection
                        className="mt-10 sm:mt-0"
                        title="Pending Team Invitations"
                        description="These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation."
                    >
                        <div className="space-y-6">
                            {team.team_invitations.map((invitation) => (
                                <div key={invitation.id} className="flex items-center justify-between">
                                    <div className="text-gray-600">{invitation.email}</div>
                                    <div className="flex items-center">
                                        {userPermissions.canRemoveTeamMembers && (
                                            <button
                                                className="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"
                                                onClick={() => cancelTeamInvitation(invitation)}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ActionSection>
                </>
            )}
            {team.users.length > 0 && (
                <>
                    <SectionBorder />

                    <ActionSection
                        className="mt-10 sm:mt-0"
                        title="Team Members"
                        description="All of the people that are part of this team."
                    >
                        <div className="space-y-6">
                            {team.users.map((user) => (
                                <div key={user.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            className="w-8 h-8 rounded-full object-cover"
                                            src={user.profile_photo_url}
                                            alt={user.name}
                                        />
                                        <div className="ml-4">{user.name}</div>
                                    </div>
                                    <div className="flex items-center">
                                        {userPermissions.canUpdateTeamMembers && availableRoles.length && (
                                            <button
                                                className="ml-2 text-sm text-gray-400 underline"
                                                onClick={() => manageRole(user)}
                                            >
                                                {displayableRole(user.membership.role)}
                                            </button>
                                        )}
                                        {!availableRoles.length && (
                                            <div className="ml-2 text-sm text-gray-400">
                                                {displayableRole(user.membership.role)}
                                            </div>
                                        )}
                                        {user.id === page.props.auth.user.id ? (
                                            <button
                                                className="cursor-pointer ml-6 text-sm text-red-500"
                                                onClick={confirmLeavingTeam}
                                            >
                                                Leave
                                            </button>
                                        ) : (
                                            userPermissions.canRemoveTeamMembers && (
                                                <button
                                                    className="cursor-pointer ml-6 text-sm text-red-500"
                                                    onClick={() => confirmTeamMemberRemoval(user)}
                                                >
                                                    Remove
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ActionSection>
                </>
            )}

            {currentlyManagingRole && (
                <DialogModal show={currentlyManagingRole} onClose={() => setCurrentlyManagingRole(false)}>
                    <Slot slot="title">Manage Role</Slot>
                    <Slot slot="content">
                        {managingRoleFor && (
                            <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                                {availableRoles.map((role) => (
                                    <button
                                        key={role.key}
                                        type="button"
                                        className={`relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                                            role.key !== role.key ? 'opacity-50' : ''
                                        }`}
                                        onClick={() => {
                                            updateRoleForm.setData('role', role.key);
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <div className="text-sm text-gray-600">{role.name}</div>
                                            {updateRoleForm.data.role === role.key && (
                                                <svg
                                                    className="ml-2 h-5 w-5 text-green-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="mt-2 text-xs text-gray-600">{role.description}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </Slot>
                    <Slot slot="footer">
                        <SecondaryButton onClick={() => setCurrentlyManagingRole(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={updateRoleForm.processing} onClick={updateRole}>
                            Save
                        </PrimaryButton>
                    </Slot>
                </DialogModal>
            )}

            {confirmingLeavingTeam && (
                <ConfirmationModal show={confirmingLeavingTeam} onClose={() => setConfirmingLeavingTeam(false)}>
                    <Slot slot="title">Leave Team</Slot>
                    <Slot slot="content">Are you sure you would like to leave this team?</Slot>
                    <Slot slot="footer">
                        <SecondaryButton onClick={() => setConfirmingLeavingTeam(false)}>Cancel</SecondaryButton>
                        <DangerButton className="ml-3" disabled={leaveTeamForm.processing} onClick={leaveTeam}>
                            Leave
                        </DangerButton>
                    </Slot>
                </ConfirmationModal>
            )}

            {teamMemberBeingRemoved && (
                <ConfirmationModal show={teamMemberBeingRemoved} onClose={() => setTeamMemberBeingRemoved(null)}>
                    <Slot slot="title">Remove Team Member</Slot>
                    <Slot slot="content">Are you sure you would like to remove this person from the team?</Slot>
                    <Slot slot="footer">
                        <SecondaryButton onClick={() => setTeamMemberBeingRemoved(null)}>Cancel</SecondaryButton>
                        <DangerButton
                            className="ml-3"
                            disabled={removeTeamMemberForm.processing}
                            onClick={removeTeamMember}
                        >
                            Remove
                        </DangerButton>
                    </Slot>
                </ConfirmationModal>
            )}
        </div>
    );
};

export default TeamMemberManager;
