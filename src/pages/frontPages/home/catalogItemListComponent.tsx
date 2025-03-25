import Link from "next/link";
import Image from "next/image";
import styles from "./catalogItemListComponent.module.css";

// Props.
type Props = {
	title: string;
	model: CatalogItemBasicModel[];
};

export default function CatalogItemList(props: Props) {
	return (
			<div className={`row g-4 align-items-stretch mt-5 ${styles.catalogItemRow}`}>
				<div className="col col-12 fs-2 text-success text-center mb-2">
					{props.title}
				</div>

				{props.model.map((item, index) => (
						<div
								className="col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10
                                justify-self-md-start justify-self-sm-center"
								key={index}
						>
							<div className="card h-100 shadow-sm">
								<img
										src={item.thumbnailUrl}
										className={`card-img-top ${styles.catalogItemThumbnail}`}
										style={{ aspectRatio: 1 }}
										alt={item.name}
								/>

								<div className="card-body d-flex flex-column flex-fill
                                        justify-content-between align-items-start">
									<h5 className="card-title">
										{item.name}
									</h5>

									<Link
											href={item.detailRoute}
											className="btn btn-outline-success mt-2"
									>
										Chi tiết
									</Link>
								</div>
							</div>
						</div>
				))}
			</div>
	);
}