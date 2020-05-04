import * as React from "react";
import {useReducer, useEffect} from "react";

const imageReducer = (state, action) => {
    switch(action.type) {
        case 'LOAD_IMAGE_SUCCESS':
            return {...state, ...{ images: [...state.images, ...action.images], loading: false, error: false}}
        case 'LOAD_IMAGE_PENDING':
            return {...state, loading: true}
        case 'LOAD_IMAGE_ERROR':
            return {...state, ...{error: action.error, loading: false}}
        default:
            return state;
    }
}

export const useLoadImage = (page) => {
   const [state, dispatch] = useReducer(imageReducer, {images: [], loading: false, error: false});

   useEffect(() => {
       async function fetchImages() {
           try {
            dispatch({type: 'LOAD_IMAGE_PENDING'});
            const images = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
            dispatch({type: 'LOAD_IMAGE_SUCCESS', images: await images.json()});
           } catch(e) {
               dispatch({type: 'LOAD_IMAGE_ERROR', error: e.message});
           }

       }
       fetchImages();
   }, [page]);

   return {images: state.images, isLoading: state.loading, error: state.error};
}