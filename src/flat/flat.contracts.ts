export const FLAT_REPOSITORY = 'FLAT_REPOSITORY'
export const FLAT_IMAGE_REPOSITORY = 'FLAT_IMAGE_REPOSITORY'

export interface FlatDetailResponse {
    id: string,
    title: string;
    description: string;
}

export interface FlatResponse {
    id: number;
    isActive: boolean;
    url: string;
    title: string;
    description: string;
    image?: string;
    flatDetails: FlatDetailResponse[];
    location: string;
    images: FlatImageResponse[] | null;
    price: string;
    currency: string;
    pricePerMeter: string;
    tiptapHTML: string
}

export interface FlatImageResponse {
    url: string,
    imageId: string,
    orderId: number,
}