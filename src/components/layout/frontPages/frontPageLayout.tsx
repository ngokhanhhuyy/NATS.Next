import { type ReactNode } from "react";
import Head from "next/head";

// Layout component.
import PageLoadFinisher from "@/components/layout/pageLoadFinisherComponent";

// Child components.
import NavigationBar from "@/components/layout/frontPages/navigationBar";
import Footer from "@/components/layout/frontPages/footer";

// Props.
export type FrontPageLayoutProps = Readonly<{
  children: ReactNode | ReactNode[];
}>;

// Component.
export default function FrontPageLayout(props: FrontPageLayoutProps) {
  return (
    <>
			<PageLoadFinisher/>
      <NavigationBar />
      <main className={`flex-fill h-100 fade-animation fade-animation-reverse`}>
				{props.children}
			</main>
      <Footer />
    </>
  );
}