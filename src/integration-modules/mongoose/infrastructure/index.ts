import { MONGOOSE_ADAPTER_PUBLIC_TYPES } from './config/types';
import { mongooseContainer } from './config/container';

// eslint-disable-next-line @typescript-eslint/typedef
export const mongooseInfrastructure = {
  config: {
    container: mongooseContainer,
    types: MONGOOSE_ADAPTER_PUBLIC_TYPES,
  },
};
