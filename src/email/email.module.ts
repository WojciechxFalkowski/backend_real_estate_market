import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
    imports: [SettingsModule],
    providers: [EmailService],
    exports: [EmailService],
    controllers: [EmailController],
})
export class EmailModule { }
