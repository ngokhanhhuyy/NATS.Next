import Link from "next/link";
import styles from "./detail.module.css";

// Props.
type DetailPageProps = {
	model: CatalogItemDetailModel;
}

type OtherItemListProps = {
	model: CatalogItemBasicModel[];
}

// Component.
function DetailPage(props: DetailPageProps) {
	return (
		<>
			<div className="container my-3" id="catalog-item-detail-view">
				<div className="row g-3 p-3 pb-0 justify-content-center">
					{/* Name and summary */}
					<div className="col col-md-10 col-12">
						{/* Name */}
						<h2 className="text-success mb-3">
							{props.model.name}
						</h2>

						{/* Summary */}
						<span>{props.model.summary}</span>
					</div>

					{/* Thumbnail */}
					<div className="col col-xl-4 col-md-5 col-sm-8 col-10">
						{props.model.thumbnailUrl && (
							<img
								src={props.model.thumbnailUrl}
								className="w-100 img-thumbnail rounded-4 shadow"
								alt={props.model.name}
							/>
						)}
					</div>

					{/* Detail */}
					<div className="col col-lg-10 col-12">
						{props.model.detail.split(/\r?\n/).map((paragraph, index) => (
							<p className={index < paragraph.length - 1 ? "mb-0" : undefined} key={index}>
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{props.model.photos.length > 0 && (
					<div className="row g-3 p-3 pt-0 justify-content-center">
						{props.model.photos.map((photo, index) => (
							<div className="col col-md-7 col-sm-10 col-12" key={photo.id}>
								<img
									src={photo.url}
									className="img-thumbnail w-100 rounded-4 shadow"
									alt={`${props.model.name} - Hình ảnh ${index}`}
								/>
							</div>
						))}
					</div>
				)}
			</div>

			{/* OtherItems */}
			<div className="container my-3">
				<h2 className="text-success text-md-center text-start">
					{props.model.typeDisplayName} khác
				</h2>
				<div className="row g-3 p-3 justify-content-center align-items-stretch">
					<OtherItemList model={props.model.otherItems} />
				</div>
			</div>
		</>
	);
}

function OtherItemList(props: OtherItemListProps) {
	return props.model.map(item => (
		<div className="col col-xl-3 col-md-6 col-sm-12 col-12" key={item.id}>
			<div className={`card w-100 h-100 ${styles.card}`}>
				<img
					src={item.thumbnailUrl}
					className={`card-img-top flex-shrink-0 ${styles.cardThumbnail}`}
					alt={item.name}
				/>

				<div className="card-body d-flex flex-column justify-content-start">
					{/* Name */}
					<Link href={item.detailRoute} className={`card-title ${styles.cardTitle}`}>
						{item.name}
					</Link>

					{/* Summary */}
					<div className="card-text d-block flex-fill">
						{item.summary}
					</div>
				</div>
			</div>
		</div>
	));
}

export default DetailPage;