import { useState } from "react";
export const useInput = (defaultVal, validationFn) => {
    const [enteredVal, setEnteredVal] = useState(defaultVal);
    const [didEdit, setDidEdit] = useState(false);
    const valueIsValid = validationFn(enteredVal);
    const handleInputChange = (e) => {
        setEnteredVal(e.target.value);
        setDidEdit(false);
    };
    const handleInputBlur = (e) => {
        setDidEdit(true);
    };
    return {
        handleInputChange,
        handleInputBlur,
        enteredVal,
        hasError: didEdit && !valueIsValid,
    };
};
