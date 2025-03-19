import { ThumbnailType } from "@/enums/thumbnailType";

declare global {
    type AboutUsIntroductionDetailModel = {
        thumbnailUrl: string;
        thumbnailType: ThumbnailType;
        mainQuoteContent: string;
        aboutUsContent: string;
        whyChooseUsContent: string;
        ourDifferenceContent: string;
        ourCultureContent: string;
    };
}

type ResponseDto = AboutUsIntroductionResponseDto;

function createDetail(responseDto: ResponseDto): AboutUsIntroductionDetailModel {
    return {
        thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/900x500",
        thumbnailType: responseDto.thumbnailType,
        mainQuoteContent: responseDto.mainQuoteContent,
        aboutUsContent: responseDto.aboutUsContent,
        whyChooseUsContent: responseDto.whyChooseUsContent,
        ourDifferenceContent: responseDto.ourDifferenceContent,
        ourCultureContent: responseDto.ourCultureContent
    };
}

export { createDetail as createAboutUsIntroductionDetailModel };