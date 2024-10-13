import Footer from "@/components/footer";
import Header from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
