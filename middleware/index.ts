import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";
import UserDB from "../db/UserDB.ts";
import UserInterfaces from "../interfaces/userInterfaces.ts";
import { checkToken, getToken } from "../utils/token.ts";
import { getToken } from "../utils/token.ts";
import {
  dateValidation,
  emailValidation,
  sexeValidation,
  verifFirstname,
  verifLastname,
  verifPassword,
} from "../helpers/validationUser.helper.ts";
import { IToken } from "../interfaces/tokenInterface.ts";

// deno-lint-ignore no-explicit-any

export class middleware {
    authMiddleware = async (ctx: Context, next: any) => {
        // récupération du token
        const authorization = ctx.request.headers.get("authorization");
      
        // s'il n'y a pas de header authorization dans la requête
        if (!authorization) {
          ctx.response.status = 401;
          return await ctx.response.toServerResponse();
        }
      
        // vérification du token
        const token = await checkToken(authorization);
        const tokenModels = await getToken(authorization);
        let isTokenValid: boolean;
        if (!tokenModels) {
          isTokenValid = false;
        } else {
          const user: UserInterfaces | undefined = await new UserDB().findByEmail(
            tokenModels.email,
          );
          if (user) {
            isTokenValid = user.token == authorization.split("Bearer ")[1];
          } else {
            isTokenValid = false;
          }
        }
        // si le token est présent mais qu'il n'est pas valide ou si le token est présent mais le user est logout
        if (!token || !isTokenValid) {
          ctx.response.status = 403;
          return await ctx.response.toServerResponse();
        }
        return await next();
      }

      addChildMiddleware = async (
        { request, response }: Context,
        next: any,
      ) => {
        const value = await request.body().value;
        const authorization = await request.headers.get("authorization") as string;
        const token = await getToken(authorization) as IToken;
      
        const childs = await new UserDB().getChilds(token.email);
        // si le cota d'enfants est dépassé
        if (childs.length === 3) {
          response.status = 409;
          response.body = {
            "error": true,
            "message": "Vous avez dépassé le cota de trois enfants",
          };
          return;
        }
      
        // vérification des données manquantes
        if (
          !value.email || !value.firstname || !value.lastname || !value.password ||
          !value.sexe || !value.date_naissance
        ) {
          response.status = 400;
          response.body = {
            "error": true,
            "message": "Une ou plusieurs données obligatoire sont manquantes",
          };
          return;
        }
      
        // vérification de la conformité des données
        if (
          !emailValidation(value.email) ||
          !dateValidation(value.date_naissance) ||
          !sexeValidation(value.sexe) ||
          !verifFirstname(value.firstname) || !verifLastname(value.lastname) ||
          !verifPassword(value.password)
        ) {
          response.status = 409;
          response.body = {
            "error": false,
            "message": "Une ou plusieurs données sont erronées",
          };
          return;
        }
      
        // vérification si l'email existe déjà pour les enfants
        const childEmail = await new UserDB().getChildByEmail(value.email);
        if (childEmail) {
          response.status = 409;
          response.body = {
            "error": true,
            "message": "Un compte utilisant cette adresse mail est déjà enregistré",
          };
          return;
        }
      
        // vérification si l'email existe déjà pour un tuteur
        const childEmail2 = await new UserDB().findByEmail(value.email);
        if (childEmail2) {
          response.status = 409;
          response.body = {
            "error": true,
            "message": "Un compte utilisant cette adresse mail est déjà enregistré",
          };
          return;
        }
      
        await next();
      }

      tuteurRoleMiddleware = async (ctx: Context, next: any) => {
        // récupération du token
        const authorization = ctx.request.headers.get("authorization");
      
        // s'il n'y a pas de header authorization dans la requête
        if (!authorization) {
          ctx.response.status = 401;
          ctx.response.body = {
            "error": true,
            "message": "Votre token n'est pas correct",
          };
          return;
        }
      
        // vérification du token
        const token = await getToken(authorization);
        // s'il n'a pas de token mais un header authorization
        if (!token) {
          ctx.response.status = 401;
          ctx.response.body = {
            "error": true,
            "message": "Votre token n'est pas correct",
          };
          return;
        }
        const user = await new UserDB().findByEmail(token.email);
        // si l'utilisateur à un token mais qu'il s'est déconnecté
        // on vérifie avec son token présent en bdd
        if (!user?.token) {
          ctx.response.status = 401;
          ctx.response.body = {
            "error": true,
            "message": "Votre token n'est pas correct",
          };
          return;
        }
      
        // s'il a un token mais qu'il n'est pas égal à celui en bdd
        if (user.token !== authorization.split("Bearer ")[1]) {
          ctx.response.status = 401;
          ctx.response.body = {
            "error": true,
            "message": "Votre token n'est pas correct",
          };
          return;
        }
      
        // si le token est présent mais qu'il n'est pas valide ou que son role n'est pas bon
        if (token.role as roleTypes !== "Tuteur") {
          ctx.response.status = 403;
          ctx.response.body = {
            "error": true,
            "message":
              "Vos droits d'accès ne permettent pas d'accéder à la ressource",
          };
          return;
        }
      
        await next();
      }

}
