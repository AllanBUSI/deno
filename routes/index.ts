import { route } from "next/dist/next-server/server/router";

import { route } from "next/dist/next-server/server/router";

import { route } from "next/dist/next-server/server/router";

import { Router } from "https://deno.land/x/oak/mod.ts";

const route = new Router();

// général
route.get('/', home);
// auth
route.post('/register', register);
route.post('/login', login);
// user
route.put('/user', userPut);
route.delete('/user/off',userOff);
route.put('/cart', userCart);
route.delete('/user',userDelete);
// child
route.post('/user/child',userChildCreate);
route.delete('/user/child',userChildDelete);
route.get('/user/child',userChildAll);
// songs
route.get('/songs', songs);
route.getAll('/songs/:id', allSongs);
// subcription
route.put('subcription', subcription);

