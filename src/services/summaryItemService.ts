import * as api from "./api";

/**
 * Gets a list of all summary items.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is an
 * array of DTOs containing the information of the summary items.
 * @example getListAsync();
 */
async function getListAsync(): Promise<SummaryItemResponseDto[]> {
	return await api.getAsync("/summaryItem");
}

/**
 * Gets a single existing summary item, specified by its id.
 *
 * @param id The id of the summary item to retrieves.
 * @returns A {Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the summary item.
 * @example getSingleAsync();
 *
 * @throws {NotFoundError} Throws when the summary item specified by {@link id} doesn't exist.
 */
async function getSingleAsync(id: number): Promise<SummaryItemResponseDto> {
	return await api.getAsync(`/summaryItem/${id}`);
}

/**
 * Updates an existing summary item, specified by its id.
 *
 * @param id The id of the summary item to update.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync(1, { ... });
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 * @throws {NotFoundError} Throws when the summary item specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(
		id: number,
		requestDto: SummaryItemUpdateRequestDto): Promise<void> {
	await api.putAndIgnoreAsync(`/summaryItem/${id}`, requestDto);
}

export {
	getListAsync as getSummaryItemListAsync,
	getSingleAsync as getSummaryItemSingleAsync,
	updateAsync as updateSummaryItemAsync
};