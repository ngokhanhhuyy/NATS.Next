import { CatalogItemType } from "@/enums/catalogItemType";

declare global {
    type CatalogItemBasicModel = {
        id: number;
        name: string;
        type: CatalogItemType;
        summary: string;
        thumbnailUrl: string;
    };

    type CatalogItemDetailModel = {
        id: number;
        name: string;
        type: CatalogItemType;
        summary: string;
        detail: string;
        thumbnailUrl: string;
        photos: CatalogItemDetailPhotoModel[];
        otherCatalogItems: CatalogItemBasicModel[];
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

function createBasic(responseDto: BasicResponseDto): BasicModel {
    return {
        id: responseDto.id,
        name: responseDto.name,
        type: responseDto.type,
        summary: responseDto.summary,
        thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/512x512"
    };
}

function createDetail(
        detailResponseDto: DetailResponseDto,
        otherCatalogItemResponseDtos: BasicResponseDto[]): DetailModel {
    return {
        id: detailResponseDto.id,
        name: detailResponseDto.name,
        type: detailResponseDto.type,
        summary: detailResponseDto.summary,
        detail: detailResponseDto.detail,
        thumbnailUrl: detailResponseDto.thumbnailUrl ?? "https://placehold.co/512x512",
        photos: detailResponseDto.photos.map(dto => createDetailPhoto(dto)),
        otherCatalogItems: otherCatalogItemResponseDtos.map(dto => createBasic(dto))
    };
}

function createDetailPhoto(responseDto: DetailPhotoResponseDto): DetailPhotoModel {
    return {
        id: responseDto.id,
        url: responseDto.url
    };
}

export {
    createBasic as createCatalogItemBasicModel,
    createDetail as createCatalogItemDetailModel,
    createDetailPhoto as createCatalogItemDetailPhotoModel
};