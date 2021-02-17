import { Middleware } from '../middleware/index.ts';
import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";    
import {
    dateNaissanceValidation,
    emailValidation,
    formatDateNaissance,
    comparePass,
  } from "../helper/index.ts";
import { UserModels } from "../model/UserModel.ts";
import UserDB from "../db/UserDB.ts";
import { createToken } from "../Utils/Token.ts";

import { db } from '../db/index.ts';
import UserInterfaces from '../interfaces/UserInterfaces.ts';

//base de données
const userdb =  db.collection < UserInterfaces > ("users");
const sendMail = new Middleware();


export default class AuthController {

      
      /**
       * REGISTER
       */
    async register({ request, response }: Context) {
        // Appal le body 
        const data: any = await request.body()
        // verifi le body 
        let user:any = {};
        // recupere les data dans le body 
        for (const [key, value] of await data.value) {
          user[key] = value;
        }
        //console.log(user)
        if (!user.firstname || !user.lastname || !user.email || !user.dateNaissance || !user.sexe) 
        {
          response.status = 400;
          response.body = {
            "error": false,
            "message": "Une ou plusieurs données obligatoire sont manquantes",
          };
        }else if( user.sexe != "Homme" || user.sexe != "Femme" && emailValidation(user.email) && dateNaissanceValidation(user.dateNaissance))
        {
            console.log("verifier bien")
            response.status = 409;
            response.body = {
                "error": true,
                "message": "Une ou plusieurs données sont erronées",
            };
        }else {
        //console.log(user)
            const us = await userdb.findOne({ email: user.email });
            if(!us){
                const client = new UserModels(
                    user.firstname,
                    user.lastname,
                    user.email,
                    user.sexe,
                    user.password,
                    user.dateNaissance,
                );
                await client.insert();
                response.status = 201;
                response.body = {
                "error": false,
                "message": "L'utilisateur a bien été créé avec succès",
                "user": user,
                };
                await sendMail.Email("busi.travail@gmail.com",user.email);
            }else{
                response.status = 409;
                response.body = {
                "error": true,
                "message": "Un compte utilisant cette adresse mail est déjà enregistré",
                };
            }
        }
        // A finir le code erreur pour le email doesn't exist
      };

    async login({ request, response }: Context)  {
         // Appal le body 
         const data: any = await request.body()
         // verifi le body 
         let user:any = {};
         // recupere les data dans le body 
         for (const [key, value] of await data.value) {
           user[key] = value;
         }
           if(user.email && user.password){
              const us = await userdb.findOne({email: user.email});
              if(us){
                var pass = us.password;
                //console.log(comparePass(user.password, pass));
    
                if(await comparePass(user.password, pass)){
                    //const token = jwt.getAuthToken(us);
                    const token = await createToken(us);
                    response.status = 200;
                    response.body = {
                      "error": false, 
                      "message": "L'utilisateur a été authentifié avec succès",
                      "user": us,
                      "token": token
                    };
                  }else {
                    response.status = 400;
                    response.body = {
                      "error": true, 
                      "message": "Email/password incorrect",
                    };
                }
              }else{
                response.status = 400;
                response.body = {
                  "error": true, 
                  "message": "Votre email n'existe pas !",
                };
              }
           }else{
            response.status = 400;
            response.body = {
              "error": true, 
              "message": "Email/password manquants"
            };
           }
    }

   





















}