import { QueryClient, QueryClientProvider } from 'react-query';
import DishForm from './components/DishForm/dish-form';
import Header from './components/Header/header';
import { Toaster } from './components/Toaster/Toaster';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='w-screen h-screen pt-4'>
        <div className='container'>
          <Header />
          <DishForm />
        </div>
      </main>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
