import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly npm_package_name;
  private readonly npm_package_version;

  constructor(
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();

    const now = Date.now();

    return next.handle().pipe(
      tap((data) => {
        if (!(res.statusCode < 400)) return;

        const { npm_package_name, npm_package_version } = this;
        const { method, originalUrl, headers, body, params } = req;
        const { statusCode } = res;

        this.logger.log({
          message: {
            npm_package_name,
            npm_package_version,
            req: {
              method,
              originalUrl,
              headers,
              body,
              params,
            },
            res: {
              statusCode,
              data,
            },
            duration: Date.now() - now,
          },
        });
      }),
    );
  }
}
