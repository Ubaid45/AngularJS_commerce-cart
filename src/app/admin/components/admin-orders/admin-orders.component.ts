import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from 'shared/components/modal/modal.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService, private modalService: NgbModal) {
    this.orders$ = this.orderService.getOrders().valueChanges();
    console.log(this.orders$);
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
