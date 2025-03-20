import type { Metadata } from "next";
import { getSliderItemListAsync } from "@/services/sliderItemService";
import { getListAsync as getSummaryItemListAsync } from "@/services/summaryItemService";
import {
    getAsync as getAboutUsIntroductionAsync
} from "@/services/aboutUsIntroductionService";
import { getListAsync as getCatalogItemListAsync } from "@/services/catalogItemService";
import { getListAsync as getContactListAsync } from "@/services/contactService";
import { getAsync as getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { CatalogItemType } from "@/enums/catalogItemType";
import { createSliderItemDetailModel } from "@/models/sliderItemModels";
import { createSummaryItemDetailModel } from "@/models/summaryItemModel";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import styles from "./page.module.css";

// Child components.
import SliderItemList from "@/components/frontPages/home/sliderItemListComponent";
import CatalogItemList from "@/components/frontPages/home/catalogItemListComponent";
import EnquiryForm from "@/components/frontPages/enquiryFormComponent";

export const metadata: Metadata = {
    title: "Trang chủ",
};

async function fetchAndInitializeModelAsync() {
    const [
        sliderItemResponseDtos,
        summaryItemResponseDtos,
        aboutUsIntroductionResponseDto,
        catalogItemResponseDtos,
        contactResponseDtos,
        generalSettingsResponseDto
    ] = await Promise.all([
        getSliderItemListAsync(),
        getSummaryItemListAsync(),
        getAboutUsIntroductionAsync(),
        getCatalogItemListAsync(),
        getContactListAsync(),
        getGeneralSettingsAsync()
    ]);

    return {
        sliderItems: sliderItemResponseDtos.map(dto => createSliderItemDetailModel(dto)),
        summaryItems: summaryItemResponseDtos.map(dto => createSummaryItemDetailModel(dto)),
        aboutUsIntroduction: createAboutUsIntroductionDetailModel(
            aboutUsIntroductionResponseDto),
        services: catalogItemResponseDtos
            .filter(dto => dto.type === CatalogItemType.Service)
            .map(dto => createCatalogItemBasicModel(dto)),
        courses: catalogItemResponseDtos
            .filter(dto => dto.type === CatalogItemType.Course)
            .map(dto => createCatalogItemBasicModel(dto)),
        products: catalogItemResponseDtos
            .filter(dto => dto.type === CatalogItemType.Product)
            .map(dto => createCatalogItemBasicModel(dto)),
        contacts: contactResponseDtos.map(dto => createContactDetailModel(dto)),
        generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto)
    };
}

export default async function Home() {
    const model = await fetchAndInitializeModelAsync();

    return (
        <div className="container-fluid p-0">
            <SliderItemList model={model.sliderItems} />

            {/* ApplicationName */}
            <div className={`container-fluid text-center text-white fw-bold p-2 mb-3 shadow
                            ${styles.applicationNameContainer}`}
            >
                {model.generalSettings.applicationName}
            </div>

            {/* SummaryItems */}
            <div className="container my-5">
                <div className="row g-3">
                    {model.summaryItems.map((item, index) => (
                        <div
                            className="col col-xl-3 col-md-6 col-12 p-3
                                        d-flex flex-column align-items-center"
                            key={index}
                        >
                            <img
                                className={`rounded-circle mb-3 shadow
                                            ${styles.summaryItemThumbnail}`}
                                src={item.thumbnailUrl}
                                alt={item.name}
                            />

                            <span className="fs-3 text-center text-success mb-3">
                                {item.name}
                            </span>

                            <p>{item.summaryContent}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* AboutUsIntroduction */}
            <div className="container-fluid bg-success text-white fs-5 my-5 shadow">
                <div className="container">
                    <div className="row justify-content-center align-items-stretch">
                        <div className="col col-xl-6 col-lg-8 col-12 overflow-hidden
                                        d-flex align-items-center p-4">
                            <img
                                src={model.aboutUsIntroduction.thumbnailUrl}
                                className="w-100 rounded-3"
                                alt="Về chúng tôi"
                            />
                        </div>
                        <div className="col-xl col-lg-8 col p-4 pt-3 d-flex flex-column
                                        justify-content-center align-items-start">
                            <div className="fs-2 mb-3">Về chúng tôi</div>
                            <p>{model.aboutUsIntroduction.aboutUsContent}</p>
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
                <CatalogItemList title="Dịch vụ" model={model.services} />
                <CatalogItemList title="Khoá học" model={model.courses} />
                <CatalogItemList title="Sản phẩm" model={model.products} />
            </div>

            {/* Enquiry */}
            <EnquiryForm />
        </div>
    );
};