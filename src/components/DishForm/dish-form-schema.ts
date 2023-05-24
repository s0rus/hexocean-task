import { z } from 'zod';

const dishBaseSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, {
      message: 'Name is required',
    }),
  preparation_time: z
    .string({
      required_error: 'Preparation time is required',
    })
    .regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/, {
      message: 'Invalid time format. Use HH:MM:SS',
    })
    .refine((val) => {
      const [hours, minutes, seconds] = val.split(':').map(Number);
      return hours || minutes || seconds;
    }, 'Surely you cannot prepare a dish in less than a second... right?'),
  type: z.enum(['pizza', 'soup', 'sandwich'], {
    required_error: 'Dish type is required',
  }),
  no_of_slices: z.coerce.number().int().min(1).optional().or(z.literal('')),
  diameter: z.coerce.number().min(1).optional().or(z.literal('')),
  spiciness_scale: z.coerce.number().int().min(1).max(10).optional().or(z.literal('')),
  slices_of_bread: z.coerce.number().int().min(1).optional().or(z.literal('')),
});

export const dishFormSchema = dishBaseSchema.superRefine((schema, ctx) => {
  switch (schema.type) {
    case 'pizza':
      if (!schema.no_of_slices) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Number of slices is required',
          path: ['no_of_slices'],
        });
      }
      if (!schema.diameter) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Diameter is required',
          path: ['diameter'],
        });
      }
      break;
    case 'soup':
      if (!schema.spiciness_scale) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Spiciness scale is required',
          path: ['spiciness_scale'],
        });
      }
      break;
    case 'sandwich':
      if (!schema.slices_of_bread) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Slices of bread is required',
          path: ['slices_of_bread'],
        });
      }
      break;
    default:
      break;
  }
});

export type DishFormSchema = z.infer<typeof dishFormSchema>;

export const dishFormDefaultValues: Partial<DishFormSchema> = {
  name: '',
  preparation_time: '00:00:00',
  type: 'pizza',
  no_of_slices: '',
  diameter: '',
  slices_of_bread: '',
  spiciness_scale: '',
};

export const dishTypeOptions = Object.values(dishBaseSchema.shape.type.Values);
