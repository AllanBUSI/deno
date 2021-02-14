import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";
import  UserDB  from "../db/UserDB.ts";
import { db } from "../db/index.ts";
import { getToken, decodeToken } from "../Utils/Token.ts";
import  UserInterfaces   from "../interfaces/UserInterfaces.ts";
import { ChildModels } from "../model/ChildModel.ts";
import {
    dateNaissanceValidation,
    emailValidation,
    formatDateNaissance,
    comparePass,
  } from "../helper/index.ts";

  import ChildInterface from '../interfaces/ChildInterface.ts';
  
  //base de données
const childdb =  db.collection < ChildInterface > ("childs");
const userdb = db.collection<UserInterfaces>("users");
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
        console.log(token)
        const user = await new UserDB().findByEmail(token.email);
        console.log(user)
        if (user) {
          user.firstname = updateUser.firstname ? updateUser.firstname : user.firstname;
          user.lastname = updateUser.lastname ? updateUser.lastname : user.lastname;
          user.dateNaissance = updateUser.dateNaissance ? updateUser.dateNaissance : user.dateNaissance;
          user.sexe = updateUser.sexe ? updateUser.sexe : user.sexe;
        //udpate en fonction des data reçus
        await  userdb.updateOne({email:user.email}, user);
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
        const authorization = request.headers.get("authorization");
        if(authorization){
        const token = await getToken(authorization);
        const user = await new UserDB().findByEmail(token.email);
        if(user){
            const child = user?.childs || [];
            if(child.length > 0){
                console.log("bien");
            }else{
                await  userdb.deleteOne({email:user.email});
                response.status = 200;
                response.body = {
                    "error": false,
                    "message": "Votre compte et le compte de vos enfants ont été supprimés avec succès",
                };
            }
        }
        }
    }

    async userAddChild({ request, response }: Context)  {
        const data: any = await request.body()
        // verifi le body 
        let child:any = {};
        // recupere les data dans le body 
        for (const [key, value] of await data.value) {
          child[key] = value;
        }
        if (!child.firstname || !child.lastname || !child.email || !child.dateNaissance || !child.sexe) 
        {
          response.status = 400;
          response.body = {
            "error": false,
            "message": "Une ou plusieurs données obligatoire sont manquantes",
          };
        }else if( child.sexe != "Homme" || child.sexe != "Femme" && emailValidation(child.email) && dateNaissanceValidation(child.dateNaissance))
        {
            console.log("verifier bien")
            response.status = 409;
            response.body = {
                "error": false,
                "message": "Une ou plusieurs données sont erronées",
            };
        }else {
            const chil = await childdb.findOne({ email: child.email });
            const authorization = request.headers.get("authorization");
            if(!chil){
                const client = new ChildModels(
                    child.firstname,
                    child.lastname,
                    child.email,
                    child.sexe,
                    child.password,
                    child.dateNaissance,
                );
                
                if(authorization){
                    const token = await getToken(authorization);
                    let user = await new UserDB().findByEmail(token.email);
                    if(user && user.childs !== undefined){
                        const mail:any = child.email;
                        user.childs.push(mail);
                        console.log(user)
                        await  userdb.updateOne({email:user.email}, user);
                    }
                }
                await client.insert();
                response.status = 201;
                response.body = {
                "error": false,
                "message": "Votre enfant a bien été créé avec succès",
                "user": child,
                };
               // await sendMail.Email("busi.travail@gmail.com",user.email);
            }else{
                response.status = 409;
                response.body = {
                "error": true,
                "message": "Un compte utilisant cette adresse mail est déjà enregistré",
                };
            } 
        }

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