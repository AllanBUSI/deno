import { db } from './db.ts';
import UserInterface from '../interfaces/UserInterface.ts';

export class UserDB {

    protected userdb: any;
    constructor() {
        this.userdb = db.collection < UserInterface > ("users");
    }


    // update(): Promise < any > {
    //     throw new Error('Method not implemented.');
    // }
    delete(): Promise < any > {
        throw new Error('Method not implemented.');
    }
}