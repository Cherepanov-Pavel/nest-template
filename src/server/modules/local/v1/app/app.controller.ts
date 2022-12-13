import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: '1',
  path: 'app',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppConfig(): Record<string, any> {
    return this.appService.getAppConfig();
  }
}
