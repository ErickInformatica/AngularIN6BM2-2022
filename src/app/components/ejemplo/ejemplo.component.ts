import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Producto } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.scss'],
  providers: [ ProductosService, UsuarioService ]
})
export class EjemploComponent implements OnInit {
  title = 'Ejemplo';
  personas = [
    { nombre: 'Juan Solares', edad: 24 },
    { nombre: 'Cristian Quiñonez', edad: 15 },
    { nombre: 'Luis Perez', edad: 42 },
    { nombre: 'Iker Sandoval', edad: 8 }
  ];

  public token;


  //Productos
  public productoModelGet: Producto;
  public productoModelPost: Producto;

  constructor(
      private _productoService: ProductosService,
      private _usuarioService: UsuarioService
    ) {
    this.productoModelPost = new Producto('','',0,0,0);
    this.token = this._usuarioService.obtenerToken()
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this._productoService.obtenerProductos(this.token).subscribe(
      (response) => {
        this.productoModelGet = response.productos;
        console.log(this.productoModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postProductos(){
    this._productoService.agregarProducto(this.productoModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  deleteProductos(idProducto) {
    this._productoService.eliminarProducto(idProducto).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

}
