import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormattedFloatInput, Input } from '../ui/input';
import { DishFormSchema } from './dish-form-schema';

interface AdditionalFormFieldsProps {
  dishType: DishFormSchema['type'];
  isLoading?: boolean;
}

const AdditionalFormFields = ({ dishType, isLoading }: AdditionalFormFieldsProps) => {
  const form = useFormContext<DishFormSchema>();

  switch (dishType) {
    case 'pizza':
      return (
        <>
          <FormField
            control={form.control}
            name='no_of_slices'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of slices</FormLabel>
                <FormControl>
                  <Input {...field} type='number' disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='diameter'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diameter</FormLabel>
                <FormControl>
                  <FormattedFloatInput {...field} decimalScale={2} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    case 'soup':
      return (
        <FormField
          control={form.control}
          name='spiciness_scale'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spiciness scale (1-10)</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case 'sandwich':
      return (
        <FormField
          control={form.control}
          name='slices_of_bread'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slices of bread</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    default:
      return null;
  }
};

export default AdditionalFormFields;
