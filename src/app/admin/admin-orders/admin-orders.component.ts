import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders().valueChanges();
    console.log(this.orders$);
  }
}
