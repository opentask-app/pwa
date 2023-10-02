import { z } from 'zod';

export const createProjectSchema = z.object({
  /*
   * Nullable fields for ease of compatibility with prisma results.
   */
  name: z
    .string({
      required_error: 'The project name is required.',
      invalid_type_error: 'The project name must be a string.',
    })
    .min(1, { message: 'The project name is required.' })
    .max(500, { message: 'The project name must be 500 characters long or shorter.' }),

  description: z.string().max(500).optional().nullable(),
  isArchived: z.boolean().optional(),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z
    .string({
      required_error: 'Cannot update a project without its id.',
      invalid_type_error: 'The project id must be a string.',
    })
    .cuid2({ message: 'Invalid project ID.' }),
});
