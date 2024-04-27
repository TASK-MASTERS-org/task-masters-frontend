import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  displayedColumns: string[] = ['id', 'user_id', 'address', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sortOrders!: MatSort;

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.orderService.getOrders().subscribe((orders: any) => {
      if (orders.status === 200) {
        const formattedOrders = orders.data.map((order: any) => ({
          id: order.id, user_id: order.user.id, address: order.address, status: order.status
        }));
        this.dataSource.data = formattedOrders; // Assign data to dataSource.data
        this.dataSource.sort = this.sortOrders; // Ensure sort is assigned after data
      }
    });
  }
  applyFilterOrder(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  assignOrder(order: any) {
      this.router.navigate(['/admin/drivers']);
  }
}

