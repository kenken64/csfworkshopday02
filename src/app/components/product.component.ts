import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output() onProductAdd = new EventEmitter<string>();
  @Input() productsArr = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  addCart(name){
    console.log(name);
    this.onProductAdd.next(name);
  }

}
