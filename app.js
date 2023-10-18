//Modulos del NodeJs
require('colors');
const fs = require('fs');

//Modulos del proyecto
const datosArchivo = require('./datos.json');
const { verify } = require('crypto');

const main = async() => {
    console.clear();
    console.log('*********************************************************************');
    console.log(`************************  ` + `PROYECTO CLASES`.bgYellow,    `***************************`);
    console.log('*********************************************************************\n');

    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor(){
            this.#codigoProducto = '';
            this.#inventarioProducto = '';
            this.#nombreProducto = 0;
            this.#precioProducto =0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }
        get getCodigoProducto(){
            return this.#codigoProducto;
        }
        set setInventarioProducto(value){
            this.#inventarioProducto = value;
        }
        get getInventarioProducto(){
            return this.#inventarioProducto;
        }
        set setNombreProducto(value){
            this.#nombreProducto = value;
        }
        get getNombreProducto(){
            return this.#nombreProducto;
        }
        set setPrecioProducto(value){
            this.#precioProducto = value;
        }
        get getPrecioProducto(){
            return this.#precioProducto;
        }
    }

    class ProductosTienda{
        #listaProducto;
        constructor(){
            this.#listaProducto = [];
        }
        get getListaProductos(){
            return this.#listaProducto;
        }

        cargaArchivosProductos(){
            //Leer los datos de un archivo JSON
            //Serializarlos para trabajar los datos como un arreglo de objetos de clase productos
            let contador = 0;
            if (datosArchivo.length > 0) {
                datosArchivo.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setCodigoProducto = objeto.codigoProducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setInventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;
                    this.#listaProducto.push(producto);
                });
            } else {
                console.log('ERROR, el archivo de datos.json no contiene datos\n'.bgRed);
                          
            }
            console.log(`Total de productos cargados ==> `.bgBlue + `${contador} `.bgRed);
        }

        grabarArchivoProductos(){
            //Escribir datos en un archivo almacenado en unidad
            //Deserializacion para convertir un arreglo de objetos de clase en cadena JSON
            const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
                return {
                    codigoProducto: producto.getCodigoProducto,
                    nombreProducto: producto.getNombreProducto,
                    inventarioProducto: producto.getInventarioProducto,
                    precioProducto: producto.getPrecioProducto
                };
            });
            //convertir de array a cadena json
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);
            //Variable con el nombre del archivo
            const nombreArchivo = 'datos.json';
            //grabar la cadena JSON en el archivo
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);
        }

        mostrarProductos(){
            this.getListaProductos.forEach(producto => {
                console.log(`  │    ` + producto.getCodigoProducto + `     │` + 
                            `  │    ` + producto.getNombreProducto + `     │` +
                            `  │    ` + producto.getInventarioProducto + `      │` +
                            `  │    ` + producto.getPrecioProducto + `    │`);
            });
        }
        
    }
    let productosTienda = new ProductosTienda;

    productosTienda.cargaArchivosProductos();

    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    productosTienda.mostrarProductos();

    productosTienda.getListaProductos.forEach(producto =>{
        producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProductos();
    productosTienda.grabarArchivoProductos();

}
main();
  