import {Request, Response} from 'express';

const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`../../config/environments/${ENV}`).default;
import { getMeaningByWord } from "./SearchController";
import { sendMessage } from './providers/FBMessagingProvider';
export default [
  {
    path: "/webhook",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const entries = req.body.entry;
      console.log(JSON.stringify(req.body));
      for (let entry of entries) {
        let messaging = entry.messaging;
        for (let message of messaging) {
          let senderId = message.sender.id;
          console.log(senderId);
          if (message.message) {
            // If user send text
            if (message.message.text) {
              let text = message.message.text;
              const meanings = await getMeaningByWord(text);
              await Promise.all(meanings.map( async (meaning: string ) => {
                await sendMessage(senderId, meaning);
              }));
            }
          }
        }
      }

      res.status(200).send("OK");
    }
  },
  {
    path: "/webhook",
    method: "get",
    handler: async (req: Request, res: Response) => {
      // Your verify token. Should be a random string.
      let VERIFY_TOKEN = envConfig.webhook.verify_token;

      // Parse the query params
      let mode = req.query['hub.mode'];
      let token = req.query['hub.verify_token'];
      let challenge = req.query['hub.challenge'];

      // Checks if a token and mode is in the query string of the request
      if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

          // Responds with the challenge token from the request
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(challenge);

        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          res.sendStatus(403);
        }
      }
    }
  },
  {
    path: "/test/:word",
    method: "get",
    handler: async (req: Request, res: Response) => {
      const word = req.params.word;
      console.log(word);
      const meanings = await getMeaningByWord(word);
      const results = await Promise.all(meanings.map( async (meaning: string ) => {
        return await sendMessage("100003051757638", meaning);
      }));
      console.log(results);
      console.log(meanings);
      res.status(200).json(meanings);
    }
  },
]
