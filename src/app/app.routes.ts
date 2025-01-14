import { RegionsComponent } from './pages/regions/regions.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AutorizationComponent } from './pages/autorization/autorization.component';
import { QueryRegionComponent } from './common-ui/query-region/query-region.component';
import { SensorsComponent } from './pages/sensors/sensors.component';
import { SensorComponent } from './pages/sensor/sensor.component';

export const routes: Routes = [
    {
        path: "", component: LayoutComponent,
    },
    { path:'login', component: LoginPageComponent}, 
    { path:'autorization', component: AutorizationComponent},
    {path: 'regions',component: RegionsComponent }, 
    {path: 'region/:id', component: QueryRegionComponent},
    {path: 'sensors', component: SensorsComponent},
    {path: 'sensor/:id', component: SensorComponent}
];
