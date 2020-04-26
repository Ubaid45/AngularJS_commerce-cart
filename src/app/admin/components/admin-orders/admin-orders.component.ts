import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

import { ModalService } from 'shared/services/modal.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;
  order$;
  myHTML;
  constructor(private orderService: OrderService, private modalService: ModalService) {
    this.orders$ = this.orderService.getOrders().valueChanges();
    console.log(this.orders$);
  }

  getOrder(id) {
    this.order$ = this.orderService.getOrdersByUser(id).valueChanges();

    console.log(this.orders$);
    this.modalService.displayDataInModal("headerText", this.myHTML );
  }



}
