import './globals.css';

export const metadata = {
  title: 'Трекер расходов',
  description: 'Простой учёт личных трат',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
