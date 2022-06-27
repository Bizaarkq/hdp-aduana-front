import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  formLogin!: FormGroup;

  constructor( private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService
      .iniciarSesion(
        this.formLogin.value.username,
        this.formLogin.value.password
      )
      .subscribe(
        {
          next: res => {
            localStorage.setItem('token', res.token);
            setTimeout( ()=>{
              this.datosUser();
              this.router.navigate(['']);
            }, 600);
            
          },
          error: err =>{
            alert("No se puedeo iniciar sesion");
          }
        }
      );
  }

  datosUser(){
    this.authService.getUserInfo().subscribe(
      {
        next: res => {
          localStorage.setItem('username', res.username);
        }
      }
    );
  }

}
