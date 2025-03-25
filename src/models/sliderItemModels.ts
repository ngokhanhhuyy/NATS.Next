declare global {
	type SliderItemDetailModel = {
		id: number;
		title: string;
		index: number;
		thumbnailUrl: string;
	}
}

function createDetail(responseDto: SliderItemResponseDto): SliderItemDetailModel {
	return {
		id: responseDto.id,
		title: responseDto.title,
		index: responseDto.index,
		thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/1920x700"
	};
}

export { createDetail as createSliderItemDetailModel };