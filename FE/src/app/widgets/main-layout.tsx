import { useBoolean, useTimeout } from "ahooks";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = () => {
    const [splash, onSplash] = useBoolean(false);
    useTimeout(onSplash.setTrue, 500);

    return (
        <main className='w-[100vw] h-[100vh] min-h-[800px]'>
            {splash ? (
                <Suspense fallback={<div>on load</div>}>
                    <Outlet />
                </Suspense>
            ) : (
                <div>loading</div>
            )}
        </main>
    );
};
