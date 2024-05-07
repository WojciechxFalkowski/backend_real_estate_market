import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { SettingsModule } from 'src/settings/settings.module';
import { emailProviders } from './email.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, SettingsModule],
    exports: [EmailService],
    controllers: [EmailController],
    providers: [...emailProviders, EmailService],
})
export class EmailModule { }
