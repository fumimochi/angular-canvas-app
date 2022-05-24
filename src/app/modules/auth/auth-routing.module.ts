import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutes } from "src/app/core/routes";
import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./modules/sign-in/sign-in.component";
import { SignOutComponent } from "./modules/sign-out/sign-out.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '', redirectTo: AppRoutes.RouteEnum.SIGN_IN, pathMatch: 'full'
            },
            {
                path: AppRoutes.RouteEnum.SIGN_IN,
                component: SignInComponent
            }, 
            {
                path: AppRoutes.RouteEnum.SIGN_OUT,
                component: SignOutComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }