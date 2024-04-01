import { Body, Controller, Put, Request, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { IEmailConfiguration, IUserSettings, SETTING_KEYS, SETTING_VALUES } from './settings.contracts';
import { EmailConfigurationDto } from './dto/email-configuration.dto';

@Controller('settings')
export class SettingsController {
    constructor(private settingService: SettingsService) { }

    @Get('/getUserSettings')
    async getUserSettings(
        @Request() req,
    ): Promise<Partial<IUserSettings>> {
        return await this.settingService.getUserSettings(req.user.userId);
    }

    @Put('/saveEmailConfiguration')
    async saveEmail(@Body() emailConfigurationDto: EmailConfigurationDto, @Request() req,) {
        const { email, password, serviceType } = emailConfigurationDto;
        return await this.settingService.updateSetting<IEmailConfiguration>(SETTING_KEYS.EMAIL_CONFIGURATION, req.user.userId, SETTING_VALUES[SETTING_KEYS.EMAIL_CONFIGURATION], { email, password, serviceType });
    }

    @Get('/getEmailConfiguration')
    async getEmailConfiguration(
        @Request() req,
    ) {
        return await this.settingService.getEmailConfiguration(req.user.userId);
    }
}
