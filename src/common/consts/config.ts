import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum NODE_ENV {
  development = 'development',
  production = 'production',
}

export class ConfigurationVariables {
  @IsEnum(NODE_ENV, {
    message: `the property must have one of the following values: [${Object.values(
      NODE_ENV,
    )}]`,
  })
  @IsOptional()
  NODE_ENV?: NODE_ENV;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsOptional()
  UTC_OFFSET: string;
}
