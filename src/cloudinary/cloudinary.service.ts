import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { ConfigService } from '@nestjs/config';
import { CLOUDINARY_DIRECTORY_NAME } from 'src/config/configuration';
@Injectable()
// https://medium.com/codex/how-to-upload-images-to-cloudinary-using-nestjs-9f496460e8d7
// DOCS https://cloudinary.com/documentation/admin_api#get_resources
export class CloudinaryService {

  constructor(private configSerivce: ConfigService) { }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ folder: this.configSerivce.get(CLOUDINARY_DIRECTORY_NAME) }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.uploadImage(file).catch((e) => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async fetchImageDetails(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.resource(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    let status = '';
    let deletedCount = 0;
    await v2.api
      .delete_resources([publicId])
      .then((res) => {
        status = res.deleted[publicId];
        const countObject = res.deleted_counts[publicId];
        deletedCount = countObject.original + countObject.derived;
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong.');
      });

    if (status === 'not_found' && deletedCount === 0) {
      throw new NotFoundException(
        'Deletion failed: Specified image does not exist.',
      );
    }

    return;
  }

  async fetchImageFromCloudinary(
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await this.fetchImageDetails(publicId).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }
}
