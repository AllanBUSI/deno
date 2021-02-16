import { Context, } from "https://deno.land/x/oak@v6.4.1/context.ts";
import { play } from "https://deno.land/x/audio@0.1.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak/helpers.ts";
import { getToken, decodeToken } from "../Utils/Token.ts";


export default class AudioController {

    async songs(ctx: Context)  {
        const params = getQuery(ctx, { mergeParams: true });  
        console.log(params.id)
        if(params.id == '1' || params.id == '2' || params.id == '3'){
          play(params.id+".mp3"); 
          ctx.response.status = 403;
          ctx.response.body = {"songs": [{ 
            "id": params.id, 
            "name": "son"+params.id, 
            "url": "http://localhost:3000/songs/"+params.id, 
            "cover": params.id+".jpg", 
            "time": "0:10", 
            "type": "mp3", 
            "createdAt": "01-20-2021 16:34", 
            "updateAt": "01-20-2021 16:34" 
            }]}
        }else{
          ctx.response.status = 403;
          ctx.response.body = { "error": true, "message": "Votre abonnement ne permet pas d'accéder à la ressource" }
        }
     }

     async allsongs(ctx: Context)  {
      const authorization = ctx.request.headers.get("authorization");
      const token = await getToken(authorization);
        ctx.response.status = 200;
        ctx.response.body = {
          "songs": [{ 
            "id": "1", 
            "name": "son1", 
            "url": "http://localhost:3000/songs/1", 
            "cover": "1.jpg", 
            "time": "0:10", 
            "type": "mp3", 
            "createdAt": "01-20-2021 16:34", 
            "updateAt": "01-20-2021 16:34" 
            },
            { 
              "id": "2", 
              "name": "son2", 
              "url": "http://localhost:3000/songs/2", 
              "cover": "2.jpg", 
              "time": "0:10", 
              "type": "mp3", 
              "createdAt": "01-20-2021 16:34", 
              "updateAt": "01-20-2021 16:34" 
            },
            { 
              "id": "3", 
              "name": "son3", 
              "url": "http://localhost:3000/songs/3", 
              "cover": "3.jpg", 
              "time": "0:10", 
              "type": "mp3", 
              "createdAt": "01-20-2021 16:34", 
              "updateAt": "01-20-2021 16:34" 
            }
          ] 
        } 
        return;
    }
}