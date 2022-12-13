import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { NODE_ENV, ConfigurationVariables } from '@/common/consts/config';
import { validate } from './validate';

const YAML_CONFIG_FILENAME = 'configuration.yml';

export function getConfiguration() {
  let configuration: ConfigurationVariables;
  if (process.env.NODE_ENV !== NODE_ENV.production) {
    configuration = validate(
      load(
        readFileSync(
          join(__dirname, '../../../../../../', YAML_CONFIG_FILENAME),
          'utf8',
        ),
      ),
    );
  } else {
    configuration = validate(process.env);
  }
  return configuration;
}
