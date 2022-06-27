import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  aduanas_options: any[] = [];
  municipios_options: any[] = [];
  departamentos_options: any[] = [];
  depart_select: string = '';
  numero_registro: any;
  id_cliente: FormGroup = this.FB.group({
    id_cliente: [''],
    nombre_cliente: [''],
    apellido_cliente: [''],
    dui_cliente: [''],
    nit_cliente: [''],
    direccion_cliente: [''],
    empresa: [''],
    telefono_cliente: [''],
    genero: ['']
  });

  id_aduana: FormGroup = this.FB.group({
    id_aduana: [''],
    nombre_aduana: ['']
  });

  id_transporte: FormGroup = this.FB.group({
    id_transporte:  [''],
      numero_vin: [''],
      numero_motor:  [''],
      numero_chasis:  [''],
      ano:  [''],
      marca:  [''],
      capacidad_maxima:  [''],
      modelo:  [''],
      numero_placas:  [''],
      procedencia:  [''],
      destino:  ['']
  });

  id_municipio: FormGroup = this.FB.group({
    id_municipio: [''],
    nombre_municipio: ['']
  });

  id_carga: FormGroup = this.FB.group({
    id_carga: [''],
    tipo: [''],
    peso: [''],
    descripcion: [''],
  });

  archivoForm = this.FB.group({
    id_cliente: this.id_cliente,
    id_aduana: this.id_aduana,
    id_transporte: this.id_transporte,
    id_municipio: this.id_municipio,
    id_carga: this.id_carga,
    numero_registro: [''],
    id_archivo: ['']
  });

  constructor(
    private FB: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.numero_registro = this.route.snapshot.paramMap.get('id');
    this.getAduanas();
    this.getDepartamentos();
    if(this.numero_registro) this.authService.getArchivo(this.numero_registro).subscribe({
      next: (data) => {
        this.archivoForm.patchValue(data);
        console.log(this.archivoForm);
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  guardar(){
    console.log(this.archivoForm.value);
    if(this.numero_registro){
      this.authService.updateArchivo(this.archivoForm.value).subscribe({
        next: (data) => {
          alert(data.message);
        },
        error: (err) => {
          alert(err.message);
        }
      });
    }else{
      this.authService.crearArchivo(this.archivoForm.value).subscribe({
        next: (data) => {
          alert(data.message);
        },
        error: (err) => {
          alert(err.message);
        }
      });
    }
  }

  getAduanas(){
    this.authService.getAduanas().subscribe({
      next: (data) => {
        this.aduanas_options = data;
      }
    });
  }

  getDepartamentos(){
    this.authService.getDepartamentos().subscribe({
      next: (data) => {
        console.log(data);
        this.departamentos_options = data;
      }
    });
  }
  getMunicipios(id_depart:any){
    this.authService.getMunicipios(id_depart).subscribe({
      next: (data) => {
        this.municipios_options = data;
      }
    });
  }
}
