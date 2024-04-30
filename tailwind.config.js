module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Archivos de tu aplicación React
  ],
  theme: {
    extend: {
      fontFamily: {
        'nova': ['Nova Slim', 'cursive'],
      }
    }, // Puedes extender o personalizar el tema aquí si lo necesitas
  },
  plugins: [], // Puedes agregar plugins adicionales aquí si lo deseas
};

