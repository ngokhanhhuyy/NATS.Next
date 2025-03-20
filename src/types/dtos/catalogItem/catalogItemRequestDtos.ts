declare global {
    type CatalogItemUpsertRequestDto = {
        name: string;
        summary: string;
        detail: string;
        thumbnailFile: string | null;
        thumbnailChanged: boolean;
        photos: CatalogItemUpsertPhotoRequestDto[];
    };

    type CatalogItemUpsertPhotoRequestDto = {
        id: number | null;
        file: string;
        isDeleted: boolean;
    }
}

export { };