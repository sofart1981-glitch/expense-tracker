/** @type {import('next').NextConfig} */
// Статическая сборка для GitHub Pages. Сайт живёт по адресу
// https://<user>.github.io/expense-tracker/, поэтому нужен basePath.
// Локально (npm run dev) basePath пустой: NEXT_PUBLIC_BASE_PATH задаёт только workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
