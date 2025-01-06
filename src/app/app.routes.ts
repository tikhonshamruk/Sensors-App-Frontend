import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AutorizationComponent } from './pages/autorization/autorization.component';

export const routes: Routes = [
    {
        path: "", component: LayoutComponent,
    },
    { path:'login', component: LoginPageComponent}, 
    { path:'autorization', component: AutorizationComponent}
];
