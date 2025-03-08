import { validateOrReject } from 'class-validator'

export const validateInput = async (input: object): Promise<void> => {
  try {
    return await validateOrReject(input);
  } catch (errors) {
    throw new Error('Validation failed, please check your input. Errors: ', errors);
  }
}