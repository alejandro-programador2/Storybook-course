// Importacion de los estilos
import '../src/index.css';

// Registra el msw addon
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Inicializar MSW 
initialize();

// Agregar el MSW addon al decorator global
export const decorators = [mswDecorator]

export const parameters = {
  // Nos permite crear devoluciones de llamada que aparecen en el pantel de acciones.
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
		  color: /(background|color)$/i,
		  date: /Date$/,
		},
	  },
};
