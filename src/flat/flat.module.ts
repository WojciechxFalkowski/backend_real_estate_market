import { Module } from '@nestjs/common';
import { FlatService } from './flat.service';
import { FlatController } from './flat.controller';
import { flatProvider } from './flat.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, CloudinaryModule],
  controllers: [FlatController],
  // exports: [FlatService],
  providers: [...flatProvider, FlatService],
})
export class FlatModule { }
