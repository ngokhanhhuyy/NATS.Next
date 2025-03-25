import * as api from "./api";

/**
 * Gets the about us introduction.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the about us introduction.
 * @example getAsync();
 */
async function getAsync(): Promise<AboutUsIntroductionResponseDto> {
	return api.getAsync("/aboutUsIntroduction");
}

/**
 * Update the about us introduction.
 *
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync({ ... });
 *
 * @throws {ConcurrencyError} Throws when there is a concurreny-related conflict occuring
 * during the operation.
 */
async function updateAsync(requestDto: AboutUsIntroductionUpdateRequestDto): Promise<void> {
	await api.postAsync("/aboutUsIntroduction", requestDto);
}

export {
	getAsync as getAboutUsIntroductionAsync,
	updateAsync as updateAboutUsIntroductionAsync
};