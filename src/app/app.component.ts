import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Output() onCartAdd = new EventEmitter<string>();
  
  carts = [];
  products = [
    {name: 'Milo', url: 'https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04035541/product-hot-milo.png'},
    {name: 'Kopi', url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG'},
    {name: 'Teh Tarik', url: 'https://www.wonderwall.sg/content/dam/wonderwall/images/2020/05/6-things-you-did-not-know-about-tea-in-singapore/teasingapore_lead.jpg'},
    {name: 'Olong milk tea With Pearl', url: 'https://cdn.shopify.com/s/files/1/0263/4812/6298/products/Capture_419f3671-7cf8-4020-a095-99faa3db0ee4_1005x.png?v=1589699475'},
  ] 
  
  // this is use to aggregate quantity.
  cartsMap : Map<string, number> = new Map<string, number>();

  constructor(){
  }

  // this is a function being invoke by the eventEmitter from the product listing
  // component
  populateCart($event){
    // check whether the aggre map already have the product
    if(this.cartsMap.has($event)){
      let currCount = this.cartsMap.get($event);
      this.cartsMap.set($event, currCount +1);
      // increment the quantity
      let indexAddProd = this.carts.findIndex(i => i.name === $event);
      this.carts[indexAddProd].count = currCount+1;
    }else{
      this.cartsMap.set($event, 1);
      let imageUrlProduct = this.products.find(i => i.name === $event);
      this.carts.push({name: $event, url:imageUrlProduct.url ,count: 1});
    } 
  }

  removeFromCart(name){
    // fidn the product name from the array
    let indexAddProd = this.carts.findIndex(i => i.name === name);
    if (indexAddProd > -1) {
      //  remove it
      this.carts.splice(indexAddProd, 1);
      // also remove it from the aggregation map
      this.cartsMap.delete(name);
    }
  }
}
