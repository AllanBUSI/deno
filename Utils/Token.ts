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
  import { decode } from "https://deno.land/x/djwt@v2.0/mod.ts"
  


  export const  createToken = async (user: any) => {
    return await create(
      { alg: "HS256", typ: "JWT" },
      {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        exp: getNumericDate(parseInt(config.JWT_ACCES_TOKEN_EXP)),
      },
      config.JWT_TOKEN_SECRET,
    );
  };
  
  export const verifyToken = async (token: string) => {
    try {
      // si le token est correct on retourne true
      await verify(
        token.split("Bearer ")[1],
        config.JWT_TOKEN_SECRET,
        "HS256",
      );
      return true;
    } catch (error) {
      // sinon on retourne false
      return false;
    }
  };
  
  export const getToken = async (token: any): Promise<any> => {
      // si le token est valide on le retourne
      //console.log(token)
      const payload = await verify(
        token.split("Bearer ")[1],
        config.JWT_TOKEN_SECRET,
        "HS256",
      );
      //console.log(token);
      return token = {
        sub: payload.sub,
        email: payload.email as string,
        firstname: payload.firstname as string,
        lastname: payload.lastname as string,
        role: payload.role as roleTypes,
        exp: payload.exp,
      };
  }

  export const decodeToken = async(jwt: any)=>{
    const token = {}
   // token = {payload, signature, header} = decode(jwt.split("Bearer ")[1])
   // console.log(token.payload)
  }
  