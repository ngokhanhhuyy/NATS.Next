import { useState, useEffect, type ReactNode } from "react";
import { usePageLoadProgressBarStore } from "@/providers/pageLoadProgressBarStoreProvider";

// Child components.
import PageLoadFinisher from "@/components/pageLoadFinisherComponent";
import NavigationBar from "@/components/frontPages/navigationBar";
import Footer from "@/components/frontPages/footer";

// Props.
type FrontPageLayoutProps = Readonly<{
	children: ReactNode | ReactNode[];
}>;

// Component.
export default function FrontPageLayout(props: FrontPageLayoutProps) {
	// Dependencies.
	const pageLoadProgressBarPhase = usePageLoadProgressBarStore(store => store.phase);

	// States.
	const [isInitialRendering, setIsInitialRendering] = useState<boolean>(true);
	const [displayingChildren, setDisplayingChildren] = useState<ReactNode | ReactNode[]>(() => {
		return props.children;
	});

	// Effect.
	useEffect(() => {
		setIsInitialRendering(false);
	}, []);

	useEffect(() => {
		setTimeout(() => setDisplayingChildren(props.children), 1000);
	}, [props.children]);

	// Computed.
	function computeMainClassName(): string {
		let classNames = "flex-fill h-100 w-100 opacity-transition";
		if (pageLoadProgressBarPhase === "waiting") {
			classNames += ` opacity-50`;
		}

		return classNames;
	}

	return (
		<>
			<PageLoadFinisher />
			<NavigationBar />
			<main className={computeMainClassName()}>
				{displayingChildren}
			</main>
			<Footer />
		</>
	);
}