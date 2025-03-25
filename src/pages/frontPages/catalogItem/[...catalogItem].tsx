import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { getCatalogItemDetailAsync } from "@/services/catalogItemService";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { createCatalogItemDetailModel } from "@/models/catalogItemModels";
import { CatalogItemType } from "@/enums/catalogItemType";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Page components.
import ListPage from "./list";
import DetailPage from "./detail";

// Shared variables.
type RouteParam = "services" | "courses" | "products";

const typeByRouteParams: Record<RouteParam, CatalogItemType> = {
    "services": CatalogItemType.Service,
    "courses": CatalogItemType.Course,
    "products": CatalogItemType.Product
};

const titleByRouteParam: Record<RouteParam, string> = {
    "services": "Dịch vụ",
    "courses": "Khoá học",
    "products": "Sản phẩm"
};

// Props.
type Props = {
    title: string;
    model: CatalogItemBasicModel[] | CatalogItemDetailModel;
    typeDisplayName: string;
}

export const getServerSideProps = (async ({ params: currentParam }) => {
    // Validate param.
    if (!currentParam?.catalogItem) {
        return { notFound: true };
    }

    const currentParamLength = currentParam.catalogItem.length;
    if (!currentParamLength || currentParamLength > 2) {
        return { notFound: true };
    }

    let isCurrentParamValid = false;
    for (const param of Object.keys(typeByRouteParams)) {
        if (currentParam?.catalogItem[0] === param) {
            isCurrentParamValid = true;
            break;
        }
    }

    if (!isCurrentParamValid) {
        return { notFound: true };
    }

    const routeParam = currentParam.catalogItem[0] as RouteParam;
    const title = titleByRouteParam[routeParam];
    const typeDisplayName = titleByRouteParam[routeParam];
    let model: CatalogItemBasicModel[] | CatalogItemDetailModel;
    if (currentParam.catalogItem[1] == null) {
        const basicResponseDtos = await getCatalogItemListAsync({
            type: typeByRouteParams[routeParam]
        });
    
        model = basicResponseDtos.map(dto => createCatalogItemBasicModel(dto));
    } else {
        const id = parseInt(currentParam.catalogItem[1]);
        if (isNaN(id)) {
            return { notFound: true };
        }
    
        const detailResponseDto = await getCatalogItemDetailAsync(id);

        model = createCatalogItemDetailModel(detailResponseDto);
    }
    
    return {
        props: { title, model, typeDisplayName }
    };

}) satisfies GetServerSideProps<Props>;

// Component.
function CatalogItemListPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <FrontPageSubPageLayout title={props.title}>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content="Giới thiệu về lĩnh vực hoạt động." />
            </Head>

            {Array.isArray(props.model)
                ? <ListPage model={props.model} typeDisplayName={props.typeDisplayName} />
                : <DetailPage model={props.model} />
            }
        </FrontPageSubPageLayout>
    );
}

export default CatalogItemListPage;