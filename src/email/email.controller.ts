import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) { }

    @Post()
    async sendEmail(@Body() body: { email: string; phone: string; message: string }) {
        await this.emailService.sendMail(body.email, body.phone, body.message);
        return { message: 'Wiadomość została wysłana' }
    }
}
