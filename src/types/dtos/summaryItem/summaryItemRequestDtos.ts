declare global {
	type SummaryItemUpdateRequestDto = {
		name: string;
		summaryContent: string;
		detailContent: string;
		thumbnailFile: string;
		thumbnailChanged: boolean;
	};
}

export {};