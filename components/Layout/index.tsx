import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="pt-20 container w-full h-full">{children}</main>
      <Footer />
      <ToastContainer position="top-center" theme="colored" autoClose={1000} />
    </>
  );
};

export default Layout;
