import Link from "next/link";
import { CatalogItemType } from "@/enums/catalogItemType";
import {
	getCourseDetailRoutePath,
	getProductDetailRoutePath,
	getServiceDetailRoutePath
} from "@/utils/routeUtils";
import styles from "./list.module.css";

// Props.
type ListPageProps = {
	model: CatalogItemBasicModel[];
	typeDisplayName: string;
}

type ItemProps = {
	model: CatalogItemBasicModel;
	index: number;
}

// Component.
function ListPage(props: ListPageProps) {
	return (
		<>
			<div className="container my-3 align-items-center">
				{props.model.length > 0 ? (
					<div className={`row g-3 p-3 ${styles.catalogItemsRow}`}>
						{props.model.map((item, index) => (
							<Item model={item} index={index} key={index} />
						))}
					</div>
				) : (
					<div className="opacity-50 text-center">
						Không có {props.typeDisplayName.toLowerCase()} nào
					</div>
				)}
			</div>
		</>
	);
}

function Item(props: ItemProps) {
	// Computed.
	function computeThumbnailUrl(): string {
		if (props.model.type == CatalogItemType.Course) {
			return "https://placehold.co/400";
		}

		return props.model.thumbnailUrl;
	}

	function computeDetailRoutePath(): string {
		const detailRoutePathGetters = {
			[CatalogItemType.Service]: getServiceDetailRoutePath,
			[CatalogItemType.Course]: getCourseDetailRoutePath,
			[CatalogItemType.Product]: getProductDetailRoutePath,
		};

		return detailRoutePathGetters[props.model.type](props.model.id);
	}

	return (
		<div className="col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-12
                        justify-self-md-start justify-self-sm-center">
			<div className="card h-100 shadow-sm">
				{/* Thumbnail */}
				<img
					src={computeThumbnailUrl()}
					className="card-img-top catalog-item-thumbnail"
					alt={props.model.name}
				/>

				<div className="card-body d-flex flex-column flex-fill
                                justify-content-between align-items-start">
					{/* Title */}
					<h5 className="card-title text-success">
						{props.model.name}
					</h5>

					{/* Summary */}
					<span>{props.model.summary}</span>

					{/* LinkToDetail */}
					<Link
						href={computeDetailRoutePath()}
						className="btn btn-outline-success mt-2"
					>
						Chi tiết
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ListPage;