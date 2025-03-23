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
    return (
        <FrontPageLayout title={props.title} description={props.title}>
            <div className={`container-fluid bg-success-subtle text-white border-bottom
                            border-success p-5 ${styles.titleContainer}`}>
                <div className="container p-3">
                    <span className="fs-1">
                        {props.title}
                    </span>
                </div>
            </div>
            {props.children}

            {(props.renderEnquiryForm == null || props.renderEnquiryForm) && <EnquiryForm />}
        </FrontPageLayout>
    );
}