import { Middleware } from '../middleware/index.ts';
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
const userM = new Middleware();

// général
route.get('/', user.home);
// auth
route.post('/register', auth.register);
route.post('/login', auth.login);
// user
route.put('/user',userM.userMiddleware, user.userUpDate);
route.delete('/user',userM.userMiddleware,user.userDelete);
route.delete('/user/off',user.userOff);
route.put('/cart', user.userCart);
// child
route.post('/user/child',userM.userMiddleware,user.userAddChild);
route.delete('/user/child',user.userChildDelete);
route.get('/user/child',user.userChildAll);
// songs
route.get('/songs', audio.allsongs);
route.get('/songs/:id', audio.songs);
// subcription
route.put('/subcription', autre.subcription);
route.put('/bills', autre.bills);

export default route;

