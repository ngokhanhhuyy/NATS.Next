declare global {
    type SummaryItemDetailModel = {
        id: number;
        name: string;
        summaryContent: string;
        detailContent: string;
        thumbnailUrl: string;
    };
}

function createDetail(responseDto: SummaryItemResponseDto): SummaryItemDetailModel {
    return {
        id: responseDto.id,
        name: responseDto.name,
        summaryContent: responseDto.summaryContent,
        detailContent: responseDto.detailContent,
        thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/256"
    };
}

export { createDetail as createSummaryItemDetailModel };