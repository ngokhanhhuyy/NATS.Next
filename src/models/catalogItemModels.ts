import { CatalogItemType } from "@/enums/catalogItemType";
import {
	getServiceDetailRoutePath,
	getCourseDetailRoutePath,
	getProductDetailRoutePath
} from "@/utils/routeUtils";

declare global {
	type CatalogItemBasicModel = {
		id: number;
		name: string;
		type: CatalogItemType;
		summary: string;
		thumbnailUrl: string;
		detailRoute: string;
	};

	type CatalogItemDetailModel = {
		id: number;
		name: string;
		type: CatalogItemType;
		summary: string;
		detail: string;
		thumbnailUrl: string | null;
		photos: CatalogItemDetailPhotoModel[];
		otherItems: CatalogItemBasicModel[];
		detailRoute: string;
		typeDisplayName: string;
	};

	type CatalogItemDetailPhotoModel = {
		id: number;
		url: string;
	};
}

type BasicResponseDto = CatalogItemBasicResponseDto;
type DetailResponseDto = CatalogItemDetailResponseDto;
type DetailPhotoResponseDto = CatalogItemDetailPhotoResponseDto;
type BasicModel = CatalogItemBasicModel;
type DetailModel = CatalogItemDetailModel;
type DetailPhotoModel = CatalogItemDetailPhotoModel;

const typeDisplayNames: Record<CatalogItemType, string> = {
	[CatalogItemType.Service]: "Dịch vụ",
	[CatalogItemType.Course]: "Khoá học",
	[CatalogItemType.Product]: "Sản phẩm"
};

function createBasic(responseDto: BasicResponseDto): BasicModel {
	let thumbnailUrl = "https://placehold.co/800x600";
	if (responseDto.type !== CatalogItemType.Course && responseDto.thumbnailUrl) {
		thumbnailUrl = responseDto.thumbnailUrl;
	}

	return {
		id: responseDto.id,
		name: responseDto.name,
		type: responseDto.type,
		summary: responseDto.summary,
		thumbnailUrl: thumbnailUrl,
		get detailRoute(): string {
			switch (this.type) {
				case CatalogItemType.Service:
					return getServiceDetailRoutePath(this.id);
				case CatalogItemType.Course:
					return getCourseDetailRoutePath(this.id);
				case CatalogItemType.Product:
					return getProductDetailRoutePath(this.id);
			}
		}
	};
}

function createDetail(responseDto: DetailResponseDto): DetailModel {
	let thumbnailUrl: string | null = responseDto.thumbnailUrl;
	let photosAsPlaceholders = false;
	if (responseDto.type === CatalogItemType.Course && responseDto.thumbnailUrl) {
		thumbnailUrl = "https://placehold.co/800x600";
		photosAsPlaceholders = true;
	}

	return {
		id: responseDto.id,
		name: responseDto.name,
		type: responseDto.type,
		summary: responseDto.summary,
		detail: responseDto.detail,
		thumbnailUrl: thumbnailUrl,
		photos: responseDto.photos.map(dto => createDetailPhoto(dto, photosAsPlaceholders)),
		otherItems: responseDto.otherItems.map(dto => createBasic(dto)),
		get detailRoute(): string {
			switch (this.type) {
				case CatalogItemType.Service:
					return getServiceDetailRoutePath(this.id);
				case CatalogItemType.Course:
					return getCourseDetailRoutePath(this.id);
				case CatalogItemType.Product:
					return getProductDetailRoutePath(this.id);
			}
		},
		get typeDisplayName(): string {
			return typeDisplayNames[this.type];
		}
	};
}

function createDetailPhoto(
		responseDto: DetailPhotoResponseDto,
		asPlaceholder: boolean = false): DetailPhotoModel {
	let url: string = responseDto.url;
	if (asPlaceholder) {
		url = "https://placehold.co/800x600";
	}

	return {
		id: responseDto.id,
		url: url
	};
}

export {
	createBasic as createCatalogItemBasicModel,
	createDetail as createCatalogItemDetailModel,
	createDetailPhoto as createCatalogItemDetailPhotoModel
};