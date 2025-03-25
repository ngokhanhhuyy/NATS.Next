import * as api from "./api";

/**
 * Gets a list of all certificates.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is an array
 * of DTOs, containing the information of the certificates.
 */
async function getListAsync(): Promise<CertificateResponseDto[]> {
	return await api.getAsync("/certificate");
}

/**
 * Gets a single existing certificate by its id.
 *
 * @param id The id of the certificate to retrieve.
 * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO,
 * containing the information of the certificate.
 *
 * @throws {NotFoundError} Throws when the certificate specified by {@link id} doesn't exist.
 */
async function getSingleAsync(id: number): Promise<CertificateResponseDto> {
	return await api.getAsync(`/certificate/${id}`);
}

/**
 * Creates a new certificate.
 *
 * @param requestDto A DTO containing for the creating operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is the id
 * of the created certificate.
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 */
async function createAsync(requestDto: CertificateUpsertRequestDto): Promise<number> {
	return await api.postAsync("/certificate", requestDto);
}

/**
 * Updates an existing certificate, specified by its id.
 *
 * @param id The id of the certificate to update.
 * @param requestDto A DTO containing the data for the updating operation.
 * @returns A {@link Promise} representing the asynchronous operation.
 *
 * @throws {ValidationError} Throws when the data specified by {@link requestDto} is invalid.
 * @throws {NotFoundError} Throws when the certificate specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 * during the operation.
 */
async function updateAsync(
		id: number,
		requestDto: CertificateUpsertRequestDto): Promise<void> {
	await api.putAndIgnoreAsync(`/certificate/${id}`, requestDto);
}

/**
 * Deletes an existing certificate, specified by its id.
 *
 * @param id The id of the certificate to delete.
 * @returns A {@link Promise} representing the asynchronous operation.
 *
 * @throws {NotFoundError} Throws when the certificate specified by {@link id} doesn't exist.
 * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
 */
async function deleteAsync(id: number): Promise<void> {
	await api.deleteAndIgnoreAsync(`/certificate/${id}`);
}

export {
	getListAsync as getCertificateListAsync,
	getSingleAsync as getCertificateSingleAsync,
	createAsync as createCertificateAsync,
	updateAsync as updateCertificateAsync,
	deleteAsync as deleteCertificateAsync
};