import * as api from "./api";

/**
 * Gets a list of all members.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is an array
 * of DTOs containing the information of the members.
 */
async function getListAsync(): Promise<MemberResponseDto[]> {
	return await api.getAsync("/member");
}

/**
 * Gets a single existing member, specified by its id.
 *
 * @param id The id of the member to retrieve.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
 * containing the information of the member.
 *
 * @throws {NotFoundError} Throws when the member specified by {@link id} doesn't exist.
 */
async function getSingleAsync(id: number): Promise<MemberResponseDto> {
	return await api.getAsync(`/member/${id}`);
}

/**
 * Creates a new member.
 *
 * @param requestDto A DTO containing the data for the creating operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is the id
 * of the created member.
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 */
async function createAsync(requestDto: MemberUpsertRequestDto): Promise<number> {
	return await api.postAsync("/member", requestDto);
}

/**
 * Updates an existing member, specified by its id.
 *
 * @param id The id of the member to update.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 * @throws {NotFoundError} Throws when the member specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(id: number, requestDto: MemberUpsertRequestDto): Promise<void> {
	await api.putAndIgnoreAsync(`/member/${id}`, requestDto);
}

/**
 * Deletes an existing member, specified by its id.
 *
 * @param id The id of the member to delete.
 * @returns A {@link Promise} representing the asynchronous operation.
 *
 * @throws {NotFoundError} Throws when the member specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 */
async function deleteAsync(id: number): Promise<void> {
	await api.deleteAndIgnoreAsync(`/member/${id}`);
}

export {
	getListAsync as getMemberListAsync,
	getSingleAsync as getMemberSingleAsync,
	createAsync as createMemberAsync,
	updateAsync as updateMemberAsync,
	deleteAsync as deleteMemberAsync
};