import type { ReactElement, ReactNode } from "react";
import Image from "next/image";
import { getSliderItemListAsync } from "@/services/sliderItemService";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { getContactListAsync } from "@/services/contactService";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { CatalogItemType } from "@/enums/catalogItemType";
import { createSliderItemDetailModel } from "@/models/sliderItemModels";
import { createSummaryItemDetailModel } from "@/models/summaryItemModel";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import styles from "./index.module.css";

// Layout component.
import FrontPageLayout from "../../../components/layout/frontPages/frontPageLayout";

// Child components.
import SliderItemList from "./sliderItemListComponent";
import SummaryItemList from "./summaryItemListComponent";
import CatalogItemList from "./catalogItemListComponent";
import EnquiryForm from "@/components/layout/frontPages/enquiryFormComponent";

// Props.
type HomeProps = {
	model: {
		sliderItems: SliderItemDetailModel[];
		summaryItems: SummaryItemDetailModel[];
		aboutUsIntroduction: AboutUsIntroductionDetailModel;
		services: CatalogItemBasicModel[];
		courses: CatalogItemBasicModel[];
		products: CatalogItemBasicModel[];
		contacts: ContactDetailModel[];
		generalSettings: GeneralSettingsDetailModel;
	};
};

export async function getServerSideProps() {
	const [
		sliderItemResponseDtos,
		summaryItemResponseDtos,
		aboutUsIntroductionResponseDto,
		catalogItemResponseDtos,
		contactResponseDtos,
		generalSettingsResponseDto,
	] = await Promise.all([
		getSliderItemListAsync(),
		getSummaryItemListAsync(),
		getAboutUsIntroductionAsync(),
		getCatalogItemListAsync(),
		getContactListAsync(),
		getGeneralSettingsAsync(),
	]);

	const model = {
		sliderItems: sliderItemResponseDtos.map((dto) => createSliderItemDetailModel(dto)),
		summaryItems: summaryItemResponseDtos.map((dto) => createSummaryItemDetailModel(dto)),
		aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsIntroductionResponseDto),
		services: catalogItemResponseDtos
			.filter((dto) => dto.type === CatalogItemType.Service)
			.map((dto) => createCatalogItemBasicModel(dto)),
		courses: catalogItemResponseDtos
			.filter((dto) => dto.type === CatalogItemType.Course)
			.map((dto) => createCatalogItemBasicModel(dto)),
		products: catalogItemResponseDtos
			.filter((dto) => dto.type === CatalogItemType.Product)
			.map((dto) => createCatalogItemBasicModel(dto)),
		contacts: contactResponseDtos.map((dto) => createContactDetailModel(dto)),
		generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto),
	};

	return { props: { model } };
}

// Component.
export default function HomePage(props: HomeProps) {
	return (
		<div className="container-fluid p-0">
			<SliderItemList model={props.model.sliderItems} />

			{/* ApplicationName */}
			<div
				className={[
					"container-fluid text-center text-white fw-bold p-2 mb-3 shadow",
					styles.applicationNameContainer
				].join(" ")}
			>
				{props.model.generalSettings.applicationName}
			</div>

			{/* SummaryItems */}
			<SummaryItemList model={props.model.summaryItems} />

			{/* AboutUsIntroduction */}
			<div className="container-fluid bg-success text-white fs-5 my-5 shadow">
				<div className="container">
					<div className="row justify-content-center align-items-stretch">
						<div
							className={[
								"col col-xl-6 col-lg-8 col-12 overflow-hidden",
								"d-flex align-items-center p-4",
							].join(" ")}
						>
							<Image
								src={props.model.aboutUsIntroduction.thumbnailUrl}
								className="w-100 h-auto rounded-3"
								width={1}
								height={1}
								sizes="100vw"
								alt="Về chúng tôi"
							/>
						</div>
						<div
							className={[
								"col-xl col-lg-8 col p-4 pt-3 d-flex flex-column",
								"justify-content-center align-items-start",
							].join(" ")}
						>
							<div className="fs-2 mb-3">Về chúng tôi</div>
							<p>{props.model.aboutUsIntroduction.aboutUsContent}</p>
							<a
								asp-area="FrontPages"
								asp-controller="AboutUs"
								asp-action="Index"
								className="btn btn-outline-light mt-3"
							>
								Tìm hiểu thêm
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* CatalogItems */}
			<div className="container my-5 px-3" id="catalog-item-container">
				<CatalogItemList title="Dịch vụ" model={props.model.services} />
				<CatalogItemList title="Khoá học" model={props.model.courses} />
				{/* <CatalogItemList title="Sản phẩm" model={props.model.products} /> */}
			</div>

			{/* Enquiry */}
			<EnquiryForm />
		</div>
	);
}

HomePage.getLayout = (page: ReactElement): ReactNode => {
	return (
		<FrontPageLayout title="Trang chủ" description="Trang chủ">
			{page}
		</FrontPageLayout>
	);
};