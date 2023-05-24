import { env } from '@/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Icons } from '../ui/icons';
import { FormattedTimeInput, Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';
import AdditionalFormFields from './additional-form-fields';
import { dishFormDefaultValues, dishFormSchema, dishTypeOptions, type DishFormSchema } from './dish-form-schema';
import { parseDishDataByType } from './helpers/parse-dish-data-by-type';

const handlePostDish = async (data: DishFormSchema) => {
  await fetch(`${env.VITE_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const DishForm = () => {
  const { toast } = useToast();
  const form = useForm<DishFormSchema>({
    resolver: zodResolver(dishFormSchema),
    defaultValues: dishFormDefaultValues,
  });

  const { mutate: postDish, isLoading } = useMutation({
    mutationFn: handlePostDish,
    onSuccess: () => {
      toast({
        title: 'Dish created',
        description: 'Your dish has been created successfully',
        duration: 5000,
      });
      form.reset(dishFormDefaultValues);
    },
  });

  const dishType = form.watch('type');

  const onSubmit = (data: DishFormSchema) => {
    const parsedData = parseDishDataByType(data);
    if (parsedData) {
      postDish(parsedData);
    } else {
      toast({
        title: 'Woops!',
        description: 'Something went wrong! Try again later.',
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, console.log)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='preparation_time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormattedTimeInput
                  {...field}
                  format='##:##:##'
                  mask={['H', 'H', 'M', 'M', 'S', 'S']}
                  placeholder='HH:MM:SS'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dish type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a dish type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dishTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <AdditionalFormFields dishType={dishType} />
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <Icons.loader className='mr-2 h-4 w-4 animate-spin' /> : <Icons.send className='mr-2 h-4 w-4' />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default DishForm;
