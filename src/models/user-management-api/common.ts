import {z} from 'zod';

const IsoTimestamp = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
const BooleanString = z.union([z.literal('false'), z.literal('true')]);

const OptionalIsoTimestamp = IsoTimestamp.optional().nullable();
const OptionalBooleanString = BooleanString.optional().nullable();
const UserRole = z.object({
  role: z.string().trim().min(1),
  organisation_code: z.string().trim().optional().nullable(),
  collection: z.string().trim().optional().nullable(),
});

type TUserRole = z.infer<typeof UserRole>;

export {IsoTimestamp, BooleanString, OptionalIsoTimestamp, OptionalBooleanString, UserRole};
export type {TUserRole};
