// deno-lint-ignore-file
import { Bson } from "https://deno.land/x/bson/mod.ts";
import BillDB from "../db/BillDB.ts";
import BillInterface from "../interfaces/BillInterface.ts";

export class BillModel extends BillDB implements BillInterface {
  private id: { $oid: string } | null = null;

  date_payment: Date;
  id_Stripe: string;
  montant_ht: string;
  montant_ttc: string;
  source: "Stripe";
  createdAt: Date;
  updateAt: Date;

  constructor(
    id_Stripe: string,
    montant_ht: string,
    montant_ttc: string,
  ) {
    super();
    this.date_payment = new Date();
    this.id_Stripe = id_Stripe;
    this.montant_ht = montant_ht;
    this.montant_ttc = montant_ttc;
    this.source = "Stripe";
    this.createdAt = new Date();
    this.updateAt = new Date();
  }

  get _id(): string | null {
    return (this.id === null) ? null : this.id.$oid;
  }

  // deno-lint-ignore no-explicit-any
  async generate(): Promise<any> {
    return {
      _id: new Bson.ObjectId(),
      date_payment: this.date_payment,
      id_Stripe: this.id_Stripe,
      montant_ht: this.montant_ht,
      montant_ttc: this.montant_ttc,
      source: this.source,
      createdAt: this.createdAt,
      updateAt: this.updateAt,
    };
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
