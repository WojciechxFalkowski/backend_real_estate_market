export const HOME_CAROUSEL_IMAGE_REPOSITORY = 'HOME_CAROUSEL_IMAGE_REPOSITORY'
export const HOME_CAROUSEL_IMAGE_DIRECTORY_PATH = '/home_carousel'

export interface HomeCarouselResponse {
    id: number,
    order: number,
    publicId: string,
    url: string
    createdAt: Date
    updatedAt: Date
}