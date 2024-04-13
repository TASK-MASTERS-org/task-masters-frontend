import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberLayoutComponent } from './modules/core/components/member-layout/member-layout.component';
import { AdminLayoutComponent } from './modules/core/components/admin-layout/admin-layout.component';

const routes: Routes = [
  // { path: 'homepage', loadChildren: () => import('./modules/features/homepage/homepage.module').then(m => m.HomepageModule) }

  {
    path: '',
    component: MemberLayoutComponent,
    children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default route
      {
        path: 'homepage',
        loadChildren: () =>
          import('./modules/features/homepage/homepage.module').then(
            (m) => m.HomepageModule
          ),
      },
      {
        path: 'job-feedback-management',
        loadChildren: () =>
          import(
            './modules/features/job-feedback-management/job-feedback-management.module'
          ).then((m) => m.JobFeedbackManagementModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/features/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'job-post',
    loadChildren: () =>
      import('./modules/features/job-post/job-post.module').then(
        (m) => m.JobPostModule
      ),
  },
  {
    path: 'job-feedback-management',
    loadChildren: () =>
      import(
        './modules/features/job-feedback-management/job-feedback-management.module'
      ).then((m) => m.JobFeedbackManagementModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
