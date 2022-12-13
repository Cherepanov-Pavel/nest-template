import { Module, Logger } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '../global/config/config.module';
import { V1Module } from '../local/v1/v1.module';
import { ExceptionLoggerFilter } from '../../exception-filters/global/exception-logger.filter';
import { RequestLoggerInterceptor } from '../../interceptors/global/request-logger.interceptor';

@Module({
  imports: [ConfigModule, V1Module],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionLoggerFilter,
    },
  ],
})
export class RootModule {}
