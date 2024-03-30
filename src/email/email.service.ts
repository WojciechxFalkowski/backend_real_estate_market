import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            //gmail
            service: 'gmail',
            //outlook
            // service: 'hotmail',

            // Konfiguracja transportu, np. SMTP
            // host: 'smtp.example.com',
            // port: 587,
            //secure: false, // true dla portu 465, false dla innych portów
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            },
        });
    }

    async sendMail(email: string, phone: string, message: string): Promise<void> {
        console.log('email', email)
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: process.env.AUTH_EMAIL, // lista odbiorców
            subject: 'Wiadomość z formularza kontaktowego', // temat
            text: `Od: ${email}\nNumer telefonu: ${phone}\nWiadomość: ${message}`, // treść wiadomości
            // html: '<b>Witaj</b>' // możesz również użyć HTML
        };

        await this.transporter.sendMail(mailOptions);
    }
}
