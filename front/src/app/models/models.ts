export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    new: boolean;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class TaskList {
    id: number;
    name: string;
    deleted: boolean;
    user_id: number;
    new: boolean;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class Task {
    id: number;
    task_list_id: number;
    short_desc: string;
    long_desc: string;
    created_date: Date;
    end_date: Date;
    completed: boolean;
    deleted: boolean;
    new: boolean;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}