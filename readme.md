# Módulo de Cotización de Préstamos para Motocicletas

Este proyecto es una prueba técnica desarrollada en Angular que permite cotizar préstamos para motocicletas utilizando el sistema de amortización francés.

## Requerimientos Implementados

1.  **Arquitectura Modular**: Organización limpia en carpetas `core`, `shared` y `features`.
2.  **Formularios Reactivos**: Uso de `ReactiveFormsModule` con validaciones estrictas:
    - **Nombre**: Solo caracteres alfabéticos.
    - **Monto**: Hasta Q 60,000.
    - **Tasa**: Rango de 0% a 20%.
    - **Plazo**: Hasta 60 meses.
3.  **Sistema Francés**: Cálculo automático de cuotas mediante la fórmula de amortización constante.
4.  **Diseño Premium**: Interfaz moderna con efectos de _Glassmorphism_ y diseño responsivo.
5.  **Componentes Reutilizables**: Encabezados e inputs personalizados con `ControlValueAccessor`.

## Tecnologías Utilizadas

- Angular 17+ (Componentes Standalone)
- Reactive Forms
- CSS Moderno (Glassmorphism)
- TypeScript

## Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clonar el repositorio**:

    ```bash
    git clone [url-del-repositorio]
    cd pruebatec_angular
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Ejecutar la aplicación**:

    ```bash
    ng serve
    ```

4.  **Acceder a la aplicación**:
    Abre tu navegador en `http://localhost:4200`
