import React from 'react';

const Slot = ({ children, slot }) => {
    return (
        <div slot={slot} style={{ display: 'contents' }}>
            {children}
        </div>
    );
};

export default Slot;
