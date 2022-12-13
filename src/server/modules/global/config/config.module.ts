import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from '@nestjs/config';
import { getConfiguration } from './utils';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      load: [getConfiguration],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class ConfigModule {}
