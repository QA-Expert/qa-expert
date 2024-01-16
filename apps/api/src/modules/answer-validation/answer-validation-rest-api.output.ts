import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { KeyValuePair } from '../answers/answer-data-types';

export enum Status {
  BAD_REQUEST = 400,
  METHOD_NOT_ALLOWED = 405,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  OK = 200,
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Defines HTTP status codes',
});

@ObjectType()
export class AnswerValidationRestApiOutput {
  @IsNotEmpty()
  @Field(() => Number, { description: 'Status code' })
  status: Status;

  @IsOptional()
  @Field(() => [KeyValuePair], {
    description: 'Headers array',
    defaultValue: [],
  })
  headers?: KeyValuePair[];

  @IsNotEmpty()
  @Field(() => String, { description: 'Stringified JSON or just test' })
  body: string;
}
