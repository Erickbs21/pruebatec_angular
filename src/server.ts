import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Ejemplo de puntos de entrada de la API REST de Express se pueden definir aquí.
 * Descomente y defina los puntos de entrada según sea necesario.
 *
 * Ejemplo:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Manejar solicitud de API
 * });
 * ```
 */

/**
 * Servir archivos estáticos desde /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Manejar todas las demás solicitudes renderizando la aplicación Angular.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Iniciar el servidor si este módulo es el punto de entrada principal, o si se ejecuta a través de PM2.
 * El servidor escucha en el puerto definido por la variable de entorno `PORT`, o por defecto en 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Manejador de solicitudes utilizado por Angular CLI (para el servidor de desarrollo y durante la compilación) o Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
