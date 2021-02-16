import { Context } from "https://deno.land/x/oak@v6.4.1/context.ts";
import { config } from '../config/config.ts';

export default class AutreController {

    async subcription(ctx: Context)  {
        /**
         * @routes cart -> créer une carte 
         */

        // headers 
        // basic token + Content-type

        var myHeaders : any = new Headers();
        myHeaders.append("Authorization", "Basic "+config.STRIPE_SECRET_KEY);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        // entry tes information 
        var urlencoded : any = new URLSearchParams();
        urlencoded.append("type", "card");
        urlencoded.append("card[number]", "4242424242424242");
        urlencoded.append("card[exp_month]", "10");
        urlencoded.append("card[exp_year]", "2030");
        urlencoded.append("card[cvc]", "123");

        // obj javascript
        var requestOptions : any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        // requete envoyer
        const methodes = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
        const responseMethodes = await methodes.json()
        console.log('responseMethodes: ', responseMethodes);

        /**
         * @routes customer 
         * header token basic + content type 
         */
        var myHeaders : any = new Headers();
        myHeaders.append("Authorization", "Basic "+config.STRIPE_SECRET_KEY);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        /**
         * methode -> cart
         * email -> email
         */
        var urlencoded : any = new URLSearchParams();
        urlencoded.append("payment_method", responseMethodes.id);
        urlencoded.append("email", "busi.travail@gmail.com");

        // obj javacript
        var requestOptions : any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        // envoi des customers
        const customer : any = await fetch("https://api.stripe.com/v1/customers", requestOptions)
        const responseCustomer = await customer.json()
        console.log('responseCustomer: ', responseCustomer);
        
        /**
         * @routes paiement 
         * token basic + content type 
         */
        var myHeaders : any = new Headers();
        myHeaders.append("Authorization", "Basic "+config.STRIPE_SECRET_KEY);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        /**
         * items[0][price] -> produit en questions
         * customer -> customer
         * cart -> cart  
         */
        var urlencoded : any = new URLSearchParams();
        urlencoded.append("items[0][price]", config.STRIPE_PRODUCT_ID);
        urlencoded.append("customer", responseCustomer.id);
        urlencoded.append("default_payment_method", responseMethodes.id);

        // obj javacript
        var requestOptions : any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        // envoi des customers
        const subcription = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
        const sub = await subcription.json()

        console.log(sub)

        ctx.response.status = 200;
        ctx.response.body = { "error": false, "message": sub  }
         
    }

    async bills({ request, response }: Context)  {
        response.status = 400;
        response.body = { "error": true, "message": "a faire" };
        return;
    }
}