import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";

export default class AuthController {

    async register({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async login({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }
}