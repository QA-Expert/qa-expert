import { Injectable } from '@nestjs/common';
import { PageProgressState } from '../page-progresses/page-progress.schema';

@Injectable()
export class AnswerValidationService {
  async isRestApiAnswerDataValid({
    data,
    context,
  }: {
    data: string | undefined;
    context: string;
  }): Promise<PageProgressState> {
    return new Promise((resolve, reject) => {
      if (!data) {
        return resolve(PageProgressState.FAIL);
      }

      try {
        const decodedData = JSON.parse(data);

        if (decodedData.body.someTestProp === 'test value') {
          return resolve(PageProgressState.PASS);
        } else {
          return resolve(PageProgressState.FAIL);
        }
      } catch (error) {
        return reject(
          new Error('Invalid data format, should be stringified JSON'),
        );
      }
    });
  }
}
