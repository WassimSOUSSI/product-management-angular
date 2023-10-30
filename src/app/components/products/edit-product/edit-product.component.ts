import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id!:string;
  product!:Product
  editProductForm!:FormGroup;

  constructor(private route:ActivatedRoute, public productService:ProductService, private fb:FormBuilder, private router:Router) { 
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    //Get the product from the service
    this.productService.getProduct(this.id).subscribe({
      next : (data) =>{
        this.product=data;
      }
    })
    //Initialize the form
    this.editProductForm=this.fb.group({
      name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(3)]),
      price:this.fb.control(this.product.price,Validators.required),
      promotion:this.fb.control(this.product.promotion)
    })
  }

  public handleEditProduct(){
    let product=this.editProductForm.value;
    product.id=this.id;
    console.log(product);
    this.productService.editProduct(product).subscribe({
      next : (data)=>{
        alert("Product edited");
        this.router.navigateByUrl("/home/products");
      }
    })
  }

}
