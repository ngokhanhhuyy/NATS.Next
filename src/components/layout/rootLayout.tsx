import { useEffect, type ReactNode } from "react";
import "@/assets/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Child components.
import PageLoadProgressBar from "@/components/layout/pageLoadProgressBarComponent";
import BootstrapClient from "@/components/layout/bootstrapClient";

// Props.
type RootLayoutProps = Readonly<{
	children: ReactNode | ReactNode[];
}>;

// Component.
export default function RootLayout(props: RootLayoutProps) {
	// Effect.
	useEffect(() => {
		import("bootstrap");
	}, []);

	return (
		<>
			<PageLoadProgressBar />
			<div className="container-fluid p-0 d-flex flex-column position-relative">
				{props.children}
			</div>
			<BootstrapClient />
		</>
	);
}