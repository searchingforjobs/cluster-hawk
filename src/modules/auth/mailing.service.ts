import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationLink(email: string, activationLink: string) {
    await this.mailerService
      .sendMail({
        to: email,
        from: 'waitinreply@gmail.com',
        subject: 'Account activation',
        text: 'Your activation link',
        html: `<b>${activationLink}</b>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
