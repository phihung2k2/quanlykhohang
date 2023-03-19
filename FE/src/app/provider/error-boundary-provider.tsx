import React, { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

export interface ErrorBoundaryProviderProps extends PropsWithChildren {}

type Props = {
    Fallback: React.FC<any>;
};

export const ErrorBoundaryProvider: React.FC<ErrorBoundaryProviderProps> & Props = ({ children }) => {
    return <ErrorBoundary FallbackComponent={ErrorBoundaryProvider.Fallback}>{children}</ErrorBoundary>;
};

ErrorBoundaryProvider.Fallback = function Fallback() {
    return <div>ErrorBoundary</div>;
};
