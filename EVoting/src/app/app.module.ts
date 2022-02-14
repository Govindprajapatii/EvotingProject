import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { VoterModule } from './voter/voter.module';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { AdminAuthGuard } from './AuthGuard/AdminAuthGuard';
import { SuperAdminAuthGuard } from './AuthGuard/SuperAdminAuthGuard';
import { AuthGuard } from './AuthGuard/auth-gaurd.guard';
import { VoterAuthGuard } from './AuthGuard/voterAuthGuard';
import { NgHttpLoaderModule } from 'ng-http-loader';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SuperAdminModule,
    HttpClientModule,
    AdminModule,
    VoterModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot(),
    
    ],
  
  providers: [
    AdminAuthGuard,
    SuperAdminAuthGuard,
    AuthGuard,
    VoterAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
  ],
 
  bootstrap: [AppComponent],

})
export class AppModule { }
