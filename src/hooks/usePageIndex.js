import * as React from "react";
import {useReducer} from "react";

const pageReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PAGE':
            return {...state, page: state.page +1};
        default:
            return state;
    }
}

export const usePageIndex = () => useReducer(pageReducer, {page: 0});
