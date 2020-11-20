import express from 'express';
import {
  paystackPostRequestProxyController,
  paystackGetRequestProxyController,
} from '../controllers/paystackProxyController';
import { paystackWebhookController } from '../controllers/paystackWebhookController';
const paystackProxyRoutes = express.Router();

//POST REQUEST HANDLER
paystackProxyRoutes.post(
  '/paystack-post-handler',
  paystackPostRequestProxyController
);

//GET REQUEST HANDLER
paystackProxyRoutes.post(
  '/paystack-get-handler',
  paystackGetRequestProxyController
);

//WEBHOOK ROUTE

//the full url will be http://localhost:5000/paystack/webhook in our paystack dashboard
paystackProxyRoutes.post('/paystack/webhook', paystackWebhookController);

export { paystackProxyRoutes };
