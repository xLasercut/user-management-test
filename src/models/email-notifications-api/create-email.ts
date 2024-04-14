import {z} from 'zod';

const CreateEmailRequestBody = z.object({
  subject: z.string().trim().min(1),
  to_address: z.array(z.string().trim().min(1)).min(1),
  template: z.string().trim().min(1),
});

type TCreateEmailRequestBody = z.infer<typeof CreateEmailRequestBody>;

export {CreateEmailRequestBody};
export type {TCreateEmailRequestBody};
