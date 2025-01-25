import { z } from 'zod';

export const schema = z.object({
  category: z
    .array(
      z.object({
        title: z.string().min(1, 'Title is required'),
        fields: z
          .array(
            z.object({
              title: z.string().min(1, 'Field title is required'),
              value: z.union([
                z.array(z.any()).min(1),
                z.string().min(1, 'Field value must be a non-empty string'),
              ]),
            })
          )
          .min(1, 'Each category must have at least one field'),
      })
    )
    .min(1, 'There must be at least one category'),
});

export type FormTypeCreateProfile = z.infer<typeof schema>;
