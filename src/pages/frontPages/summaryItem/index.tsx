import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { createSummaryItemDetailModel } from "@/models/summaryItemModel";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Child component.
import Item from "./itemComponent";

// Props.
export const getServerSideProps = (async () => {
    const responseDtos = await getSummaryItemListAsync();

    return {
        props: {
            model: responseDtos.map(dto => createSummaryItemDetailModel(dto))
        }
    };
}) satisfies GetServerSideProps<{ model: SummaryItemDetailModel[] }>;

// Component.
export default function SummaryItemPage(
        props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <FrontPageSubPageLayout>
            <Head>
                <title>Giới thiệu</title>
                <meta name="description" content="Giới thiệu về lĩnh vực hoạt động." />
            </Head>

            <div className="container py-4 mt-4" id="summary-item-view">
                {props.model.map((item, index) => (
                    <Item model={item} index={index} key={index} />
                ))}
            </div>
        </FrontPageSubPageLayout>
    );
}