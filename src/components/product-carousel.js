import React from "react"
import PropTypes from "prop-types"
import GatsbyImage from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import classNames from "classnames"
import {FaChevronDown, FaChevronLeft, FaChevronUp, FaChevronRight} from "react-icons/fa"

const Carousel = ({ products, total }) => {
  const [activeSlides, setActiveSlides] = React.useState({
    current: 1,
    prev: 0,
    next: 2
  })

  const nextSlide = () => {
    if (activeSlides.next + 1 === products.length) {
      return
    }

    setActiveSlides({
      current: activeSlides.current + 1,
      prev: activeSlides.prev + 1,
      next: activeSlides.next + 1
    })
  }

  const prevSlide = () => {
    if (activeSlides.prev - 1 < 0) {
      return
    }

    setActiveSlides({
      current: activeSlides.current - 1,
      prev: activeSlides.prev - 1,
      next: activeSlides.next - 1
    })
  }

  const hasNext = () => {
    return activeSlides.next + 1 !== products.length
  }

  const hasPrev = () => {
    return activeSlides.prev - 1 >= 0
  }

  const productImages = useStaticQuery(graphql`
      query ProductImagesQuery {
          allImageSharp(filter: {fluid: {originalName: {regex: "/product[1-9]*.png/i"}}}) {
              nodes {
                  fixed {
                      ...GatsbyImageSharpFixed
                      originalName
                  }
              }
          }
      }
  `)

  return (
    <div className={"slideshow-container"}>
      {hasPrev() && (<FaChevronUp className={"slideshow-prev"} onClick={() => prevSlide()}/>)}
      {products.map((p, index) => (
        <div className={classNames({
          "slide": true,
          "inactive": activeSlides.current !== index && activeSlides.prev !== index && activeSlides.next !== index,
          "current": activeSlides.current === index,
          "prev": activeSlides.prev === index,
          "next": activeSlides.next === index
        })}
             key={index}>
          <div className={"product-details"}>
            <div className={"product-img-container"}>
              <div className={"product-img-background"}
                   style={{ width: activeSlides.current === index ? "65%" : "50%" }}>

              </div>
              <GatsbyImage imgStyle={{
                objectFit: "contain"
              }} className={"product-img"}
                           fixed={productImages.allImageSharp.nodes.find(node => node.fixed.originalName === p.image).fixed}/>
            </div>
            <div className={"product-description"}>
              <ul>
                <li style={{ fontSize: "25px", fontWeight: 600 }}>{p.name}</li>
                <li style={{ fontSize: "15px", fontWeight: 400 }}>{p.description}</li>
                <li>&nbsp;</li>
                <li style={{ fontSize: "25px", fontWeight: 600 }}>{p.price} &euro;</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
      {hasNext() && (<FaChevronDown className={"slideshow-next"} onClick={() => nextSlide()}/>)}
      <div style={{float: "left"}}>
        {hasPrev() && (<FaChevronLeft className={"slideshow-mobile-prev"} onClick={() => prevSlide()}/>)}
      </div>
      <div style={{float: "right"}}>
        {hasNext() && (<FaChevronRight className={"slideshow-mobile-next"} onClick={() => nextSlide()}/>)}
      </div>
      <br/>
      <hr className={"divider"}/>
      <div style={{float: "left", color: "white"}}>
        <b>Order total:</b>
      </div>
      <div style={{float: "right", color: "white"}}>
        <b>{total} &euro;</b>
      </div>
    </div>
  )
}

Carousel.defaultProps = {
  products: [],
  total: 0
}

Carousel.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number
}

export default Carousel