class IndexControllers {
  async index(ctx, next) {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  }
}

module.exports = new IndexControllers()