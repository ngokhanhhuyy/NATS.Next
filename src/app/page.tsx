import type { Metadata } from "next";
import { getListAsync as getSliderItemListAsync } from "@/services/sliderItemService";
import { getListAsync as getSummaryItemListAsync } from "@/services/summaryItemService";
import { getAsync as getAboutUsIntroductionAsync }
    from "@/services/aboutUsIntroductionService";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Trang chủ",
};

export default async function Home() {
    const responseDtos = await Promise.all([
        getSliderItemListAsync(),
        getSummaryItemListAsync(),
        getAboutUsIntroductionAsync(),

    ]);
};