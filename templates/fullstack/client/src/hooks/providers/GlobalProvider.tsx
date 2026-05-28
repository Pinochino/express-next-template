"use client";

import React from "react";
import StoreProvider from "./StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";

interface IGlobalProvider {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import("@tanstack/react-query-devtools/build/modern/production.js").then(
        (d) => ({
            default: d.ReactQueryDevtools,
        }),
    ),
);

function GlobalProvider({ children, }: IGlobalProvider) {
    const [showDevtools, setShowDevtools] = React.useState(false);

        React.useEffect(() => {
            // @ts-expect-error
            window.toggleDevtools = () => setShowDevtools((old) => !old);
        }, []);

    return (
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <AntdRegistry>
                   {children}
                </AntdRegistry>
                <ReactQueryDevtools initialIsOpen />
                {showDevtools && (
                    <React.Suspense fallback={null}>
                        <ReactQueryDevtoolsProduction />
                    </React.Suspense>
                )}
            </QueryClientProvider>
        </StoreProvider>
    );
};

export default GlobalProvider;
