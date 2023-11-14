import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('email_host'),
      port: this.configService.get('email_port'),
      secure: false,
      auth: {
        user: this.configService.get('email_user'),
        pass: this.configService.get('email_password'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: this.configService.get('email_user'),
      },
      to,
      subject,
      html,
    });
  }
}
