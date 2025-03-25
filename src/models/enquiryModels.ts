import { createClonableModel } from "./baseModels";

declare global {
	type EnquiryCreateModel = Implements<IClonableModel<EnquiryCreateModel>, {
		fullName: string;
		phoneNumber: string;
		email: string;
		content: string;
		toRequestDto(): EnquiryCreateRequestDto;
		from(data: Partial<EnquiryCreateModel>): EnquiryCreateModel;
	}>;
}

function create(): EnquiryCreateModel {
	return {
		fullName: "",
		phoneNumber: "",
		email: "",
		content: "",
		toRequestDto(): EnquiryCreateRequestDto {
			return {
				fullName: this.fullName,
				phoneNumber: this.phoneNumber,
				email: this.email,
				content: this.content
			};
		},
		...createClonableModel()
	};
};

export { create as createEnquiryCreateModel };