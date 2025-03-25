import { type ReactNode } from "react";
import { PageLoadProgressBarProvider } from "@/providers/pageLoadProgressBarStoreProvider";
import "@/assets/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Child components.
import PageLoadProgressBar from "@/components/layout/pageLoadProgressBarComponent";
import PageLoadFinisher from "@/components/layout/pageLoadFinisherComponent";
import BootstrapClient from "@/components/layout/bootstrapClient";

// Props.
type RootLayoutProps = Readonly<{
	children: ReactNode | ReactNode[];
}>

export default function Layout(props: RootLayoutProps) {
	return (
		<>
			<PageLoadProgressBarProvider>
				<PageLoadProgressBar/>
				<PageLoadFinisher/>
				<div className="container-fluid p-0 d-flex flex-column position-relative">
					{props.children}
				</div>
			</PageLoadProgressBarProvider>
			<BootstrapClient/>
		</>
	);
}