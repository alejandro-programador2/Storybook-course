// Importacion de los estilos
import '../src/index.css';

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
