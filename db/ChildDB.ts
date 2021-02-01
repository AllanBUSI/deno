// deno-lint-ignore-file
import { db } from "./db.ts";
import { UserTypes } from "../types/userTypes.ts";
import ChildInterface from "../interfaces/ChildInterfaces.ts";

export class ChildDB {
  protected childdb: any;
  constructor() {
    this.childdb = db.collection<ChildInterface>("childs");
  }

  async findByEmail(email: string): Promise<ChildInterface | undefined> {
    return await this.childdb.findOne({ email });
  }

  async getChilds(_id: string[] | string): Promise<ChildInterface[]> {
    const childs = await this.childdb.find({ _id }).toArray();
    return childs || [];
  }

  async getChildByEmail(
    email: string,
  ): Promise<ChildInterface | undefined> {
    return await this.childdb.findOne({ email });
  }

  // async deleteChild(email: string, childEmail: string): Promise<void> {
  //   const user = await this.childdb.findOne({ email });
  //   const childs = user?.childs || [];
  //   // récupération de l'index du tableau où se trouve l'enfant que l'on veut supprimer
  //   const index = childs.findIndex((v) => v.email === childEmail);
  //   // suppression de l'enfatn du tableau
  //   childs.splice(index, 1);
  //   // updateOne
  //   await this.childdb.updateOne(
  //     { email: email },
  //     { $set: { childs } },
  //   );
  // }

  insert(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(update: UserTypes): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
