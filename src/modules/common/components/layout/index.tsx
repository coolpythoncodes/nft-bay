import { useState, type ReactNode, useEffect } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted ? (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  ) : null;
};

export default Layout;
