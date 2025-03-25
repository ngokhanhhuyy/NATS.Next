import type { ReactNode } from "react";
import { PageLoadProgressBarProvider } from "@/providers/pageLoadProgressBarStoreProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Child components.
import PageLoadProgressBar from "@/components/pageLoadProgressBarComponent";
import BootstrapClient from "@/components/bootstrapClient";

// Props.
type RootLayoutProps = Readonly<{
  children: ReactNode | ReactNode[];
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <div className="container-fluid p-0 d-flex flex-column w-100">
      <PageLoadProgressBarProvider>
        <PageLoadProgressBar />
        {props.children}
      </PageLoadProgressBarProvider>
      <BootstrapClient />
    </div>
  );
}