declare global {
	type CertificateDetailModel = {
		id: number;
		name: string;
		thumbnailUrl: string;
	};
}

function create(responseDto: CertificateResponseDto): CertificateDetailModel {
	return {
		id: responseDto.id,
		name: responseDto.name,
		thumbnailUrl: responseDto.thumbnailUrl
	};
}

export { create as createCertificateDetailModel };