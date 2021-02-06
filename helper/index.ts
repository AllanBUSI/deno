import { sexeTypes } from "../type/index.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
moment().locale("fr");



    export const hash = async(password: string): Promise<string> => {
        return await bcrypt.hash(password);
    }

    export const comparePass = async(password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    }

    export const emailValidation = (email: string) => {
    return /\S+@\S+\.\S+/.test(email) && email.length >= 10 &&
        email.length <= 150;
    };

    export const dateNaissanceValidation = (dateNaissance: Date) => {
    return dateNaissance.getTime() >= Date.now();
    };

    export const dateValidation = (date: string) => {
    return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date);
    };

    export const sexeValidation = (sexe: sexeTypes) => {
    return sexe === "Femme" || sexe === "Homme";
    };

    export const verifFirstname = (value: string) => {
    return /^([a-zA-Z-]){2,25}$/.test(value);
    };
    export const verifLastname = (value: string) => {
    return /^([a-zA-Z-]){2,25}$/.test(value);
    };

    export const verifPassword = (value: string) => {
    return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{7,20})/.test(value);
    };

    export const verifDate = (date: Date) => {
    return date instanceof Date;
    };

    export const verifName = (value: string) => {
    };

    export const verifUrl = (value: string) => {
    };

    export const verifCover = (value: string) => {
    };

    export const verifTime = (value: string) => {
    };

    export const verifType = (value: string) => {
    };

    export const verifCartNumber = (value: string) => {
    return /^[0-9]{16}$/.test(value);
    };
    export const verifIdCart = (value: string) => {
    return /^[0-9]{1,10}$/.test(value);
    };
    export const verifCvc = (value: string) => {
    return /^[0-9]{3}$/.test(value);
    };

    export const verifMonth = (value: string) => {
    return /^[0-9]{2}$/.test(value);
    };

    export const verifYear = (value: string) => {
    return /^[0-9]{2}$/.test(value);
    };

    export const verifId = (value: string) => {
    return /^[a-z0-9]+$/.test(value);
    };

    // FORMATER
    export const formatDateNaissance = (value: Date) => {
    return moment(value).format("YYYY-MM-DD");
    };

    export const formatDatePayment = (value: Date) => {
    return moment(value).format("YYYY-MM-DD HH:MM:SS");
    };

    export const formatMontant = (value: number) => {
    return Number(value.toFixed(2));
    };
