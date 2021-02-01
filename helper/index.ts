
import { sexeTypes } from "../types/sexeTypes.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
moment().locale("fr");

export class helper {

    hash = async(password: string): Promise<string> => {
        return await bcrypt.hash(password);
    }

    comparePass = async(password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    }

    emailValidation = (email: string) => {
    return /\S+@\S+\.\S+/.test(email) && email.length >= 10 &&
        email.length <= 150;
    };

    dateNaissanceValidation = (dateNaissance: Date) => {
    return dateNaissance.getTime() >= Date.now();
    };

    dateValidation = (date: string) => {
    return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date);
    };

    sexeValidation = (sexe: sexeTypes) => {
    return sexe === "Femme" || sexe === "Homme";
    };

    verifFirstname = (value: string) => {
    return /^([a-zA-Z-]){2,25}$/.test(value);
    };
    verifLastname = (value: string) => {
    return /^([a-zA-Z-]){2,25}$/.test(value);
    };

    verifPassword = (value: string) => {
    return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{7,20})/.test(value);
    };

    verifDate = (date: Date) => {
    return date instanceof Date;
    };

    verifName = (value: string) => {
    };

    verifUrl = (value: string) => {
    };

    verifCover = (value: string) => {
    };

    verifTime = (value: string) => {
    };

    verifType = (value: string) => {
    };

    verifCartNumber = (value: string) => {
    return /^[0-9]{16}$/.test(value);
    };
    verifIdCart = (value: string) => {
    return /^[0-9]{1,10}$/.test(value);
    };
    verifCvc = (value: string) => {
    return /^[0-9]{3}$/.test(value);
    };

    verifMonth = (value: string) => {
    return /^[0-9]{2}$/.test(value);
    };

    verifYear = (value: string) => {
    return /^[0-9]{2}$/.test(value);
    };

    verifId = (value: string) => {
    return /^[a-z0-9]+$/.test(value);
    };

    // FORMATER
    formatDateNaissance = (value: Date) => {
    return moment(value).format("YYYY-MM-DD");
    };

    formatDatePayment = (value: Date) => {
    return moment(value).format("YYYY-MM-DD HH:MM:SS");
    };

    formatMontant = (value: number) => {
    return Number(value.toFixed(2));
    };


}