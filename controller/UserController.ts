import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";
import  UserDB  from "../db/UserDB.ts";

import { getToken } from "../Utils/Token.ts";

export default class UserController {

    async home({ request, response }: Context) {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userUpDate({ request, response }: Context) {
        // Appal le body 
        const data: any = await request.body()
        // verifi le body 
        let updateUser:any = {};
        // recupere les data dans le body 
        for (const [key, value] of await data.value) {
          updateUser[key] = value;
        }
        //recuperation des data du user
        const authorization = request.headers.get("authorization");
        if(authorization){
           
        const token = await getToken(authorization);

        const user = await new UserDB().findByEmail(token.email);
        if (user) {
          user.firstname = updateUser.firstname ? updateUser.firstname : user.firstname;
          user.lastname = updateUser.lastname ? updateUser.lastname : user.lastname;
          user.dateNaissance = updateUser.dateNaissance ? updateUser.dateNaissance : user.dateNaissance;
          user.sexe = updateUser.sexe ? updateUser.sexe : user.sexe;
        //udpate en fonction des data reçus
        await new UserDB().updateOne(user.email, user);
        response.status = 200;
        response.body = {
          "error": false,
          "message": "Vos données ont été mises à jour",
          };
        }
        }
    }

    async userOff({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userCart({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userDelete({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userChildCreate({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userChildDelete({ request, response }: Context) {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userChildAll({ request, response }: Context) {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }
}