import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
  private authService: AuthService,
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
){} 

  login(){

  const data = {
    email: this.email,
    password: this.password
  };

  this.authService.login(data).subscribe({

    next:(res:any)=>{

      localStorage.setItem("token", res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem("role", res.user.role);
      

      if(res.user.role === 'boss'){
        this.router.navigate(['/boss/dashboard']);
      }else{
        this.router.navigate(['/employee']);
      }

    },

    error:()=>{
      alert("Correo o contraseña incorrectos");
    }

  });

}
ngOnInit(){

  if (isPlatformBrowser(this.platformId)) {

    if(localStorage.getItem('token')){
      localStorage.clear();
    }

  }

}
}