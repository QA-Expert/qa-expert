import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../users/user.decorator';
import { User, Roles as RolesEnum } from '../users/user.schema';
import { EmailService } from './email.service';
import { EmailInput } from './email-input';

@Resolver()
export class EmailResolver {
  constructor(private readonly service: EmailService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @Mutation(() => String)
  public async sendBugReport(
    @CurrentUser() user: User,
    @Args('data') data: EmailInput,
  ) {
    data.from = user.email;

    return await this.service.sendBugReportEmail(data);
  }

  @Roles(RolesEnum.USER)
  @Mutation(() => String)
  public async sendCommunication(@Args('data') data: EmailInput) {
    return await this.service.sendCommunicationEmail(data);
  }
}
