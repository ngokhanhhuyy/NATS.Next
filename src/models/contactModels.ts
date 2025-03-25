import { ContactType } from "@/enums/contactType";

declare global {
	type ContactDetailModel = {
		id: number;
		type: ContactType;
		content: string;
		encodedContent: string;
		iconClassName: string;
		typeDisplayName: string;
	};
}

const iconClassNameByTypes: Record<ContactType, string> = {
	[ContactType.PhoneNumber]: "bi-telephone-fill",
	[ContactType.ZaloNumber]: "bi-stop-circle-fill",
	[ContactType.Email]: "bi-envelope-at-fill",
	[ContactType.Address]: "bi-geo-alt-fill"
};

const displayNameByTypes: Record<ContactType, string> = {
	[ContactType.PhoneNumber]: "Số điện thoại",
	[ContactType.ZaloNumber]: "Zalo",
	[ContactType.Email]: "Chỉ email",
	[ContactType.Address]: "Địa chỉ"
};

function createDetail(responseDto: ContactResponseDto): ContactDetailModel {
	let content = responseDto.content;
	const isPhoneNumber = responseDto.type === ContactType.PhoneNumber;
	const isZaloNumber = responseDto.type === ContactType.PhoneNumber;
	if (isPhoneNumber || isZaloNumber) {
		content = responseDto.content
				.replaceAll(" ", "")
				.replace("+84", "0")
				.replaceAll(/(\d})(\d{3})(\d{3})/g, "$1 $2 $3");
	}

	return {
		id: responseDto.id,
		type: responseDto.type,
		content: content,
		get encodedContent(): string {
			return encodeURIComponent(this.content);
		},
		get iconClassName(): string {
			return iconClassNameByTypes[this.type];
		},
		get typeDisplayName(): string {
			return displayNameByTypes[this.type];
		}
	};
}

export { createDetail as createContactDetailModel };