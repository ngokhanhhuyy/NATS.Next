declare global {
	type MemberDetailModel = {
		id: number;
		fullName: string;
		roleName: string;
		description: string;
		thumbnailUrl: string;
	}
}

function create(responseDto: MemberResponseDto): MemberDetailModel {
	return {
		id: responseDto.id,
		fullName: responseDto.fullName,
		roleName: responseDto.roleName,
		description: responseDto.description,
		thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/512x512"
	};
}

export { create as createMemberDetailModel };