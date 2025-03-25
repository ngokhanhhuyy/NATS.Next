declare global {
	type SliderItemUpsertRequestDto = {
		title: string;
		thumbnailFile: string;
		thumbnailChanged: boolean;
	};
}

export {};