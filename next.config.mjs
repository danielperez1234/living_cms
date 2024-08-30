/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/cms',
    images: {
        // Asegúrate de que los dominios permitidos sean correctos si estás cargando imágenes de un dominio externo
        domains: ['64.23.178.44'], // Cambia esto según sea necesario
      },
};

export default nextConfig;
