// deno-lint-ignore-file
import UserInterfaces from "../interfaces/userInterfaces.ts";
import { db } from "./db.ts";
import { UserTypes } from "../types/userTypes.ts";
import ChildInterface from "../interfaces/ChildInterfaces.ts";
import { Bson } from "https://deno.land/x/bson/mod.ts";
import BillInterface from "../interfaces/BillInterface.ts";

export default class UserDB {
  protected userdb;
  constructor() {
    this.userdb = db.collection<UserInterfaces>("users");
  }

  async findByEmail(email: string): Promise<UserInterfaces | undefined> {
    return await this.userdb.findOne({ email: email });
  }

  async findAll(options?: UserTypes): Promise<UserInterfaces[]> {
    return await this.userdb.find(options).toArray();
  }

  async getChilds(email: string): Promise<ChildInterface[]> {
    const user = await this.userdb.findOne({ email });
    return user?.childs || [];
  }

  async getChildByEmail(
    childEmail: string,
  ): Promise<UserInterfaces | undefined> {
    return await this.userdb.findOne({ "childs.email": childEmail });
  }

  async addChild(
    email: string,
    child: ChildInterface,
  ): Promise<UserInterfaces> {
    const user = await this.userdb.findOne({ email });
    const childs = user?.childs || [];
    childs.push(child);
    // updateOne
    await this.userdb.updateOne(
      { email: email },
      { $set: { childs } },
    );

    return await this.userdb.findOne({ email }) as UserInterfaces;
  }

  async addBill(
    email: string,
    bill: BillInterface,
  ): Promise<UserInterfaces> {
    const user = await this.userdb.findOne({ email });
    const bills = user?.bills || [];
    bills.push(bill);
    // updateOne
    await this.userdb.updateOne(
      { email: email },
      { $set: { bills } },
    );

    return await this.userdb.findOne({ email }) as UserInterfaces;
  }

  async deleteChild(
    email: string,
    _id: string,
  ): Promise<boolean> {
    const user = await this.userdb.findOne({ email });
    // récupération des enfants
    const childs = user?.childs || [];

    // récupération de l'index du tableau où se trouve l'enfant que l'on veut supprimer
    const index = childs.findIndex((v) => v._id?.toString() === _id);
    // si on ne trouve pas l'enfant c'est qu'il n'existe pas avec l'id envoyé
    if (index === -1) return false;
    // suppression de l'enfatn du tableau
    childs.splice(index, 1);
    // updateOne
    await this.userdb.updateOne(
      { email: email },
      { $set: { childs } },
    );

    return true;
  }

  insert(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(update: UserTypes): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(email: string): Promise<number> {
    if (email !== undefined) {
      return await this.userdb.deleteOne({ email });
    } else {
      return 0;
    }
  }

  async findbyToken(token: string): Promise<UserInterfaces | undefined> {
    return await this.userdb.findOne({ token: token });
  }

  async clearToken(email: string, user: UserTypes): Promise<void> {
    user.token = "";
    await this.userdb.updateOne({ email: email }, user);
    return;
  }

  async addToken(email: string, user: UserTypes, token: string): Promise<void> {
    user.token = token;
    await this.userdb.updateOne({ email: email }, user);
    return;
  }
}
