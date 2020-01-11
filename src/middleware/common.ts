import { NextFunction, Request, Response, Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import parser from 'body-parser';

export const handleCors = (router: Router) => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const requestLog = (router: Router) => {
  //Log when recieved requests and catch 404 and forward to error handler.
  router.use((req: Request, res: Response, next: NextFunction)=>{
    console.log(`${req.method} requests for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
  });
}
