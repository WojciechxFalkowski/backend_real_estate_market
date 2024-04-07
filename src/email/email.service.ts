import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SettingsService } from 'src/settings/settings.service';
import { SERVICE_TYPES } from './email.contracts';

@Injectable()
export class EmailService {
    private transporter;

    constructor(private settingsService: SettingsService) { }

    async sendMail(email: string, phone: string, message: string): Promise<void> {
        const userSettings = await this.settingsService.getUserSettings(1);
        const serviceType = SERVICE_TYPES[userSettings.emailConfiguration.serviceType];

        console.log(email)
        console.log(SERVICE_TYPES[userSettings.emailConfiguration.serviceType])
        console.log(userSettings.emailConfiguration.email)
        console.log(userSettings.emailConfiguration.password)
        if (!serviceType) {
            throw new HttpException('Invalid service type', HttpStatus.CONFLICT);
        }

        this.transporter = nodemailer.createTransport({
            // outlook -> hotmail, gmail -> gmail
            // service: SERVICE_TYPES[userSettings.emailConfiguration.serviceType],
            // Konfiguracja transportu, np. SMTP
            // host: 'smtp.example.com',
            service: "Outlook365",
            host: "smtp.office365.com",
            port: 587,
            //secure: false, // true dla portu 465, false dla innych portów
            auth: {
                user: userSettings.emailConfiguration.email,
                pass: userSettings.emailConfiguration.password,
            },
            // tls: {
            //     ciphers:'SSLv3'
            // }
        });

        const mailOptions = {
            from: userSettings.emailConfiguration.email, // adres nadawcy
            to: userSettings.emailConfiguration.email, // lista odbiorców
            subject: 'Wiadomość z formularza kontaktowego', // temat
            text: `Od: ${email}\nNumer telefonu: ${phone}\nWiadomość: ${message}`, // treść wiadomości
            // html: '<b>Witaj</b>' // możesz również użyć HTML
        };

        await this.transporter.sendMail(mailOptions);
    }
}
