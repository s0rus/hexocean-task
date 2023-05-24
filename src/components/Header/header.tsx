import { Separator } from '../ui/separator';

const Header = () => {
  return (
    <div>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Hexocean task.</h1>
      <p className='text-lg text-muted-foreground mt-1'>
        Created by{' '}
        <a
          href='https://www.devsor.us/'
          className='underline-offset-4 hover:underline text-primary'
          target='_blank'
          rel='norefferer noopener'
        >
          @Piotr Mól
        </a>{' '}
        using{' '}
        <a
          href='https://ui.shadcn.com/docs'
          className='underline-offset-4 hover:underline text-primary'
          target='_blank'
          rel='norefferer noopener'
        >
          shadcn's
        </a>{' '}
        beautiful components. The code is on{' '}
        <a
          href='https://github.com/s0rus/hexocean-task'
          className='underline-offset-4 hover:underline text-primary'
          target='_blank'
          rel='norefferer noopener'
        >
          github
        </a>
        .
      </p>
      <Separator className='my-4' />
    </div>
  );
};

export default Header;
