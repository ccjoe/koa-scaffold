import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('/dot', async (ctx, next) => {
  await ctx.render('dot', {foo: 'with doT'});
});

export default router;
