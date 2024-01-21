import { Injectable } from '@nestjs/common';
import { EmailInput } from './email-input';
import { EmailData } from './email-data';

@Injectable()
export class EmailService {
  async sendEmail(data: EmailData): Promise<string> {
    //@TODO: implement email sending logic
    return new Promise((resolve) => {
      return resolve(`Email is sent to ${data.to} from ${data.from}`);
    });
  }

  async sendBugReportEmail(input: EmailInput): Promise<string> {
    const data: EmailData = {
      to: 'bug@qaexpert.io',
      html: input.text,
      ...input,
    };
    return await this.sendEmail(data);
  }

  async sendCommunicationEmail(input: EmailInput): Promise<string> {
    const data: EmailData = {
      to: 'info@qaexpert.io',
      html: input.text,
      ...input,
    };

    return await this.sendEmail(data);
  }
}
