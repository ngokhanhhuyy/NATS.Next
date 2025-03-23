import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { CatalogItemType } from "@/enums/catalogItemType";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Page components.
import ListPage from "./list";

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
export const getServerSideProps = (async ({ params: currentParam }) => {
    console.log(currentParam?.catalogItem);
    if (!currentParam?.catalogItem) {
        return { notFound: true };
    }

    // Validate path name.
    let isCurrentParamValid = false;
    for (const param of Object.keys(typeByRouteParams)) {
        if (currentParam?.catalogItem === param) {
            isCurrentParamValid = true;
            break;
        }
    }

    if (!isCurrentParamValid) {
        return { notFound: true };
    }

    const routeParam = currentParam.catalogItem as RouteParam;

    // Fetch the data.
    const responseDtos = await getCatalogItemListAsync({
        type: typeByRouteParams[routeParam]
    });

    return {
        props: {
            title: titleByRouteParam[routeParam],
            model: responseDtos.map(dto => createCatalogItemBasicModel(dto))
        }
    };
}) satisfies GetServerSideProps<{ model: CatalogItemBasicModel[] }>;

// Component.
function CatalogItemListPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <FrontPageSubPageLayout>
            <Head>
                <title>Giới thiệu</title>
                <meta name="description" content="Giới thiệu về lĩnh vực hoạt động." />
            </Head>

            <div className="container py-4 mt-4">
                {props.model.map((item, index) => (
                    <Item model={item} index={index} key={index} />
                ))}
            </div>
        </FrontPageSubPageLayout>
    );
}

export default CatalogItemListPage;