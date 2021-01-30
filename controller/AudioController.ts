import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";

export default class AudioController {

    async songs({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async allsongs({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }
}