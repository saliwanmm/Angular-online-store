import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [QuillModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent implements OnInit {

  form!: FormGroup
  product!: Product
  submitted: boolean = false

  constructor(
    private router: Router,
    private productServ: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productServ.getById(params["id"])
      })
    ).subscribe(product => {
      this.product = product
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;

    this.productServ.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe( res => {
      this.submitted = false;
      this.router.navigate(["/admin", "dashboard"])
    })
  }
}
