declare global {
	type CertificateUpsertRequestDto = {
		id: number;
		name: string;
		thumbnailFile: string;
		thumbnailChanged: boolean;
	};
}

export {};