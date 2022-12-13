import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { ConfigurationVariables } from '@/common/consts/config';

export function validate(
  config: Record<string, unknown>,
): ConfigurationVariables {
  const configPlace =
    'Check the configuration.yml file in the project root if you are a developer, ' +
    'or docker-compose.yaml if the service is deployed via docker.';

  if (!config) {
    throw new Error(`The application is not configured. ${configPlace}`);
  }

  const validatedConfig: ConfigurationVariables = plainToInstance(
    ConfigurationVariables,
    config,
    {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    },
  );

  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Error initializing environment application variables. ${configPlace} ${errors.toString()}`,
    );
  }

  return validatedConfig;
}
