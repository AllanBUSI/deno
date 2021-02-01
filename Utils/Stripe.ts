// deno-lint-ignore-file
import { config } from "../config/config.ts";
export const stripeRequest = async (
  email: string,
  cardNumber: string,
  expMonth: string,
  expYear: string,
  cvc: string,
) => {
  var myHeaders: any = new Headers();
  myHeaders.append("Authorization", "Basic " + config.STRIPE_SECRET_KEY);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded: any = new URLSearchParams();
  urlencoded.append("type", "card");
  urlencoded.append("card[number]", cardNumber); //"4242424242424242";
  urlencoded.append("card[exp_month]", expMonth); //"10";
  urlencoded.append("card[exp_year]", expYear); //"2030";
  urlencoded.append("card[cvc]", cvc); //"123"

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const methodes = await fetch(
    "https://api.stripe.com/v1/payment_methods",
    requestOptions,
  );
  const responseMethodes = await methodes.json();

  var myHeaders: any = new Headers();
  myHeaders.append("Authorization", "Basic " + config.STRIPE_SECRET_KEY);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded: any = new URLSearchParams();
  urlencoded.append("payment_method", responseMethodes.id);
  urlencoded.append("email", email);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const customer: any = await fetch(
    "https://api.stripe.com/v1/customers",
    requestOptions,
  );
  const responseCustomer = await customer.json();

  var myHeaders: any = new Headers();
  myHeaders.append("Authorization", "Basic " + config.STRIPE_SECRET_KEY);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded: any = new URLSearchParams();
  urlencoded.append("items[0][price]", config.STRIPE_PRODUCT_ID);
  urlencoded.append("customer", responseCustomer.id);
  urlencoded.append("default_payment_method", responseMethodes.id);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const subcription = await fetch(
    "https://api.stripe.com/v1/subscriptions",
    requestOptions,
  );
  return await subcription.json();
};
