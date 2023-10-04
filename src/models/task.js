import md5 from 'md5'
const salt = "ramdom_str";
export class Task {
    static TS_COMPLETED = 'Completed'
    static TS_ACTIVE = 'Active'

    constructor() {
        this.id = md5(Date.now()+salt)
        this.title = "";
        this.type = Task.TS_ACTIVE;
    }
}