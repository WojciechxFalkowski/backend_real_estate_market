export const SETTINGS_REPOSITORY = 'SETTINGS_REPOSITORY'

export interface ITimeTrack {
	isTimeTrack: boolean
}

export interface ITimeBetweenQuestions {
	timeBetweenQuestions: number
}

export interface IQuestionAmountInGame {
	questionAmountInGame: number
}

export interface IEmailConfiguration {
	emailConfiguration: {
		email: string
		password: string
		serviceType: string
	}
}

export interface ISettings {

}

export interface IUserSettings extends ITimeTrack, ITimeBetweenQuestions, IQuestionAmountInGame, IEmailConfiguration {

}

export enum SETTING_KEYS {
	TIME_TRACK = 'timeTrack',
	EMAIL_CONFIGURATION = 'emailConfiguration'
}

export const SETTING_VALUES = {
	[SETTING_KEYS.TIME_TRACK]: 'isTimeTrack',
	[SETTING_KEYS.EMAIL_CONFIGURATION]: SETTING_KEYS.EMAIL_CONFIGURATION
}

