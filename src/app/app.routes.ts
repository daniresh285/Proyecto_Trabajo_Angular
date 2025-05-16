import { Routes } from '@angular/router';
import { Pagina1Component } from './pagina1/pagina1.component';
import { Pagina2Component } from './pagina2/pagina2.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'pagina1', pathMatch: 'full' },
    { path: 'pagina1', component: Pagina1Component },
    { path: 'pagina2', component: Pagina2Component },
    { path: '**', redirectTo: '/pagina1' } 
];