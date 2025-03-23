import Link from "next/link";
import Image from "next/image";
import styles from "./summaryItemListComponent.module.css";

// Props.
type SummaryItemListProps = {
    model: SummaryItemDetailModel[];
}

export default function SummaryItemList(props: SummaryItemListProps) {
    return (
        <div className="container my-5">
            <div className="row g-3">
                {props.model.map((item, index) => (
                    <Link
                        href={item.detailRoute}
                        className={`col col-xl-3 col-md-6 col-12 p-3 d-flex flex-column
                                    align-items-center ${styles.link}`}
                        key={index}
                    >
                        <Image
                            className={`rounded-circle mb-3 ${styles.thumbnail}`}
                            style={{ maxHeight: 750, objectFit: "cover" }}
                            src={item.thumbnailUrl}
                            width={150}
                            height={150}
                            alt={item.name}
                        />

                        <span className="fs-3 text-center text-success mb-3">
                            {item.name}
                        </span>

                        <p>{item.summaryContent}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}