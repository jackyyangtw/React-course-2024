import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shuouldeListen = true) => {
    const setState = useState(globalState)[1];
    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {
            listener(globalState);
        }
    };

    useEffect(() => {
        if (shuouldeListen) {
            listeners.push(setState);
        }

        return () => {
            if (shuouldeListen) {
                listeners = listeners.filter((li) => li !== setState);
            }
        };
    }, [setState, shuouldeListen]);

    return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions };
};
