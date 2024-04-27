import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user_id', 'address', 'status', 'action'];
  dataSource: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    const   orders=  [
      { id: 1, user_id: 101, address: '123 Elm Street, Springfield', status: 'pending' },
      { id: 2, user_id: 102, address: '456 Maple Avenue, Shelbyville', status: 'assigned' },
      { id: 3, user_id: 103, address: '789 Oak Lane, Capital City', status: 'delivered' },
      // ... more orders
    ];
    this.dataSource = orders;
    // this.dataSource = this.orderService.getOrders();
  }

  assignOrder(order: any) {
    console.log('Assigning order:', order);
    // Add logic to assign the order
  }
}