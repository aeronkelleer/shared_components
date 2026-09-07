import type { ZodType } from 'zod';

export const validateFormField = <TForm extends object, TSchema extends ZodType>(
  field: keyof TForm,
  formData: TForm,
  schema: TSchema,
) => {
  const result = schema.safeParse(formData);

  if (result.success) return '';

  const fieldError = result.error.issues.find((issue) => issue.path[0] === field);

  return fieldError ? fieldError.message : '';
};
