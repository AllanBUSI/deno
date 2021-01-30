import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";

export default class UserController {

    async home({ request, response }: Context) {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userPut({ request, response }: Context) {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
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
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }

    async userChildCreate({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
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