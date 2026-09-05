# Formulario de Registro de Productos

Esta aplicación es un formulario de registro de productos desarrollado con Angular y Reactive Forms. Permite ingresar los datos de un producto, validar que la información sea correcta y simular su registro mediante un servicio.

La aplicación utiliza datos hardcodeados, por lo que no necesita una base de datos o un backend real para funcionar.

Los productos tienen los siguientes datos:

* Nombre
* Descripción
* Precio
* Categoría
* Stock

El formulario valida la información antes de permitir el registro. Si algún campo tiene un dato incorrecto, se muestran mensajes indicando qué debe corregirse.

## Validaciones

Cada campo tiene diferentes reglas para evitar que se ingresen datos incorrectos.

El nombre es obligatorio y debe tener entre 3 y 60 caracteres.

La descripción también es obligatoria y debe tener entre 10 y 200 caracteres.

El precio debe ser obligatorio, mayor a 0.01 y no puede superar los 999999.

La categoría es obligatoria y se selecciona de una lista de categorías disponibles.

El stock debe ser un número entero. Es obligatorio, no puede ser negativo y puede tener un máximo de 100000 unidades.

Los mensajes de error aparecen cuando el usuario ya ha interactuado con un campo. De esta forma, el formulario no muestra errores inmediatamente al abrirse, sino cuando realmente es necesario.

Si se intenta registrar el producto mientras existen errores, todos los campos se marcan para mostrar sus mensajes correspondientes y el registro no se realiza.

## ¿Cómo funciona el formulario?

El formulario está construido utilizando Reactive Forms de Angular. Cada campo del formulario está conectado a un control que permite conocer su valor y su estado de validación.

Cuando el usuario escribe o modifica algún dato, el formulario actualiza automáticamente esa información. Angular se encarga de comprobar las validaciones y determinar si el formulario es válido.

Al presionar el botón de registro, primero se comprueba que todos los campos sean correctos.

Si el formulario tiene errores, se muestran los mensajes correspondientes y no se envía ninguna información.

Si todo está correcto, los datos se envían al `ProductService`, que se encarga de simular el registro del producto.

## Servicio de productos

El `ProductService` funciona como una pequeña simulación de un backend.

Cuando recibe un producto válido, le asigna un ID y lo guarda temporalmente en un arreglo en memoria. También utiliza un pequeño retraso para simular el tiempo que normalmente tomaría una petición a un servidor.

Esto permite trabajar con un flujo parecido al que tendría una aplicación conectada a un backend real, aunque en este caso los datos no se guardan permanentemente.

El servicio también realiza una comprobación adicional de algunos datos antes de guardar el producto, como medida de seguridad para no confiar completamente en la información que recibe.

## Después del registro

Cuando el producto se registra correctamente, la aplicación muestra la información de que el registro fue exitoso y limpia el formulario para que pueda ingresarse otro producto.

Si ocurre algún problema durante el envío, se actualiza el estado de la aplicación para mostrar que el registro no pudo realizarse.

En resumen, el flujo de la aplicación es:

**Ingresar datos → Validar formulario → Mostrar errores si existen → Enviar producto → Simular registro → Limpiar formulario**

## Estructura principal

El proyecto está organizado de manera sencilla para separar las diferentes partes de la aplicación:

```text
src/app/
├── models/
│   └── product.model.ts
├── services/
│   └── product.service.ts
└── components/
    └── product-form/
        ├── product-form.component.ts
        ├── product-form.component.html
        └── product-form.component.css
```

El modelo define cómo está formado un producto, el servicio se encarga de simular el registro y el componente contiene el formulario, sus validaciones y la interfaz que utiliza el usuario.

## Integración en un proyecto Angular

Para utilizar este formulario en otro proyecto Angular, se deben copiar las carpetas `models`, `services` y `components/product-form` dentro de `src/app`.

El componente está creado como `standalone`, por lo que no es necesario agregarlo a un `NgModule`. Solo se debe importar el componente donde se quiera utilizar.

Por ejemplo:

```ts
import { ProductFormComponent } from './app/components/product-form/product-form.component';

@Component({
  standalone: true,
  imports: [ProductFormComponent],
  template: `<app-product-form></app-product-form>`
})
export class AppComponent {}
```

Con esto, el formulario puede utilizarse dentro de la aplicación y comenzar a registrar productos.
