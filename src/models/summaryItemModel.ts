import { getSummaryItemsRoutePath } from "@/utils/routeUtils";

declare global {
	type SummaryItemDetailModel = {
		id: number;
		name: string;
		summaryContent: string;
		detailContent: string;
		thumbnailUrl: string;
		detailRoute: string;
	};
}

function createDetail(responseDto: SummaryItemResponseDto): SummaryItemDetailModel {
	return {
		id: responseDto.id,
		name: responseDto.name,
		summaryContent: responseDto.summaryContent,
		detailContent: responseDto.detailContent,
		thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/256",
		get detailRoute(): string {
			return getSummaryItemsRoutePath(this.id);
		}
	};
}

export { createDetail as createSummaryItemDetailModel };