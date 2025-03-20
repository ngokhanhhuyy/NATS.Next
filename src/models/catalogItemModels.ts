import { CatalogItemType } from "@/enums/catalogItemType";
import {
    getServiceDetailRoutePath,
    getCourseDetailRoutePath,
    getProductDetailRoutePath } from "@/utils/routeUtils";

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
        thumbnailUrl: string;
        photos: CatalogItemDetailPhotoModel[];
        otherCatalogItems: CatalogItemBasicModel[];
        detailRoute: string;
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
    let thumbnailUrl = "https://placehold.co/512x512";
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
        otherCatalogItems: otherCatalogItemResponseDtos.map(dto => createBasic(dto)),
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