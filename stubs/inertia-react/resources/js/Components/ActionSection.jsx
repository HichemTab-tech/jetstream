import React from 'react';
import SectionTitle from './SectionTitle';

function ActionSection({ title, description, children, className = '' }) {
    return (
        <div className={'md:grid md:grid-cols-3 md:gap-6' + (className === '' ? '' : ' ' + className)}>
            <SectionTitle>
                <slot slot="title">{title}</slot>
                <slot slot="description">{description}</slot>
            </SectionTitle>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">{children}</div>
            </div>
        </div>
    );
}

export default ActionSection;
