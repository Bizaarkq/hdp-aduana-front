import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tipo_usuario: any;
  archivos: any;
  constructor(
    private FB: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tipo_usuario = localStorage.getItem("username");
    this.getArchivos();
  }

  getArchivos(){
    this.authService.getArchivos().subscribe({
      next: (data) => {
        this.archivos = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verArchivo(id: any){
    this.router.navigate(['/archivo', id]);
  }

  eliminarArchivo(id:any){
    this.authService.eliminarArchivo(id).subscribe({
      next: (data) => {
        this.getArchivos();
      },
      error: (err) => {
        console.log(err);
      }           
    });
  }

  editarArchivo(id:any){
    
  }

  aprobarArchivo(id:any){
    this.authService.aprobarArchivo(id).subscribe({
      next: (data) => {
        this.getArchivos();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
