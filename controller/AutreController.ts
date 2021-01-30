import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";

export default class AutreController {

    async subcription({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async bills({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }
}