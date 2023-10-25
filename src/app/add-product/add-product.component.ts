import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!:FormGroup

  constructor(private fb:FormBuilder, public productService:ProductService) { }

  ngOnInit(): void {
    this.addProductForm=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(3)]),
      price:this.fb.control(null,Validators.required),
      promotion:this.fb.control(false)
    })
  }

  public handleAddProduct(){
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next : (data)=>{
        alert("Product Added");
      }
    })
  }

  



}
