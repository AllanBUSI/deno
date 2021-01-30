export type roleTypes = "Admin" | "Tuteur" | "Enfant";
export type sexeTypes = "Homme" | "Femme";
export type BillType = {
    date_payment?: Date;
    id_Stripe?: string;
    montant_ht?: string;
    montant_ttc?: string;
    source?: "Stripe";
    createdAt?: Date;
    updateAt?: Date;
};
export type ChildTypes = {
  firstname?: string;
  lastname?: string;
  email?: string;
  sexe?: sexeTypes;
  role?: roleTypes;
  password?: string;
  dateNaissance?: Date;
  createdAt?: Date;
  updateAt?: Date;
  token?: string;
  subscription?: number;
};
export type UserTypes = {
  firstname?: string;
  lastname?: string;
  email?: string;
  sexe?: sexeTypes;
  role?: roleTypes;
  password?: string;
  dateNaissance?: Date;
  subscription?: number;
  childs?: ChildTypes[];
  bills?: BillType[];
  token?: string;
  cardId?: number | null;
  cvc?: number | null;
  subscribeCreatedAt?: Date | null;
  subscribeUpdateAt?: Date | null;
};


  