import { ReactNode } from "react";
import styles from "./frontPageSubPageLayout.module.css";

// Layout components.
import FrontPageLayout from "./frontPageLayout";

// Props.
type FrontPageSubPageLayoutProps = {
    title: string;
    children: ReactNode | ReactNode[];
}

// Component.
export default function FrontPageSubPageLayout(props: FrontPageSubPageLayoutProps) {
    return (
        <FrontPageLayout>
            <div className={`container-fluid bg-success-subtle text-white border-bottom
                            border-success p-5 ${styles.titleContainer}`}>
                <div className="container p-3">
                    <span className="fs-1">
                        {props.title}
                    </span>
                </div>
            </div>
            {props.children}
        </FrontPageLayout>
    );
}