import * as api from "./api";

/**
 * Gets a list of all enquiries.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is an array
 * of DTOs containing the data of the enquiries.
 * 
 * @throws {AuthorizationError} Throws when the requested user doesn't have permission the
 * operation.
 */
async function getListAsync(): Promise<EnquiryResponseDto[]> {
	return await api.getAsync("/enquiry");
}

/**
 * Gets a single existing enquiry by its id.
 *
 * @param id The id of the enquiry to retrieve.
 * @returns A {@link Promise} presenting the asynchronous operation, which result is a DTO
 * containing the information of the enquiry.
 *
 * @throws {NotFoundError} Throws when the enquiry specified by {@link id} doesn't exist.
 * @throws {AuthorizationError} Throws when the requested user doesn't have permission the
 * operation.
 */
async function getSingleAsync(id: number): Promise<EnquiryResponseDto> {
	return await api.getAsync(`/enquiry/${id}`);
}

/**
 * Gets the number of enquiries that has not been completed yet.
 * 
 * @returns A {@link Promise} presenting the asynchronous operation, which result is the
 * number of incompleted enquiries.
 * 
 * @throws {AuthorizationError} Throws when the requested user doesn't have permission the
 * operation.
 */
async function getIncompletedCountAsync(): Promise<number> {
	return await api.getAsync("/enquiry/incompletedCount");
}

/**
 * Creates an enquiry with given data for a new one.
 * 
 * @param requestDto A DTO containing the data for the creating operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is the id
 * of the created enquiry.
 */
async function createAsync(requestDto: EnquiryCreateRequestDto): Promise<number> {
	return await api.postAsync("/enquiry", requestDto);
}

/**
 * Marks an existing enquiry, specified by id, as completed.
 * 
 * @param id The id of the enquiry to mark.
 * @returns A {@link Promise} representing the asynchronous operation.
 *
 * @throws {NotFoundError} Throws when the enquiry specified by {@link id} doesn't exist.
 * @throws {AuthorizationError} Throws when the requested user doesn't have permission the
 * operation.
 */
async function markAsCompletedAsync(id: number): Promise<void> {
	await api.postAndIgnoreAsync(`/enquiry/${id}/markAsCompleted`, { });
}

export {
	getListAsync as getEnquiryListAsync,
	getSingleAsync as getEnquirySingleAsync,
	getIncompletedCountAsync as getEnquiryIncompletedCountAsync,
	createAsync as createEnquiryAsync,
	markAsCompletedAsync as markEnquiryAsCompltedAsync
};