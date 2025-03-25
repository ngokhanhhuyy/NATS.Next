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
	// Computed.
	const computeOuterContainerClassName = (): string => {
		return `container-fluid bg-success-subtle text-white border-bottom\
						border-success p-5 ${styles.titleContainer}`;
	};

  return (
    <FrontPageLayout>
      <div
        className={computeOuterContainerClassName()}
      >
        <div className="container p-3">
          <span className="fs-1">{document.title}</span>
        </div>
      </div>
      {props.children}

      {(props.renderEnquiryForm == null || props.renderEnquiryForm) && <EnquiryForm />}
    </FrontPageLayout>
  );
}