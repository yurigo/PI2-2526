# Sesión 1: Introducción a Node.js y Express

** fecha **: 2 de febrero de 2026

### Introducción al curso

- **Contexto**: Conocimientos previos de HTML, CSS, JavaScript y experiencia en microcontroladores
- **Objetivo**: Desarrollar proyectos interactivos web con modelo cliente-servidor
- **Metodología**: Enfoque práctico con proyectos incrementales
- **Evaluación**: Proyecto final interactivo web + servidor

### Herramientas del ecosistema

- **Node.js**: Runtime de JavaScript del lado del servidor
- **npm**: Gestor de paquetes de Node.js
- **Git/GitHub**: Control de versiones y colaboración
- **Visual Studio Code**: Editor de código con extensiones útiles

## 🛠️ Herramientas instaladas

### Node.js

> **¿Qué es?** Runtime que permite ejecutar JavaScript fuera del navegador
> **¿Por qué?** Nos permite usar JavaScript tanto en frontend como en backend

### npm (Node Package Manager)

> **¿Qué es?** Gestor de dependencias que viene incluido con Node.js
> **¿Por qué?** Nos permite instalar librerías y herramientas fácilmente

### Git & GitHub

> **¿Qué es?** Sistema de control de versiones y plataforma de colaboración
> **¿Por qué?** Esencial para el desarrollo profesional y trabajo en equipo

### Visual Studio Code

> **¿Qué es?** Editor de código gratuito y extensible
> **¿Por qué?** Excelente soporte para JavaScript/Node.js y debugging

## 🧪 Explorando Node.js

### 1. Node.js REPL (Read-Eval-Print Loop)

```bash
$ node
> console.log("¡Hola desde Node.js!")
¡Hola desde Node.js!
> 2 + 3
5
> .exit
```

> **Concepto clave**: REPL es un entorno interactivo para probar código JavaScript en tiempo real

### 2. Ejecutando archivos JavaScript

```javascript
// index.js
console.log("¡Mi primer archivo ejecutado con Node.js!");
```

```bash
$ node index.js
¡Mi primer archivo ejecutado con Node.js!
```

## 🚀 Primer proyecto: "helloworld"

### Inicialización del proyecto

```bash
$ npm init
```

> **¿Qué hace?** Crea un archivo `package.json` que describe nuestro proyecto

#### Anatomía del package.json generado:

```json
{
  "name": "helloworld", // Nombre del proyecto
  "version": "1.0.0", // Versión semántica
  "main": "index.js", // Punto de entrada
  "scripts": {
    // Comandos automatizados
    "start": "node index.js"
  },
  "dependencies": {}, // Librerías de producción
  "devDependencies": {} // Librerías solo para desarrollo
}
```

### Instalación de dependencias

#### Chalk - Para colorear la consola

```bash
$ npm install chalk
```

> **¿Por qué Chalk?** Mejora la experiencia de desarrollo añadiendo colores a la consola

```javascript
import chalk from "chalk";
console.log(chalk.blue("¡Texto en azul!"));
console.log(chalk.red.bold("¡Texto rojo y negrita!"));
```

#### Express - Framework web

```bash
$ npm i express
```

> **¿Qué es Express?** Framework minimalista para crear servidores web en Node.js
> **¿Por qué Express?** Simplifica enormemente la creación de APIs y servidores web

### Scripts de npm

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

> **Concepto**: Los scripts nos permiten automatizar tareas comunes

```bash
$ npm run start    # Ejecuta node index.js
$ npm run dev      # Ejecuta nodemon index.js
```

## 🏗️ Construyendo nuestro servidor

### Código base del servidor Express

```javascript
import express from "express";
import chalk from "chalk";

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Ruta de prueba
app.get("/heartbeat", (req, res) => {
  res.send("❤️ Servidor funcionando");
});

app.listen(port, () => {
  console.log(
    chalk.yellowBright(`🚀 Servidor ejecutándose en http://localhost:${port}`),
  );
});
```

### Conceptos clave explicados:

#### ¿Qué es una ruta?

```javascript
app.get("/heartbeat", (req, res) => {
  res.send("❤️ Servidor funcionando");
});
```

> **Ruta**: Define cómo responde el servidor a peticiones específicas
> **GET**: Método HTTP para obtener datos
> **req**: Objeto con información de la petición
> **res**: Objeto para enviar la respuesta

## 🌐 Arquitectura Cliente-Servidor

```
┌─────────────┐    HTTP Request     ┌─────────────┐
│             │ ──────────────────> │             │
│   CLIENTE   │                     │  SERVIDOR   │
│ (Navegador) │ <────────────────── │ (Node.js +  │
│             │    HTTP Response    │  Express)   │
└─────────────┘                     └─────────────┘
```

### Flujo típico:

1. **Cliente** (navegador) hace petición HTTP
2. **Servidor** recibe y procesa la petición
3. **Servidor** envía respuesta HTTP
4. **Cliente** renderiza la respuesta

### En nuestro ejemplo:

- `http://localhost:3000/heartbeat` → Responde con mensaje del servidor

## 🔧 Mejorando la experiencia de desarrollo

### Nodemon - Reinicio automático

```bash
$ npm i -D nodemon
```

> **¿Qué hace?** Reinicia automáticamente el servidor cuando detecta cambios
> **¿Por qué -D?** Es una dependencia de desarrollo, no necesaria en producción

```json
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

### Beneficios de usar nodemon:

- ✅ No necesitas reiniciar manualmente el servidor
- ✅ Detecta cambios en archivos JavaScript
- ✅ Acelera el ciclo de desarrollo

## 📁 Estructura del proyecto final

```
helloworld/
├── package.json          # Configuración del proyecto
├── index.js              # Servidor Express
├── public/               # Archivos estáticos
│   ├── index.html        # Página principal
│   └── otro.html         # Página secundaria
└── node_modules/         # Dependencias (auto-generado)
```

## 💡 Conceptos importantes aprendidos

1. **Node.js vs JavaScript del navegador**:
   - Node.js permite JavaScript en servidor
   - Acceso al sistema de archivos
   - Sin DOM, pero con módulos del sistema

2. **npm como ecosistema**:
   - Millones de paquetes disponibles
   - Gestión automática de dependencias
   - Scripts para automatizar tareas

3. **Express como framework web**:
   - Simplifica la creación de servidores
   - Sistema de routing flexible
   - Amplio ecosistema de middleware

4. **Arquitectura cliente-servidor**:
   - Separación de responsabilidades
   - Comunicación via HTTP
   - Escalabilidad y mantenibilidad

## 🏠 Tareas para la próxima sesión

### 📺 Video obligatorio

- [¿Qué es Node.js y npm?](https://www.youtube.com/watch?v=yB4n_K7dZV8)

### 🧠 Reflexiones

1. ¿Qué ventajas tiene usar JavaScript tanto en frontend como en backend?
2. ¿Cómo funciona el sistema de módulos de Node.js?
3. ¿Qué otros tipos de aplicaciones se pueden crear con Node.js además de servidores web?

### 🔍 Investigación opcional

- Explora la documentación oficial de Express: https://expressjs.com/
- Investiga qué son los middlewares y busca ejemplos comunes
