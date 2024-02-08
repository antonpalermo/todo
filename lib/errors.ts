import { z } from "zod";

const message = {
  SERVER: "Oops! We're unable to process your request right now.",
  UNAUTHORIZED: "Oops! You're not authorized to access this resource."
};

export function toErrorMap(error: z.ZodError) {
  return error.errors.map(e => ({ field: e.path[0], message: e.message }));
}

export default { message, toErrorMap };
