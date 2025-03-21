import * as api from "./api";

type ListRequestDto = CatalogItemListRequestDto;
type BasicResponseDto = CatalogItemBasicResponseDto;

/**
 * Get the list of all catalog items with basic information and thumbnail only.
 *
 * @param requestDto (Optional) A DTO containing the conditions for the results.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the item.
 * @example getListAsync(CatalogItemType.Service);
 *
 * @throws {NotFoundError} Throws when the catalog items specified by {@link type} and doesn't
 * exist.
 */
async function getListAsync(requestDto?: ListRequestDto): Promise<BasicResponseDto[]> {
    return await api.getAsync("/catalogItem", requestDto);
}

/**
 * Gets a specific catalog item by given id with detail information, thumbnail url and photos.
 *
 * @param id The id of the catalog item to retrieve.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the item.
 * @example getDetailAsync(CatalogItemType.Service, 1);
 *
 * @throws {NotFoundError} Throws when the catalog items specified by {@link type} and
 * {@link id} doesn't exist.
 */
async function getDetailAsync(id: number): Promise<CatalogItemDetailResponseDto> {
    return await api.getAsync(`/catalogItem/${id}`);
}

/**
 * Create a new catalog item with the given data.
 *
 * @param requestDto A DTO containing the data for the creating operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is the id
 * of the created catalog item.
 * @example createAsync({ ... });
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during the
 * operation.
 */
async function createAsync(requestDto: CatalogItemUpsertRequestDto): Promise<number> {
    return await api.postAsync("/catalogItem", requestDto);
}

/**
 * Update an existing catalog item by the given id with the data specified in the request,
 * containing thumbnail and photo files.
 *
 * @param id The id of the catalog item to be updated.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 * @example updateAsync(1, { ... });
 *
 * @throws {ValidationError}
 * @throws {NotFoundError} Throws when the catalog item specified by doesn't exist.
 */
async function updateAsync(
        id: number,
        requestDto: CatalogItemUpsertRequestDto): Promise<void> {
    await api.putAndIgnoreAsync(`/catalogItem/${id}`, requestDto);
}

async function deleteAsync(id: number): Promise<void> {
    await api.deleteAndIgnoreAsync(`/catalogItem/${id}`);
}

export {
    getListAsync as getCatalogItemListAsync,
    getDetailAsync as getCatalogItemDetailAsync,
    createAsync as createCatalogItemAsync,
    updateAsync as updateCatalogItemAsync,
    deleteAsync as deleteCatalogItemAsync
};