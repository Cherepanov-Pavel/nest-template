import { IsEnum, IsNumber, IsOptional, IsString, } from 'class-validator';
import { Expose } from 'class-transformer'

export enum NODE_ENV {
  development = 'development',
  production = 'production',
}

export class ConfigurationVariables {
  @Expose()
  @IsEnum(NODE_ENV, {
    message: `the property must have one of the following values: [${Object.values(
      NODE_ENV,
    )}]`,
  })
  @IsOptional()
  NODE_ENV?: NODE_ENV;

  @Expose()
  @IsNumber()
  PORT: number;

  @Expose()
  @IsString()
  @IsOptional()
  UTC_OFFSET: string;
}
