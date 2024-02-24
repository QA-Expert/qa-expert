import { Injectable, Logger } from '@nestjs/common';
import { EmailInput } from './email-input';
import { EmailData } from './email-data';
import { ConfigService } from '../config/config.service';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  #transporter: nodemailer.Transporter;

  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const options: SMTPTransport.Options = {
      host: this.configService.emailServiceUrl,
      port: Number(this.configService.emailServicePort),
      auth: {
        user: this.configService.emailServiceUsername,
        //password might have special chars that should be url encoded
        pass: encodeURI(this.configService.emailServicePassword),
      },
    };

    this.#transporter = nodemailer.createTransport(options);
  }

  async sendEmail(data: EmailData) {
    try {
      const input: Mail.Options = {
        to: data.to,
        // We have to have verified from address to be able to send emails
        // that is why I am specifying here address within verified in AWS SES domain
        from: 'api@qaexpert.io',
        // To be able to know how is sending us emails I specify replyTo
        replyTo: [data.from],
        subject: data.subject,
        html: data.html,
      };
      const result = await this.#transporter.sendMail(input);

      if (!result) {
        throw new Error('Email sending failed');
      }

      return result.messageId;
    } catch (error) {
      this.logger.error((error as Error).message);

      throw error;
    }
  }

  async sendBugReportEmail(input: EmailInput) {
    const data: EmailData = {
      to: 'bug@qaexpert.io',
      html: input.text,
      ...input,
    };

    return await this.sendEmail(data);
  }

  async sendCommunicationEmail(input: EmailInput) {
    const data: EmailData = {
      to: 'info@qaexpert.io',
      html: input.text,
      ...input,
    };

    return await this.sendEmail(data);
  }
}
