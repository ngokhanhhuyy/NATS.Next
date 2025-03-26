import { useEffect, type CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { createSummaryItemDetailModel } from "@/models/summaryItemModel";
import styles from "./index.module.css";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Props.
type SummaryItemPageProps = {
	model: SummaryItemDetailModel[];
}

type ItemProps = {
	model: SummaryItemDetailModel;
	index: number;
}

export const getServerSideProps = (async () => {
	const responseDtos = await getSummaryItemListAsync();

	return {
		props: {
			model: responseDtos.map(dto => createSummaryItemDetailModel(dto))
		}
	};
}) satisfies GetServerSideProps<SummaryItemPageProps>;

// Component.
export default function SummaryItemPage(props: SummaryItemPageProps) {
	// Dependencies.
	const router = useRouter();

	// Effect.
	useEffect(() => {
		if (router.asPath.includes("#")) {
			const itemId = router.asPath.split("#")[0];
			const itemElement = document.getElementById(itemId);
			if (itemElement) {
				itemElement.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, []);

	return (
		<FrontPageSubPageLayout title="Giới thiệu" description="Description">
			<Head>
				<title>Giới thiệu</title>
				<meta name="description" content="Giới thiệu về lĩnh vực hoạt động." />
			</Head>

			<div className="container p-4 py-5">
				{props.model.map((item, index) => (
					<Item model={item} index={index} key={index} />
				))}
			</div>
		</FrontPageSubPageLayout>
	);
}

function Item(props: ItemProps) {
	// Computed.
	function computeThumbnailStyle(): CSSProperties {
		return {
			width: 250,
			height: "auto",
			aspectRatio: 1,
			objectFit: "cover",
			objectPosition: "50%"
		};
	}

	function computeThumbnailColumnClassName(): string {
		return `order-lg-${props.index % 2}`;
	}

	function computeDetailColumnClassName(): string {
		return `order-lg-${(props.index + 1) % 2}`;
	}

	function computeNameClassName(): string {
		let className: string = "text-center";
		if (props.index % 2 == 0) {
			className += " text-lg-start";
		} else {
			className += " text-lg-end";
		}

		return className;
	}

	return (
		<div
			className={`row gx-5 gy-3 mb-3 justify-content-center ${styles.itemRow}`}
			id={props.model.id.toString()}
		>
			{/* Thumbnail */}
			<div
				className={[
					"col col-lg-auto col-md-10 col-12 d-flex justify-content-center align-items-start",
					computeThumbnailColumnClassName()
				].join(" ")}
			>
				<img
					src={props.model.thumbnailUrl}
					className="rounded-circle shadow"
					style={computeThumbnailStyle()}
					alt={props.model.name}
				/>
			</div>

			{/* Detail */}
			<div className={`col col-lg col-md-10 col-12 ${computeDetailColumnClassName()}`}>
				{/* Name */}
				<h2 className={`text-success ${computeNameClassName()}`}>
					{props.model.name}
				</h2>

				{/* DetailContent */}
				{props.model.detailContent.split(/\r?\n/).map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</div>
		</div>
	);
}