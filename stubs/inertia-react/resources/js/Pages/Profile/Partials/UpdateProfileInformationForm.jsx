// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

import React, { useRef, useState } from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const UpdateProfileInformationForm = ({ user, jetstream }) => {
    const [verificationLinkSent, setVerificationLinkSent] = useState(false);

    const { data, setData, post, processing, recentlySuccessful, errors, clearErrors } = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const updateProfileInformation = () => {
        // noinspection JSUnresolvedReference
        if (photoInput.value) {
            data.photo = photoInput.value.files[0];
        }

        post(route('user-profile-information.update'), {
            onSuccess: () => {
                clearPhotoFileInput();
                clearErrors();
            },
        });
    };

    const selectNewPhoto = () => {
        photoInput.current.click();
    };

    const updatePhotoPreview = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
            setData('photo', file);
        }
    };

    const clearPhotoFileInput = () => {
        if (photoInput.current) {
            photoInput.current.value = null;
        }
        setPhotoPreview(null);
    };

    const deletePhoto = () => {
        router.delete(route('current-user-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    };

    return (
        <FormSection
            onSubmit={updateProfileInformation}
            title="Profile Information"
            description="Update your account's profile information and email address."
        >
            <FormSection.Slot slot="form">
                {jetstream.managesProfilePhotos && (
                    <div className="col-span-6 sm:col-span-4">
                        <input
                            id="photo"
                            ref={photoInput}
                            type="file"
                            className="hidden"
                            onChange={updatePhotoPreview}
                        />
                        <InputLabel value="Photo" />
                        <div className="mt-2">
                            {photoPreview ? (
                                <img
                                    src={/** @type string */ photoPreview}
                                    alt="Profile Preview"
                                    className="rounded-full h-20 w-20 object-cover"
                                />
                            ) : (
                                <img
                                    src={user.profile_photo_url}
                                    alt={user.name}
                                    className="rounded-full h-20 w-20 object-cover"
                                />
                            )}
                        </div>
                        <SecondaryButton onClick={selectNewPhoto} className="mt-2 me-2">
                            Select A New Photo
                        </SecondaryButton>
                        {user.profile_photo_path && (
                            <SecondaryButton onClick={deletePhoto} className="mt-2">
                                Remove Photo
                            </SecondaryButton>
                        )}
                        <InputError message={errors.photo} />
                    </div>
                )}

                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                        type="text"
                        required
                        autoComplete="name"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full"
                        type="email"
                        required
                        autoComplete="username"
                    />
                    <InputError message={errors.email} />

                    {jetstream.hasEmailVerification && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onSuccess={() => setVerificationLinkSent(true)}
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {verificationLinkSent && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </FormSection.Slot>

            <FormSection.Slot slot="actions">
                <ActionMessage on={recentlySuccessful} className="me-3">
                    Saved.
                </ActionMessage>

                <PrimaryButton disabled={processing} className={processing ? 'opacity-25' : ''}>
                    Save
                </PrimaryButton>
            </FormSection.Slot>
        </FormSection>
    );
};

export default UpdateProfileInformationForm;
