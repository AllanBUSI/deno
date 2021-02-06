import {
    create,
    getNumericDate,
    Payload,
    verify,
  } from "https://deno.land/x/djwt@v2.0/mod.ts";
  import {
    Algorithm,
    AlgorithmInput,
  } from "https://deno.land/x/djwt@v2.0/algorithm.ts";
  import { config } from "../config/config.ts";
  import { roleTypes } from "../type/index.ts";
  import UserInterfaces from "../interfaces/UserInterfaces.ts";
  import { IToken } from "../interfaces/UserInterfaces.ts";
  


  export const  createToken = async (user: UserInterfaces) => {
    return await create(
      { alg: String(config.JWT_ALGO) as Algorithm, typ: "JWT" },
      {
        sub: String(Math.sqrt(Math.pow(Math.PI, Math.exp(Math.PI)))),
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        exp: getNumericDate(parseInt(config.JWT_ACCES_TOKEN_EXP)),
      },
      config.JWT_TOKEN_SECRET,
    );
  };
  
  export const checkToken = async (token: string) => {
    try {
      // si le token est valide on retourne true
      await verify(
        token.split("Bearer ")[1],
        config.JWT_TOKEN_SECRET,
        String(config.JWT_ALGO) as AlgorithmInput,
      );
      return true;
    } catch (error) {
      // sinon on retourne false
      return false;
    }
  };
  
  export const getToken = async (
    token: string,
  ): Promise<
    false | IToken
  > => {
    try {
      // si le token est valide on le retourne
      const payload = await verify(
        token.split("Bearer ")[1],
        config.JWT_TOKEN_SECRET,
        String(config.JWT_ALGO) as AlgorithmInput,
      );
      return {
        sub: payload.sub,
        email: payload.email as string,
        firstname: payload.firstname as string,
        lastname: payload.lastname as string,
        role: payload.role as roleTypes,
        exp: payload.exp,
      };
    } catch (error) {
      // sinon on retourne false
      return false;
    }
  }
  