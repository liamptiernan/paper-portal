import { createFormContext } from '@mantine/form';
import { AdPurchase } from './types';

export const [AdPurchaseFormProvider, useAdPurchaseFormContext, useAdPurchaseForm] =
  createFormContext<AdPurchase>();