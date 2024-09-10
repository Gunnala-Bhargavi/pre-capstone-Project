import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, window } from 'rxjs';
import { Cart, Payment, Product, User } from '../models/models';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService
  ) {}

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  // JWT Helper Service : npm install @auth0/angular-jwt

  getUser(): User {
    
    let token = this.getLoggedInUser()
    let user: User = {
      id: token.userId,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
    };
    return user;
  }
  getLoggedInUser(){
    let a=localStorage.getItem('loggedInUser')
    return a?JSON.parse(a):null;
    
  }

  /*{userId: 3, firstName: "ab", lastName: "cd", email: "temp@gmail.com", address: "Hyd",…}
address
: 
"Hyd"
createdAt
: 
""
email
: 
"temp@gmail.com"
firstName
: 
"ab"
lastName
: 
"cd"
mobile
: 
"temp@gmail.com"
modifiedAt
: 
""
orders
: 
[]
password
: 
"abcd1234"
payments
: 
[]
reviews
: 
[]
userId
: 
3*/

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    //this.isLoggedIn
    return localStorage.getItem('loggedInUser') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
  }

  addToCart(product: Product) {
    let productid = product.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, productid).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
    });
  }

  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.product.price;

      payment.amountReduced +=
        cartitem.product.price -
        this.applyDiscount(
          cartitem.product.price,
          cartitem.product.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }

    if (payment.amountPaid > 50000) payment.shipingCharges = 2000;
    else if (payment.amountPaid > 20000) payment.shipingCharges = 1000;
    else if (payment.amountPaid > 5000) payment.shipingCharges = 500;
    else payment.shipingCharges = 200;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offer.discount
      );
    }
    return pricepaid;
  }

  orderTheCart() {
    
  }
}
