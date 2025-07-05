import { date, number, object, string } from 'yup';

const validation = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email('Please enter valid email'),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});


export { validation };
