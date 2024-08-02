import { useState } from "react";
export const useInput = (initialValue, validateFn) => {
    const [value, setValue] = useState(initialValue);
    const [didEdit, setdidEdit] = useState(true);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        setdidEdit(false);
        if (!didEdit) {
            validateFn(value);
        }
    };

    const handleFocus = () => {
        setdidEdit(true);
    };

    return {
        value,
        handleChange,
        handleBlur,
        handleFocus,
        hasError: !didEdit && !validateFn(value),
    };
};
