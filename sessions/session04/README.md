Introduction to middlewares in express

middleware anatomy:

const m = (req,res,next) => {
    // do something

    //next middleware:
    next()
}

added a middleware with app.use(m)
added a middleware with app.get("/" , m , controller.get);
warning: not explained routes nor route level middleware

repo: https://github.com/yurigo/PI2-2526-spotify-wip

---

Introduction to PRO web development:

Hello astro.build
npm create astro@latest

Basic Frontend to consume the api

Hello tailwind
npm i tailwindcss @tailwindcss/vite

repo: https://github.com/yurigo/PI2-2526-astro-wip


