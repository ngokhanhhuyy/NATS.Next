import { useEffect } from "react";
import { usePageLoadProgressBarStore } from "@/providers/pageLoadProgressBarStoreProvider";

export default function PageLoadFinisher() {
    // Dependencies.
    const finishPageLoading = usePageLoadProgressBarStore(store => store.finish);

    // Effect.
    useEffect(() => {
        finishPageLoading();
    }, []);

    return null;
}