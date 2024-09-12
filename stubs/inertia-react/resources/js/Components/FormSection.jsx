import React from 'react';
import SectionTitle from './SectionTitle';
import Slot from '@/Components/Slot.jsx';

const FormSection = ({ title, description, children, onSubmit }) => {
    const slots = React.Children.toArray(children);
    const hasActions = slots.some((child) => child.props.slot === 'actions');

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle>
                <slot slot="title">{title}</slot>
                <slot slot="description">{description}</slot>
            </SectionTitle>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div
                        className={`px-4 py-5 bg-white sm:p-6 shadow ${
                            hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'
                        }`}
                    >
                        <div className="grid grid-cols-6 gap-6">
                            {slots.find((child) => child.props.slot === 'form')}
                        </div>
                    </div>

                    {hasActions && (
                        <div className="flex items-center justify-end px-4 py-3 bg-gray-50 text-end sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                            {slots.find((child) => child.props.slot === 'actions')}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

FormSection.Slot = Slot;

export default FormSection;
