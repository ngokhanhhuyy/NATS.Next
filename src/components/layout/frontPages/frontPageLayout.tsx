import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Head from "next/head";

// Layout components.
import RootLayout from "../rootLayout";

// Child components.
import NavigationBar from "@/components/layout/frontPages/navigationBar";
import Footer from "@/components/layout/frontPages/footer";

// Props.
export type FrontPageLayoutProps = Readonly<{
    title: string;
    description: string;
    children: ReactNode | ReactNode[];
}>;

// Component.
export default function FrontPageLayout(props: FrontPageLayoutProps) {
    // Dependencies.
    const pathName = usePathname();

    return (
        <RootLayout key={pathName}>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.title}></meta>
            </Head>

            <NavigationBar />
            <main className="flex-fill h-100 fadeIn">
                {props.children}
            </main>
            <Footer />
        </RootLayout>
    );
}