import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductCarousel from "../components/product-carousel"
import BankCardPicker from "../components/bank-card-picker"
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import discover from "../images/discover.svg";
import americanExpress from "../images/american-express.svg";

const IndexPage = () => {
  const products = [{
    name: "Nike Air Force",
    image: "product1.png",
    description: "Men lifestyle shoes / Size 46 / Size 46",
    price: 59.99
  }, {
    name: "Nike Air Zoom",
    image: "product2.png",
    description: "Men running shoes / Size 46",
    price: 59.99
  }, {
    name: "Nike Air Force",
    image: "product1.png",
    description: "Men lifestyle shoes / Size 46",
    price: 59.99
  }, {
    name: "Nike Air Zoom",
    image: "product2.png",
    description: "Men running shoes / Size 46",
    price: 59.99
  }, {
    name: "Nike Air Force",
    image: "product1.png",
    description: "Men lifestyle shoes / Size 46",
    price: 59.99
  }]

  const paymentMethods = [{
    name: "Mastercard",
    image: mastercard
  }, {
    name: "Visa",
    image: visa
  }, {
    name: "American Express",
    image: americanExpress
  }, {
    name: "Discover",
    image: discover
  }]

  return (
    <Layout>
      <SEO title="Home"/>
      <div className={"container"}>
        <div className={"card"}>
          <div className={"card-products-container"}>
            <div className={"card-content"}>
              <div className={"card-inner-container"}>
                <h2 style={{ color: "white" }}>Summary</h2>
                <div style={{ height: "100%" }}>
                  <ProductCarousel products={products} total={299.95}/>
                </div>
              </div>
            </div>
          </div>
          <div className={"card-payment-container"}>
            <div className={"card-content"}>
              <div className={"card-inner-container"}>
                <h2 style={{ color: "#3b3e71" }}>Order</h2>
                <div>
                  <BankCardPicker paymentMethods={paymentMethods}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
