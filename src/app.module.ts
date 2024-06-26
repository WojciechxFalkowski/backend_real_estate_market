import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { SettingsModule } from './settings/settings.module';
import { FlatModule } from './flat/flat.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FaqModule } from './faq/faq.module';
import { LeaseModule } from './lease/lease.module';
import { PageConfigurationModule } from './page-configuration/page-configuration.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { HomeCarouselImageModule } from './home-carousel-image/home-carousel-image.module';
import { VisitorModule } from './visitor/visitor.module';
import { AnalyticsEventsModule } from './analytics-events/analytics-events.module';
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true, cache: true, }), DatabaseModule, AuthModule, UserModule, EmailModule, SettingsModule, FlatModule, CloudinaryModule, FaqModule, LeaseModule, PageConfigurationModule, TeamMembersModule, HomeCarouselImageModule, VisitorModule, AnalyticsEventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
