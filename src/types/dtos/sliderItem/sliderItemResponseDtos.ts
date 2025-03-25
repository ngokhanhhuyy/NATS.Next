declare global {
	type SliderItemResponseDto = {
		id: number;
		title: string;
		index: number;
		thumbnailUrl: string | null;
	}
}

export {}