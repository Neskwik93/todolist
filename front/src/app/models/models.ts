export class User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}