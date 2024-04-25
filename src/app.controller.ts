import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { generateInvoiceReceipt } from './receipt_templates/invoice';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRINT_QUEUE') private client: ClientProxy,
  ) {}

  @Post('/snap')
  async snap(
    @Body('encodedImageString') encodedImageString: string,
  ): Promise<boolean> {
    this.client.emit('print', generateInvoiceReceipt(encodedImageString));
    return true;
  }
}
