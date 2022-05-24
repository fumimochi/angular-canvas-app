import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { SignInComponent } from './modules/sign-in/sign-in.component';
import { SignOutComponent } from './modules/sign-out/sign-out.component';

@NgModule({
    declarations: [
        AuthComponent,
        SignInComponent,
        SignOutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }