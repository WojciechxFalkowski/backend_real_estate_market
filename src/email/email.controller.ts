import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/auth/constants';
import { AddToNewsletterListDto } from './dto/add-to-newsletter-list.dto';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) { }

    @Public()
    @Post()
    public async sendEmail(@Body() body: { email: string; phone: string; message: string }) {
        await this.emailService.sendMail(body.email, body.phone, body.message);
        return { message: 'Wiadomość została wysłana' }
    }

    @Get('/newsletter')
    public async getEmails() {
        return await this.emailService.getEmails()
    }

    @Public()
    @Post('/newsletter')
    public async addToNewsletterList(
        @Body() addToNewsletterListDto: AddToNewsletterListDto,
    ) {
        await this.emailService.addToNewsletterList(addToNewsletterListDto);
        return { message: `Email został dodany do newslettera` };
    }
}
