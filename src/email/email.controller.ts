import { Controller, Post, Body, Request } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/auth/constants';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) { }

    @Public()
    @Post()
    async sendEmail(@Body() body: { email: string; phone: string; message: string }) {
        await this.emailService.sendMail(body.email, body.phone, body.message);
        return { message: 'Wiadomość została wysłana' }
    }
}
