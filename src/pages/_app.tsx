import type { ReactElement, ReactNode } from "react";
import { type AppProps } from "next/app";
import { PageLoadProgressBarProvider } from "@/providers/pageLoadProgressBarStoreProvider";

// Layout component.
import RootLayout from "@/components/layout/rootLayout";

// Types.
type PageComponent = {
	getLayout?: (page: ReactElement) => ReactNode;
};

// Props.
type Props = AppProps & { Component: PageComponent };

// Component.
export default function App({ Component, pageProps }: Props) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<PageLoadProgressBarProvider>
			<RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
		</PageLoadProgressBarProvider>
	);
}
