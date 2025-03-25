import * as api from "./api";

/**
 * Gets a list of all slider items.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is an
 * array of DTOs containing the information of the slider items.
 * @example getListAsync();
 */
async function getListAsync(): Promise<SliderItemResponseDto[]> {
	return await api.getAsync("/sliderItem");
}

/**
 * Gets a single existing slider item, specified by its id.
 *
 * @param id The id of the slider item to retrieves.
 * @returns A {Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the slider item.
 * @example getSingleAsync();
 *
 * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't exist.
 */
async function getSingleAsync(id: number): Promise<SliderItemResponseDto> {
	return await api.getAsync(`/sliderItem/${id}`);
}

/**
 * Creates a new slider item.
 *
 * @param requestDto A DTO containing the data for the creating operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is the id
 * of the created slider item.
 * @example createAsync({ ... });
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 */
async function createAsync(requestDto: SliderItemUpsertRequestDto): Promise<number> {
	return await api.postAsync("/sliderItem", requestDto);
}

/**
 * Updates an existing slider item, specified by its id.
 *
 * @param id The id of the slider item to update.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync(1, { ... });
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(id: number, requestDto: SliderItemUpsertRequestDto): Promise<void> {
	await api.putAndIgnoreAsync(`/sliderItem/${id}`, requestDto);
}

/**
 * Deletes an existing slider item, specified by its id.
 *
 * @param id The id of the slider item to delete.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example deleteAsync(1);
 *
 * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function deleteAsync(id: number): Promise<void> {
	await api.deleteAndIgnoreAsync(`/sliderItem/${id}`);
}

export {
	getListAsync as getSliderItemListAsync,
	getSingleAsync as getSliderItemSingleAsync,
	createAsync as createSliderItemAsync,
	updateAsync as updateSliderItemAsync,
	deleteAsync as deleteSliderItemAsync
};