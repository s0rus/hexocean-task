import type { DishFormSchema } from '../dish-form-schema';

export const parseDishDataByType = (data: DishFormSchema) => {
  const { diameter, no_of_slices, slices_of_bread, spiciness_scale, ...baseData } = data;

  switch (data.type) {
    case 'pizza':
      return {
        ...baseData,
        diameter,
        no_of_slices,
      };
    case 'soup':
      return {
        ...baseData,
        spiciness_scale,
      };
    case 'sandwich':
      return {
        ...baseData,
        slices_of_bread,
      };
    default:
      console.error('Unknown dish type');
      break;
  }
};
