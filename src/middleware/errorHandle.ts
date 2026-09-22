import { Request, Response, NextFunction } from "express";

export class ErrorHandler {
  handle(error: any, req: Request, res: Response, next: NextFunction) {
    console.error(`[ERROR] ${req.method} ${req.url} - ${error.message}`);

    res.status(error.statusCode).json({
      message: error.message,
    });
  }
}
