export class User {
    public id:string;
    public userName:string;
    public password:string;
    public role:string;

    constructor(id:string, name:string, pass:string, role: string){
        this.id=id;
        this.userName=name;
        this.password=pass;
        this.role=role;
    }

}
