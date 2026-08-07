import type { Context, Next } from "hono";

export function asyncHandler(
  handler: (c: any) => Promise<any>
) {
  return async (c: Context, next: Next) => {
    try {
      return await handler(c);
    } catch (error) {
      console.error(error);

      return c.json(
        {
          message: "Error interno del servidor"
        },
        500
      );
    }
  };
}