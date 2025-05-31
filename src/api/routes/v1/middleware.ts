import type { Request, RequestHandler, Response } from "express";
import type z from "zod";

export const validate = <ParamsZod extends z.ZodType, BodyZod extends z.ZodType, QueryZod extends z.ZodType>(
  validators: {
    params?: ParamsZod;
    body?: BodyZod;
    query?: QueryZod;
  },
  callback: (
    req: Request<z.output<ParamsZod>, unknown, z.output<BodyZod>, z.output<QueryZod>>,
    res: Response,
  ) => Response | Promise<Response> | Promise<void>,
): RequestHandler<z.output<ParamsZod>, unknown, z.output<BodyZod>, z.output<QueryZod>> => {
  return async (req, res, next) => {
    try {
      validators.params?.parse(req.params);
      validators.body?.parse(req.body);
      validators.query?.parse(req.query);
      await callback(req, res);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  };
};
