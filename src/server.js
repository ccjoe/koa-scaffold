import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import convert from 'koa-convert';
import serve from 'koa-static';
import finalHandler from './lib/middlewares/finalHandler';
import forwardForSOA from './lib/middlewares/forward';
import router from './router';
import dot from 'doT';
import path from 'path'

const app = new Koa();

app.use(finalHandler());
app.use(views(path.join(`${__dirname}`, '..', '/views'), {
  map: { html: 'dot'},
  default: "dot"
}));
app.use(logger());
app.use(bodyParser());
app.keys = ['some secret hurr'];
app.use(convert(session(app)));
app.use(serve(__dirname + '/public'));
app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
