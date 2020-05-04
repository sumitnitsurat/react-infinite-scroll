import * as React from "react";

export const Loader = ({isLoading, children}) => {
    if(isLoading) return "loading..."
    return children;
}