"use client";
import { useEffect, createContext, useRef, useContext, type ReactNode } from "react";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { type PageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";
import { createPageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";

export type PageLoadProgressBarApi = ReturnType<typeof createPageLoadProgressBarStore>;

export const PageLoadProgressBarContext = createContext<PageLoadProgressBarApi | null>(null);

// Props.
interface PageLoadProgressBarProviderProps {
    children: ReactNode | ReactNode[];
}

// Component.
export function PageLoadProgressBarProvider(props: PageLoadProgressBarProviderProps) {
    // Dependencies.
    const router = useRouter();
    const storeRef = useRef<PageLoadProgressBarApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = createPageLoadProgressBarStore();
    }

    // Effect.
    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeError", handleRouteChangeError);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, [router]);

    // Callbacks.
    function handleRouteChangeStart(): void {
        storeRef.current?.getState().start();
    }

    function handleRouteChangeError(): void {
        storeRef.current?.getState().finish();
    }

    return (
        <PageLoadProgressBarContext.Provider value={storeRef.current}>
            {props.children}
        </PageLoadProgressBarContext.Provider>
    );
}

// Hooks.
export function usePageLoadProgressBarStore<T,>
        (selector: (store: PageLoadProgressBarStore) => T): T {
    const pageLoadProgressBarStoreContext = useContext(PageLoadProgressBarContext);
    if (!pageLoadProgressBarStoreContext) {
        throw new Error("usePageLoadProgressBarStore must be used within \
                        PageLoadProgressBarStoreProvider");
    }

    return useStore(pageLoadProgressBarStoreContext, selector);
}