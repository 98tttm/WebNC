import { Routes } from '@angular/router';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb1 } from './ptb1/ptb1';
import { Ex14 } from './ex14/ex14';
import { Ex13 } from './ex13/ex13';
import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { Ex18 } from './ex18/ex18';
import { Ex19 } from './ex19/ex19';
import { Product } from './ex19/product/product';
import { ListProduct } from './ex19/list-product/list-product';
import { ServiceProduct } from './ex19/service-product/service-product';
import { FakeProductComponent } from './fake-product/fake-product';
import { BitcoinComponent } from './bitcoin/bitcoin';
import { TemplateFormComponent } from './template-form/template-form';
import { ReactiveFormComponent } from './reactive-form/reactive-form';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: Listcustomer, title: 'Danh sách khách hàng' },
  { path: 'customers/filter', component: Listcustomer2, title: 'Lọc khách hàng' },
  { path: 'customer/:id', component: Customerdetail, title: 'Chi tiết khách hàng' },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'binding', component: Learnbinding },
  { path: 'ptb1', component: Ptb1 },
  { path: 'ex14', component: Ex14 },
  { path: 'ex13', component: Ex13 },
  { path: 'service-product-image-event', component: ServiceProductImageEvent },
  { path: 'service-product-image-event/:id', component: ServiceProductImageEventDetail },
  { path: 'ex18', component: Ex18 },
  { path: 'exercise-18', redirectTo: 'ex18', pathMatch: 'full' },
  { path: 'ex19', component: Ex19 },
  { path: 'exercise-19', redirectTo: 'ex19', pathMatch: 'full' },
  { path: 'product', component: Product },
  { path: 'list-product', component: ListProduct },
  { path: 'service-product', component: ServiceProduct },
  { path: 'fake-product', component: FakeProductComponent },
  { path: 'bitcoin', component: BitcoinComponent },
  { path: 'template-form', component: TemplateFormComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
];


