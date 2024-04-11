import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MemberLayoutComponent } from './components/member-layout/member-layout.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MemberLayoutComponent,
    AdminLayoutComponent,
    SideNavBarComponent
  ],
  imports: [
    CommonModule, RouterModule
  ]
})
export class CoreModule { }
