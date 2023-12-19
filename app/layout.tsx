import './globals.css'

export const metadata = {
  title: 'Simple Todo App',
  description: 'Simple Todo App by Clara',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
