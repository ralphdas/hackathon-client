import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PRINT_QUEUE',
      useFactory: (configService: ConfigService) => {
        const rabbitMqServer = configService.get<string>('RABBIT_MQ_SERVER');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbitMqServer],
            queue: 'ticket_printer_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
