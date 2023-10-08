
import * as  React from "react";
import Navbar from "../container/Navbar"
import Footer from "../container/Footer";

export default function Layout({ children }: any) {
  return (
    <div className="root-background">
<Navbar />
      <main>{children}</main>
<Footer/>
    </div>
  );
}
