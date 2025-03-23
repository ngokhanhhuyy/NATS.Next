import type { ReactNode } from "react";

// Layout components.
import RootLayout from "./rootLayout";

// Child components.
import PageLoadFinisher from "@/components/layout/pageLoadFinisherComponent";
import NavigationBar from "@/components/frontPages/navigationBar";
import Footer from "@/components/frontPages/footer";

// Props.
type FrontPageLayoutProps = Readonly<{
    children: ReactNode | ReactNode[];
}>;

// Component.
export default function FrontPageLayout(props: FrontPageLayoutProps) {
    return (
        <RootLayout>
            <PageLoadFinisher />
            <NavigationBar />
            <main className="flex-fill h-100">
                {props.children}
            </main>
            <Footer />
        </RootLayout>
    );
}