import { ConflictException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SettingsService } from 'src/settings/settings.service';
import { NEWSLETTER_REPOSITORY, SERVICE_TYPES } from './email.contracts';
import { AddToNewsletterListDto } from './dto/add-to-newsletter-list.dto';
import { Newsletter } from './entities/newsletter.entity';
import { Repository } from 'typeorm';
@Injectable()
export class EmailService {
    private transporter;

    constructor(private settingsService: SettingsService, @Inject(NEWSLETTER_REPOSITORY)
    private newsletterRepository: Repository<Newsletter>,) { }

    // async sendMail(email: string, phone: string, message: string): Promise<void> {
    //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //     const userSettings = await this.settingsService.getUserSettings(1);
    //     console.log(userSettings.emailConfiguration.email)
    //     console.log(email)
    //     const msg = {
    //         to: userSettings.emailConfiguration.email,
    //         from: {
    //             name: 'Wojtek',
    //             email: userSettings.emailConfiguration.email,
    //         },
    //         // from: {
    //         //     name: 'SendGrid',
    //         //     email: `no-reply@${userSettings.emailConfiguration.email}.com`
    //         // },
    //         subject: 'Wiadomość z formularza kontaktowego',
    //         text: `Od: ${email}\nNumer telefonu: ${phone}\nWiadomość: ${message}`,
    //     };

    //     try {
    //         await sgMail.send(msg);
    //     } catch (error) {
    //         console.log('error')
    //         console.error(error);

    //         if (error.response) {
    //             console.error(error.response.body)
    //         }
    //     }

    // }

    async sendMail(email: string, phone: string, message: string): Promise<void> {
        const userSettings = await this.settingsService.getUserSettings(1);
        const serviceType = SERVICE_TYPES[userSettings.emailConfiguration.serviceType];

        if (!serviceType) {
            throw new HttpException('Invalid service type', HttpStatus.CONFLICT);
        }

        this.transporter = nodemailer.createTransport({
            // outlook -> hotmail, gmail -> gmail
            service: SERVICE_TYPES[userSettings.emailConfiguration.serviceType],
            // Konfiguracja transportu, np. SMTP
            // host: 'smtp.example.com',
            // service: "hotmail",
            // host: "smtp-mail.outlook.com", // potem to smtp-mail.outlook.com
            port: 587,
            debug: true,
            logger: true,
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
            to: 'michal.krawczycki@outlook.com', // lista odbiorców
            subject: 'Wiadomość z formularza kontaktowego', // temat
            text: `Od: ${email}\nNumer telefonu: ${phone}\nWiadomość: ${message}`, // treść wiadomości
            // html: '<b>Witaj</b>' // możesz również użyć HTML
        };

        await this.transporter.sendMail(mailOptions);
    }

    public async addToNewsletterList(addToNewsletterListDto: AddToNewsletterListDto): Promise<void> {
        const newsletterInDatabase = await this.newsletterRepository.findOne({
            where: {
                email: addToNewsletterListDto.email
            }
        })
        if (newsletterInDatabase) {
            throw new ConflictException("Email jest już zapisany!");
        }
        const newsletterEntity = new Newsletter()
        newsletterEntity.email = addToNewsletterListDto.email
        await this.newsletterRepository.save(newsletterEntity)
    }

    public async getEmails() {
        return await this.newsletterRepository.find()
    }
}
