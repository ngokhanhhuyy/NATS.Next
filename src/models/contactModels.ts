import { ContactType } from "@/enums/contactType";

declare global {
    type ContactDetailModel = {
        id: number;
        type: ContactType;
        content: string;
        encodedContent: string;
        iconClassName: string;
    };
}

const iconClassNames = {
    [ContactType.PhoneNumber]: "bi-telephone-fill",
    [ContactType.ZaloNumber]: "bi-stop-circle-fill",
    [ContactType.Email]: "bi-envelope-at-fill",
    [ContactType.Address]: "bi-geo-alt-fill"
};

function createDetail(responseDto: ContactResponseDto): ContactDetailModel {
    return {
        id: responseDto.id,
        type: responseDto.type,
        content: responseDto.content,
        get encodedContent(): string {
            return encodeURIComponent(this.content);
        },
        get iconClassName(): string {
            return iconClassNames[this.type];
        },
    };
}

export { createDetail as createContactDetailModel };