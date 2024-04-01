import { Injectable, Inject } from '@nestjs/common';
import { SETTINGS_REPOSITORY, IUserSettings, SETTING_KEYS, SETTING_VALUES, IEmailConfiguration } from './settings.contracts';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
    @Inject(SETTINGS_REPOSITORY)
    private settingsRepository: Repository<Setting>

    public async getUserSettings(userId: number): Promise<Partial<IUserSettings>> {
        const userSetting = await this.settingsRepository.find({ where: { userId } })

        const flattenedObject = userSetting.reduce((acc, currentObject) => {
            return { ...acc, ...currentObject.value };
        }, {});

        return flattenedObject
    }

    public async getSettingColumnValue<T>(userId: number, key: SETTING_KEYS): Promise<T> {
        const userSetting = await this.settingsRepository.findOne({ where: { userId, key } });
        return userSetting.value
    }

    public async updateSetting<T>(dbKeyColumnValue: SETTING_KEYS, userId: number, dbValueColumnKey: string, dbValueColumnValue: unknown): Promise<T> {
        if (!Object.values(SETTING_KEYS).includes(dbKeyColumnValue)) {
            throw new Error('Invalid setting key column');
        }

        if (!Object.values(SETTING_VALUES).includes(dbValueColumnKey)) {
            throw new Error('Invalid setting value column (key)');
        }

        const existingSetting = await this.settingsRepository.findOne({
            where: { userId, key: dbKeyColumnValue }
        });

        if (existingSetting) {
            // Aktualizacja istniejącego ustawienia
            existingSetting.value = { [dbValueColumnKey]: dbValueColumnValue };
            await this.settingsRepository.save(existingSetting);
        } else {
            // Tworzenie nowego ustawienia
            const newSetting = this.settingsRepository.create({
                key: dbKeyColumnValue,
                value: { [dbValueColumnKey]: dbValueColumnValue },
                userId
            });
            await this.settingsRepository.save(newSetting);
        }

        return await this.getSettingColumnValue<T>(userId, dbKeyColumnValue);
    }

    public async getEmailConfiguration(userId: number) {
        const userSettings = await this.getUserSettings(userId);
        if (!userSettings.emailConfiguration) {
            return {}
        }
        const { password, ...emailConfiguration } = userSettings.emailConfiguration;
        return emailConfiguration
    }
}
