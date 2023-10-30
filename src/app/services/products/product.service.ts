import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../../model/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products!:Array<Product>;

  constructor() { 
    this.products=[new Product(UUID.UUID(),"Product_1",1000,true),
                    new Product(UUID.UUID(),"Product_2",2500,false),
                    new Product(UUID.UUID(),"Product_3",1700,true),
                    new Product(UUID.UUID(),"Product_4",1700,false),
                    new Product(UUID.UUID(),"Product_5",4200,true)];
    
    for (let index = 0; index < 5; index++) {
      this.products.push(new Product(UUID.UUID(),"Product_1",1000,true));
      this.products.push(new Product(UUID.UUID(),"Product_3",1700,true));
      this.products.push(new Product(UUID.UUID(),"Product_3",1700,true));
      this.products.push(new Product(UUID.UUID(),"Product_5",4200,true));
      this.products.push(new Product(UUID.UUID(),"Product_4",1700,false));
    
    }
  }


  //to get all products
  public getAllProducts():Observable<Array<Product>>{
    let ran=Math.random();
    if(ran<0.1) return throwError(()=>new Error("This is an error"));
    else return of(this.products);
  } 

  //for pagination
  public getPageProduct(pageNumber:number,size:number):Observable<PageProduct>{
    let totalPages=~~(this.products.length/size);
    if (this.products.length%size!=0) totalPages++;
    let index=pageNumber*size;
    let slicedList=this.products.slice(index,index+size);
    let pageProduct=new PageProduct(slicedList,pageNumber,size,totalPages);
    return of(pageProduct);
  } 

  public deleteProduct(id:string):Observable<Boolean>{
    this.products=this.products.filter(p => p.id !==id);
    return of(true);
  }

  public setPromotion(id:string):Observable<boolean>{
    let index=this.products.findIndex(p => p.id==id);
    this.products[index].promotion=!this.products[index].promotion;
    console.log(this.products[index].promotion);
    return of(true);
  }

  public searchProduct(keyword:string):Observable<Array<Product>>{
    let products=this.products.filter(p=>p.name.includes(keyword));
    return of(products);
  }

  //Sraech page product
  public searchPageProduct(keyword:string,pageNumber:number,size:number):Observable<PageProduct>{
    let result=this.products.filter(p=>p.name.includes(keyword));
    let totalPages=~~(result.length/size);
    if (result.length%size!=0) totalPages++;
    let index=pageNumber*size;
    let slicedList=result.slice(index,index+size);
    let pageProduct=new PageProduct(slicedList,pageNumber,size,totalPages);
    return of(pageProduct);
  }

  public addProduct(product:Product):Observable<boolean>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(true);
  }

  public getProduct(id:string):Observable<Product>{
    let product=this.products.find(p=>p.id==id);
    if (product!=undefined) {
      return of(product);
    }else{
      return throwError(()=>console.log("Product Not Found"));
    }

  }

  public getErrorMessage(fieldName:string, error:any){
    if (error['required']) {
      return fieldName+" is required";
    }else if (error['minlength']) {
      return fieldName + " must contain "+error['minlength']['requiredLength']+ " caracters";
    } else {
      return "";
    }
  }

  public editProduct(product:Product):Observable<boolean>{
    this.products=this.products.map(p=>p.id==product.id?product:p);
    return of(true);

  }

}
