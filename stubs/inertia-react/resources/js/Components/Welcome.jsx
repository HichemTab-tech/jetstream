import React from 'react';
import ApplicationLogo from './ApplicationLogo'; // Adjust the import path as necessary

const Welcome = () => {
    return (
        <div>
            <div className="p-6 lg:p-8 bg-white border-b border-gray-200">
                <ApplicationLogo className="block h-12 w-auto" />

                <h1 className="mt-8 text-2xl font-medium text-gray-900">Welcome to your Jetstream application!</h1>

                <p className="mt-6 text-gray-500 leading-relaxed">
                    Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application.
                    Laravel is designed to help you build your application using a development environment that is
                    simple, powerful, and enjoyable. We believe you should love expressing your creativity through
                    programming, so we have spent time carefully crafting the Laravel ecosystem to be a breath of fresh
                    air. We hope you love it.
                </p>
            </div>

            <div className="bg-gray-200 bg-opacity-25 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
                {/* Multiple content sections */}
                {/* Ensure to replace `svg` and other inner content as needed */}
            </div>
        </div>
    );
};

export default Welcome;
