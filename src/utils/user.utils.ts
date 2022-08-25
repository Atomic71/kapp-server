import { BloodType } from '@prisma/client';
import { z } from 'zod';

export const bloodTypeSchema = z.nativeEnum(BloodType);
export const updateSchema = z.object({
  bloodType: bloodTypeSchema,
});

export type UpdateForm = z.infer<typeof updateSchema>;
