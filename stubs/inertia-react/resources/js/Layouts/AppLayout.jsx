// noinspection JSUnresolvedReference

import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react'; // assuming react-router-dom for routing
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

const AppLayout = ({ header, children }) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { auth, jetstream } = usePage().props;
    const user = auth.user;

    return (
        <div>
            <Banner />

            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href={route('dashboard')}>
                                        <ApplicationMark className="block h-9 w-auto" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={window.location.pathname === '/dashboard'}
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                {jetstream?.hasTeamFeatures && (
                                    <Dropdown align="right" width="60">
                                        <Dropdown.Trigger>
                                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                                {user?.current_team.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <div className="w-60">
                                                <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>
                                                <Dropdown.Link
                                                    href={route('teams.show', { team: user?.current_team.id })}
                                                >
                                                    Team Settings
                                                </Dropdown.Link>
                                                {jetstream?.canCreateTeams && (
                                                    <Dropdown.Link href={route('teams.create')}>
                                                        Create New Team
                                                    </Dropdown.Link>
                                                )}
                                                {user?.all_teams.length > 1 && (
                                                    <>
                                                        <div className="border-t border-gray-200" />
                                                        <div className="block px-4 py-2 text-xs text-gray-400">
                                                            Switch Teams
                                                        </div>
                                                        {user?.all_teams.map((team) => (
                                                            <Dropdown.Link
                                                                key={team.id}
                                                                as="button"
                                                                href={route('current-team.update')}
                                                                data={{
                                                                    team_id: team.id,
                                                                }}
                                                                preserveState={false}
                                                            >
                                                                <div className="flex items-center">
                                                                    {team.id === user?.current_team_id && (
                                                                        <svg
                                                                            className="me-2 h-5 w-5 text-green-400"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 24 24"
                                                                            strokeWidth="1.5"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                            />
                                                                        </svg>
                                                                    )}
                                                                    <div>{team.name}</div>
                                                                </div>
                                                            </Dropdown.Link>
                                                        ))}
                                                        <Dropdown.Link as="button">
                                                            <div className="flex items-center">
                                                                {team.id === user?.current_team_id && (
                                                                    <svg
                                                                        className="me-2 h-5 w-5 text-green-400"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                <div>{team.name}</div>
                                                            </div>
                                                        </Dropdown.Link>
                                                    </>
                                                )}
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>
                                )}

                                <Dropdown align="right" width="48">
                                    <Dropdown.Trigger>
                                        {jetstream.managesProfilePhotos ? (
                                            <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                                <img
                                                    className="h-8 w-8 rounded-full object-cover"
                                                    src={user?.profile_photo_url}
                                                    alt={user?.name}
                                                />
                                            </button>
                                        ) : (
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        )}
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div className="block px-4 py-2 text-xs text-gray-400">Manage Account</div>
                                        <Dropdown.Link href={route('profile.show')}>Profile</Dropdown.Link>
                                        {jetstream?.hasApiFeatures && (
                                            <Dropdown.Link href={route('api-tokens.index')}>API Tokens</Dropdown.Link>
                                        )}
                                        <div className="border-t border-gray-200" />
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    className="p-2 rounded-md text-gray-400"
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Responsive Navigation */}
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={window.location.pathname === route('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        <div className="border-t border-gray-200">
                            <div className="px-4">
                                {user?.profile_photo_url && (
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={user?.profile_photo_url}
                                        alt={user?.name}
                                    />
                                )}
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>

                            <ResponsiveNavLink href={route('profile.show')}>Profile</ResponsiveNavLink>
                            {jetstream?.hasApiFeatures && (
                                <ResponsiveNavLink href={route('api-tokens.index')}>API Tokens</ResponsiveNavLink>
                            )}
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>

                            {jetstream?.hasTeamFeatures && (
                                <>
                                    <div className="border-t border-gray-200" />
                                    <ResponsiveNavLink href={route('teams.show', { team: user?.current_team.id })}>
                                        Team Settings
                                    </ResponsiveNavLink>
                                    {jetstream?.canCreateTeams && (
                                        <ResponsiveNavLink href={route('teams.create')}>
                                            Create New Team
                                        </ResponsiveNavLink>
                                    )}
                                    {user?.all_teams.length > 1 && (
                                        <>
                                            <div className="border-t border-gray-200" />
                                            {user?.all_teams.map((team) => (
                                                <ResponsiveNavLink
                                                    key={team.id}
                                                    as="button"
                                                    href={route('current-team.update')}
                                                    data={{
                                                        team_id: team.id,
                                                    }}
                                                    preserveState={false}
                                                >
                                                    {team.name}
                                                </ResponsiveNavLink>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                {/* Page Content */}
                <main>{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
