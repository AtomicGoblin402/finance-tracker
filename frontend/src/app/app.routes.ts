import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {RegisterComponent} from './auth/register/register';

export const routes: Routes = [
    {path: '', redirectTo: '/register', pathMatch: 'full'}, // Redirect to register by default
    {path: 'register', component: RegisterComponent} // Add this route
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule {}
