import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export enum Protocol {
  HTTPS = 'https',
  HTTP = 'http',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

registerEnumType(Protocol, {
  name: 'Protocol',
  description: 'Defines HTTP Protocol',
});

registerEnumType(Method, {
  name: 'Method',
  description: 'Defines HTTP method',
});

@InputType()
export class AnswerRestApiData {
  @IsNotEmpty()
  @Field(() => String, { description: 'Host' })
  host: string;

  @IsNotEmpty()
  @Field(() => Protocol, { description: 'Host' })
  protocol: string;

  @IsNotEmpty()
  @Field(() => Method, { description: 'Method' })
  method: Method;

  @IsArray()
  @Field(() => [KeyValuePair], {
    description: 'Headers array',
    defaultValue: [],
  })
  headers: KeyValuePair[];

  @IsArray()
  @Field(() => [KeyValuePair], {
    description: 'Params array',
    defaultValue: [],
  })
  params: KeyValuePair[];

  @IsOptional()
  @Field(() => String, { description: 'Stringified JSON or just test' })
  body?: string;
}

@ObjectType()
export class KeyValuePair {
  @Field(() => String)
  name: string;

  @Field(() => String)
  value: string | number;
}
