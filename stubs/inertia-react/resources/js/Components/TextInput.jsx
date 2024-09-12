import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ modelValue, autoFocus, className = '', ...props }, ref) {
    const inputRef = ref ? ref : useRef();

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const inputClassName = `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${
        className || ''
    }`.trim();

    return <input ref={inputRef} className={inputClassName} value={modelValue} {...props} />;
});
