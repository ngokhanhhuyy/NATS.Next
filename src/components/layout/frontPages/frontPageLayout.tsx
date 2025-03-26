import { type ReactNode } from "react";
import Head from "next/head";

// Layout component.
import PageLoadFinisher from "@/components/layout/pageLoadFinisherComponent";

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
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>

			<PageLoadFinisher/>
      <NavigationBar />
      <main className={`flex-fill h-100 fade-animation fade-animation-reverse`}>
				{props.children}
			</main>
      <Footer />
    </>
  );
}