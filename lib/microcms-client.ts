import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: '1b97z8ltrf', 
  apiKey: process.env.MICROCMS_API_KEY!,
});