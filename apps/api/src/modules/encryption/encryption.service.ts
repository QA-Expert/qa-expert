import crypto from 'crypto';
import { ConfigService } from '../config/config.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  // Generate secret hash with crypto to use for encryption
  key = crypto
    .createHash('sha512')
    .update(this.configService.billingSecretKey)
    .digest('hex')
    .substring(0, 32);

  encryptionIV = crypto
    .createHash('sha512')
    .update(this.configService.billingSecretIv)
    .digest('hex')
    .substring(0, 16);

  /**
   *
   * @description Encrypt data
   */
  encryptData(data: string) {
    const cipher = crypto.createCipheriv(
      this.configService.billingEncryptionMethod,
      this.key,
      this.encryptionIV,
    );

    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64'); // Encrypts data and converts to hex and base64
  }

  /**
   *
   * @description Decrypt data
   */
  decryptData(data: string) {
    const buff = Buffer.from(data, 'base64');
    const decipher = crypto.createDecipheriv(
      this.configService.billingEncryptionMethod,
      this.key,
      this.encryptionIV,
    );

    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    ); // Decrypts data and converts to utf8
  }
}
