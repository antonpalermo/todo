import { object, z } from "zod";

const message = {
  SERVER: "Oops! We're unable to process your request right now.",
  UNAUTHORIZED: "Oops! You're not authorized to access this resource."
};

export function toErrorMap(error: z.ZodError) {
  return error.errors.map(e => ({ field: e.path[0], message: e.message }));
}

type FormErrors = {
  field: any;
  message: string;
};

export class FormBadRequestError extends Error {
  errors: FormErrors[];

  constructor(message: string, errors: FormErrors[]) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, FormBadRequestError.prototype);
  }

  getErrors(): FormErrors[] {
    return this.errors;
  }
}

const defaultObject = { message, toErrorMap };

export default defaultObject;
