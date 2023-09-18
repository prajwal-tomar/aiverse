export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
        <div className="hidden w-44 fixed left-0 top-0 h-screen bg-slate-900 md:flex md:flex-col">
            <h1 className="text-white">aiverse</h1>
            <h1 className="text-white">aiverse</h1>
            <h1 className="text-white">aiverse</h1>
        </div>
        <main className="md:pl-44">
            Main Page
            {children}
        </main>
    </div>
  )
}
