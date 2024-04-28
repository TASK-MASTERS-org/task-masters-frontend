import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderService } from '../../../orders/services/order.service';
import { DriverService } from '../../services/driver.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'phoneNumber',"action"];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sortOrders!: MatSort;

  constructor(
    private orderService: OrderService,
    private driverService: DriverService,
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
      }
    }
  
  );
  this.driverService.getDriversList().subscribe((drivers: any) => {
    if (drivers.status === 200) {
      this.dataSource = new MatTableDataSource(drivers.data);
      this.dataSource.sort = this.sortOrders;
    }
  });
  }
  applyFilterOrder(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  assignDriver(driver: any) {
     console.log("`driver`", driver)
  }
  updateDriver(driver: any) {
      console.log("`driver`", driver)
  }
  deleteDriver(driver: any) {
    console.log("`driver`", driver)
  }
  ViewDriver(driver: any) {
    console.log("`driver`", driver)
  }
  addDriver() {
    console.log("first")
  }
}

