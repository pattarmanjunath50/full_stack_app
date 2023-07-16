import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';

const routes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'enquiry-list', component: EnquiryListComponent },
      { path: '**', redirectTo: '/dashboard/enquiry', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/dashboard/enquiry', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard/enquiry', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
