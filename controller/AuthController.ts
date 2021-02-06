import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";    
import {
    dateNaissanceValidation,
    emailValidation,
    formatDateNaissance,
  } from "../helper/index.ts";
  import { UserModels } from "../model/UserModel.ts";
  import UserDB from "../db/UserDB.ts";
  import { createToken } from "../utils/token.ts";

export default class AuthController {


      
      /**
       * REGISTER
       */
    async register({ request, response }: Context) {
        var resUser: UserModels;
        var user: UserModels;
        resUser = await request.body().value;
        if (
          !resUser.firstname ||
          !resUser.lastname ||
          !resUser.email ||
          !resUser.dateNaissance ||
          !resUser.sexe
        ) {
          response.status = 400;
          response.body = {
            "error": false,
            "message": "Une ou plusieurs données obligatoire sont manquantes",
          };
        }
        if (
          resUser.sexe != "Homme" &&
          resUser.sexe != "Femme" &&
          emailValidation(resUser.email) &&
          dateNaissanceValidation(resUser.dateNaissance)
        ) {
          response.status = 409;
          response.body = {
            "error": false,
            "message": "Une ou plusieurs données sont erronées",
          };
        } else {
          response.status = 201;
          response.body = {
            "error": false,
            "message": "L'utilisateur a bien été créé avec succès",
            "user": {
              "firstname": "xxxxxx",
              "lastname": "xxxxxx",
              "email": "xxxxxx",
              "sexe": "xxxxxx",
              "role": "xxxxx",
              "dateNaissance": "xxxx-xx-xx",
              "createdAt": "xxxxxx",
              "updateAt": "xxxxxx",
              "subscription": 0,
            },
          };
          user = new UserModels(
            resUser.firstname,
            resUser.lastname,
            resUser.email,
            resUser.sexe,
            resUser.password,
            resUser.dateNaissance,
          );
          user.insert();
          console.log("insert done");
        }
        // A finir le code erreur pour le email doesn't exist
      };
      

    async login({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }
}