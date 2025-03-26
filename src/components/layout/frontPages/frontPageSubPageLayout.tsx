import { useState, useEffect } from "react";

import styles from "./frontPageSubPageLayout.module.css";

// Layout components.
import FrontPageLayout, { type FrontPageLayoutProps } from "./frontPageLayout";
import EnquiryForm from "@/components/layout/frontPages/enquiryFormComponent";

// Props.
type FrontPageSubPageLayoutProps = {
  renderEnquiryForm?: boolean;
} & FrontPageLayoutProps;

// Component.
export default function FrontPageSubPageLayout(props: FrontPageSubPageLayoutProps) {
  // States.
  const [key, setKey] = useState<number>(0);

  // Effect.
  useEffect(() => {
    setKey(key => key + 1);
  }, [props.children]);

	// Computed.
	const computeOuterContainerClassName = (): string => {
		return `container-fluid bg-success-subtle text-white border-bottom\
						border-success p-5 ${styles.titleContainer}`;
	};

  return (
    <FrontPageLayout title={props.title} description={props.description} key={key}>
      <div
        className={computeOuterContainerClassName()}
      >
        <div className="container p-3">
          <span className="fs-1">{props.title}</span>
        </div>
      </div>
      {props.children}

      {(props.renderEnquiryForm == null || props.renderEnquiryForm) && <EnquiryForm />}
    </FrontPageLayout>
  );
}