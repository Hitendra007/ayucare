import React, { useState } from "react";

import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Search, Testimonials, Hero } from "./components";

const App = () => {

  const [tags, setTags] = useState([]);

  return (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Search tags={tags} setTags={setTags} />
        <Business />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
)};

export default App;
