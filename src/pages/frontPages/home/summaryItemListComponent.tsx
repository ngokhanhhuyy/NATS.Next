import Link from "next/link";
import Image from "next/image";
import styles from "./summaryItemListComponent.module.css";

// Props.
type SummaryItemListProps = {
	model: SummaryItemDetailModel[];
};

export default function SummaryItemList(props: SummaryItemListProps) {
	// Computed.
	function computeLinkClassName(): string {
		return `col col-xl-3 col-md-6 col-12 d-flex flex-column\
		 				align-items-center ${styles.link}`;
	}

	return (
		<div className="container mb-3 p-4">
			<div className="row g-3">
				{props.model.map((item, index) => (
					<Link
						href={item.detailRoute}
						className={computeLinkClassName()}
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

						<h2 className="text-center text-success mb-2">{item.name}</h2>

						<p>{item.summaryContent}</p>
					</Link>
				))}
			</div>
		</div>
	);
}