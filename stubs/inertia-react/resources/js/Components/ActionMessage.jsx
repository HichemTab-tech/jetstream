import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function ActionMessage({ on, children, className = '' }) {
    const ref = useRef();

    return (
        <div>
            <CSSTransition
                in={on}
                timeout={1000}
                classNames={{
                    exitActive: 'transition ease-in duration-1000',
                    exitDone: 'opacity-0',
                }}
                unmountOnExit
                nodeRef={ref}
            >
                <div className={'text-sm text-gray-600' + (className === '' ? '' : ' ' + className)} ref={ref}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
}
