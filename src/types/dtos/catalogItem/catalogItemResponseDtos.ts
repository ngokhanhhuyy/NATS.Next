import { CatalogItemType } from "@/enums/catalogItemType";

declare global {
    type CatalogItemResponseDto = {
        id: number;
        name: string;
        type: CatalogItemType;
        summary: string;
        thumbnailUrl: string | null;
    }
}

export { };