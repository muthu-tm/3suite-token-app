import React from "react";
import Home from "../components/Home/Home";
import Product from "../components/Products/Product";
import Features from "../components/Features/Features";
import Newsletter from "../components/Newsletter/Newsletter";
import NewsletterSubscribe from "../components/Newsletter/Subscribe";

function HomePage() {
  return (
    <div>
      <Home />
      <Product />
      <Features />
      {/* <Newsletter /> */}
      <NewsletterSubscribe/>
    </div>
  );
}

export default HomePage;
