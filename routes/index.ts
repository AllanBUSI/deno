import { Router } from "https://deno.land/x/oak/mod.ts";
import  UserController  from "../controller/UserController.ts";
import  AudioController  from "../controller/AudioController.ts";
import  AuthController  from "../controller/AuthController.ts";
import  AutreController  from "../controller/AutreController.ts";

const route = new Router();
const user = new UserController();
const audio = new AudioController();
const auth = new AuthController();
const autre = new AutreController();

// général
route.get('/', user.home);
// auth
route.post('/register', auth.register);
route.post('/login', auth.login);
// user
route.put('/user', user.userPut);
route.delete('/user/off',user.userOff);
route.put('/cart', user.userCart);
route.delete('/user',user.userDelete);
// child
route.post('/user/child',user.userChildCreate);
route.delete('/user/child',user.userChildDelete);
route.get('/user/child',user.userChildAll);
// songs
route.get('/songs', audio.songs);
route.get('/songs/:id', audio.allsongs);
// subcription
route.put('subcription', autre.subcription);
route.put('bills', autre.bills);

export default route;

