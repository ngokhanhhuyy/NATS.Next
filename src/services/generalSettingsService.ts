import * as api from "./api";

/**
 * Gets the settings.
 * 
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the settings information.
 * @example getAsync();
 */
async function getAsync(): Promise<GeneralSettingsResponseDto> {
    return await api.getAsync("/generalSettings");
}

/**
 * Updates the settings.
 * 
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync({ ... });
 * 
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(requestDto: GeneralSettingsUpdatetRequestDto): Promise<void> {
    return await api.putAndIgnoreAsync("/generalSettings", requestDto);
}

export {
    getAsync as getGeneralSettingsAsync,
    updateAsync as updateGeneralSettingsAsync
};