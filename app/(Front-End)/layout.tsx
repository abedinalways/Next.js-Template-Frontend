import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "react-datepicker/dist/react-datepicker.css";

export default function FrontEndLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
