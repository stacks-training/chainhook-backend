import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { StacksPayload } from '@hirosystems/chainhook-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  chainhook(@Body() payload: any): any {
    let stacksPayload: StacksPayload = payload;

    let { apply, chainhook, rollback } = stacksPayload;
    let { timestamp, transactions } = apply[0];
    let { transaction_identifier, metadata } = transactions[0];
    let { success, sender, kind } = metadata;

    console.log('=> chainhook received:', {
      apply,
      transactions,
      success
    })

    return 'ok';
  }
}
