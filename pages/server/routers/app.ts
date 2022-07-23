import { router } from '@trpc/server';
import { Context } from '../context';
import gameRouter from './game';

const appRouter = router<Context>().merge('game.', gameRouter);

export default appRouter;
