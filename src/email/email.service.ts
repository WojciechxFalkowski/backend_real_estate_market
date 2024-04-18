import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
import { SettingsService } from 'src/settings/settings.service';
// import { SERVICE_TYPES } from './email.contracts';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class EmailService {
    // private transporter;

    constructor(private settingsService: SettingsService) { }

    async sendMail(email: string, phone: string, message: string): Promise<void> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const userSettings = await this.settingsService.getUserSettings(1);

        const msg = {
            to: userSettings.emailConfiguration.email,
            from: {
                name: 'Wojtek',
                email: userSettings.emailConfiguration.email,
            },
            subject: 'Wiadomość z formularza kontaktowego',
            text: `Od: ${email}\nNumer telefonu: ${phone}\nWiadomość: ${message}`,
        };

        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }

    }

    // async sendMail(email: string, phone: string, message: string): Promise<void> {
    //     const userSettings = await this.settingsService.getUserSettings(1);
    //     const serviceType = SERVICE_TYPES[userSettings.emailConfiguration.serviceType];

    //     console.log(email)
    //     console.log(SERVICE_TYPES[userSettings.emailConfiguration.serviceType])
    //     console.log(userSettings.emailConfiguration.email)
    //     console.log(userSettings.emailConfiguration.password)
    //     if (!serviceType) {
    //         throw new HttpException('Invalid service type', HttpStatus.CONFLICT);
    //     }

    //     this.transporter = nodemailer.createTransport({
    //         // outlook -> hotmail, gmail -> gmail
    //         // service: SERVICE_TYPES[userSettings.emailConfiguration.serviceType],
    //         // Konfiguracja transportu, np. SMTP
    //         // host: 'smtp.example.com',
    //         service: "hotmail",
    //         // host: "smtp-mail.outlook.com", // potem to smtp-mail.outlook.com
    //         port: 587,
    //         debug: true,
    //         logger: true,
    //         auth: {
    //             user: userSettings.emailConfiguration.email,
    //             pass: userSettings.emailConfiguration.password,
    //         },
    //         // tls: {
    //         //     ciphers:'SSLv3'
    //         // }
    //     });

    //     const mailOptions = {
    //         from: userSettings.emailConfiguration.email, // adres nadawcy
    //         to: userSettings.emailConfiguration.email, // lista odbiorców
    //         subject: 'Wiadomość z formularza kontaktowego', // temat
    //         text: `Od: ${email}\nNumer telefonu: ${phone}\nWiadomość: ${message}`, // treść wiadomości
    //         // html: '<b>Witaj</b>' // możesz również użyć HTML
    //     };

    //     await this.transporter.sendMail(mailOptions);
    // }
}
