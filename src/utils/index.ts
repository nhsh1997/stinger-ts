import {Router, Response, Request, NextFunction} from 'express';

type Wrapper = ((router: Router)=> void);

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  for (const f of middleware){
    f(router);
  }
};

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler;
}

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes){
    const { path, method, handler } = route;
    (router as any)[method](path, handler);
  }
};
