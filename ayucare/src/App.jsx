import React, { useState } from "react";
import * as api from './api'
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Search, Testimonials, Hero } from "./components";

const App = () => {

  const [tags, setTags] = useState([]);
  const [medicines,setMedicines] = useState([])
  const [phrama,setPharma] = useState([])

  const fetchMedicines = async ()=>{
    console.log(tags)

        const {data} = await api.getMedicines({indications: tags})
        setMedicines(data)
  }
  const fetchPharmacologicalProperties = async (name)=>{
    console.log(name)
        const {data} = await api.getPharmacologicalProperties(name)
        console.log(data)
        setPharma(data)
  }
  fetchPharmacologicalProperties("Abhayarishta")
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
        <Search tags={tags} setTags={setTags} fetchMedicines={fetchMedicines}/>
        <Business />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
)};

export default App;
