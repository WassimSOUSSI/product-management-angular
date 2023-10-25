export class Product {
    public id:string;
    public name:string;
    public price:number;
    public promotion:boolean;


    constructor(id:string,name:string,price:number,pro:boolean){
        this.id=id;
        this.name=name;
        this.price=price;
        this.promotion=pro;
    }

    public getId():string{
        return this.id;
    }

}

export class PageProduct{
    public products:Array<Product>;
    public pageNumber:number;
    public size:number;
    public totalPages:number;

    constructor(products:Array<Product>,page:number,size:number,total:number){
        this.products=products;
        this.pageNumber=page;
        this.size=size;
        this.totalPages=total;
    }
}
