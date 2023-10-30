import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../model/product';
import { LoginService } from '../../../services/shared-services/login.service';
import {ProductService} from '../../../services/products/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!:Array<Product>;
  errorMessage!:string;
  searchForm!:FormGroup;
  currentPage:number=0;
  pageSize:number=3 ;
  totalPages:number=0;
  currentAction:string="ALL";

  constructor(private productService:ProductService,public loginService:LoginService, private route:Router) {

  }

  ngOnInit(): void {
    //this.getProducts();
    this.handleGetPageProduct();
    this.searchForm=new FormGroup({
      productKeyword:new FormControl(null)
    });
  }

 //To call getAllProducts
 public getProducts(){
  this.productService.getAllProducts().subscribe({
    next : (data)=>{
      this.products=data;
    },
    error :(err)=>{
      this.errorMessage=err;
    }
  })
}

//To call getPageProducts
public handleGetPageProduct(){
  this.productService.getPageProduct(this.currentPage,this.pageSize).subscribe({
    next : (data)=>{
      this.products=data.products;
      this.totalPages=data.totalPages;
    }
  })
}

public delete(id:string){
  let conf=confirm("Are you sure of this operation?");
  if(conf==false) return;
  this.productService.deleteProduct(id).subscribe({
    next:(data)=>{
      //this.getProducts();
      if (this.currentAction=="ALL") {
        this.handleGetPageProduct();
      }else{
        this.handleSearchProduct();
      }

    }
})
}

public handlePromotion(id:string){
  this.productService.setPromotion(id).subscribe({
    next:(data)=>{}
  })
}

public handleSearchProduct(){
  /* this.productService.searchProduct(this.searchForm.value.productKeyword).subscribe({
    next : (data)=>{
      this.products=data;
    }
  }); */ // Search the products

  //search the page product
  this.currentAction="SEARCH";
  this.productService.searchPageProduct(this.searchForm.value.productKeyword,this.currentPage,this.pageSize).subscribe({
    next : (data)=>{
      this.products=data.products;
      this.totalPages=data.totalPages;
      this.currentPage=data.pageNumber; 
    }
  })

}

public goToPage(page:number){
  this.currentPage=page;
  if (this.currentAction=="ALL") {
    this.handleGetPageProduct();
  }else {
    this.handleSearchProduct();
  }
    
}

public handleAddProduct(){
  this.route.navigateByUrl("/home/addProduct");
}

public handleEditProduct(id:string){
  this.route.navigateByUrl("/home/editProduct/"+id);
}


}
