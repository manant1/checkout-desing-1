import React from "react"
import PropTypes from "prop-types"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import * as classnames from "classnames"
import CustomInput from "./input"
import { useForm } from "react-hook-form"
import CustomSelect from "./select"
import { monthOptions, yearOptions } from "../shared/data/bank-cards-data"
import { useSwipeable } from "react-swipeable"

const BankCardPicker = ({ paymentMethods }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(paymentMethods[0].name)
  const [activeMethods, setActiveMethods] = React.useState({
    prev: 0,
    current: 1,
    next: 2
  })

  const [formData, setFormData] = React.useState({
    cardHolder: "***** *****",
    cardNumber: "***** ***** **** ****",
    expirationMonth: "MM",
    expirationYear: "YYYY",
    ccv: "***"
  })

  const [slideAnimation, setSlideAnimation] = React.useState(null)

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange"
  })


  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  const next = () => {
    if (activeMethods.next + 1 === paymentMethods.length + 1) {
      return
    }

    setSlideAnimation("right")

    setSelectedPaymentMethod(paymentMethods[activeMethods.current + 1].name)

    setActiveMethods({
      current: activeMethods.current + 1,
      prev: activeMethods.prev + 1,
      next: activeMethods.next + 1
    })
  }

  const prev = () => {
    if (activeMethods.prev - 1 === -2) {
      return
    }

    setSlideAnimation("left")

    setSelectedPaymentMethod(paymentMethods[activeMethods.current - 1].name)

    setActiveMethods({
      current: activeMethods.current - 1,
      prev: activeMethods.prev - 1,
      next: activeMethods.next - 1
    })
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  return (
    <>
      <div className={"bank-cards-picker-container"}>
        <div className={"slider-nav"} style={{ marginLeft: -10 }} onClick={() => prev()}><FaChevronLeft/></div>
        <ul className={"bank-cards-wrapper"} {...handlers}>
          {paymentMethods.map((m, index) => (
            <li key={index} className={classnames({
              "bank-card": true,
              "move-out-from-left": slideAnimation === "left" && activeMethods.next === index,
              "move-out-from-right": slideAnimation === "right" && activeMethods.prev === index,
              "move-out-center-to-left": slideAnimation === "left" && activeMethods.current === index,
              "move-out-center-to-right": slideAnimation === "right" && activeMethods.current === index,
              "bank-card-current": activeMethods.current === index,
              "bank-card-prev": activeMethods.prev === index,
              "bank-card-next": activeMethods.next === index,
              "hidden": activeMethods.current !== index && activeMethods.prev !== index && activeMethods.next !== index
            })}>
              <div className={"bank-card-content"}>
                <div className={"row"}>
                  <div className={"col"}>
                    <img className={"payment-icon"} src={m.image} alt={m.name}/>
                  </div>
                </div>
                <br/>
                <br/>
                <div className={"row"} style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  <p>{formData.cardNumber}</p>
                </div>
                <div className={"row"}>
                  <div className={"col-8"} style={{ fontSize: "0.8rem", fontWeight: 300 }}>CARD HOLDER</div>
                  <div className={"col-4"} style={{ fontSize: "0.8rem", fontWeight: 300 }}>EXPIRE DATE</div>
                </div>
                <div className={"row"}>
                  <div className={"col-8"}
                       style={{ fontSize: "1rem", fontWeight: 500 }}>{formData.cardHolder.toUpperCase()}</div>
                  <div className={"col-4"} style={{
                    fontSize: "1rem",
                    fontWeight: 500
                  }}>{formData.expirationMonth <= 9 && "0"}{formData.expirationMonth}/{formData.expirationYear.substring(2, 4)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={"slider-nav"} style={{ marginRight: -10 }} onClick={() => next()}><FaChevronRight/></div>
      </div>
      <div className={"bank-cards-picker-container-mobile"}>
        <div className={"row"}>
          {paymentMethods.map((m, i) => (
            <button onClick={() => setSelectedPaymentMethod(m.name)} key={i}
                    className={classnames("payment-type-btn", "col-6")}>
              <div className={classnames({
                "payment-type-btn-container": true,
                "active": m.name === selectedPaymentMethod
              })}>
                <img src={m.image} alt={m.name}/><span>{m.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <br/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"row"}>
          <div className={"col"}>
            <CustomInput id={"card-holder"} name={"cardHolder"} autocomplete={"cc-name"} label={"Card Holder"} type={"text"}
                         errors={formState.errors}
                         onChange={($event) => setFormData({ ...formData, cardHolder: $event.target.value })}
                         reference={register({ required: true })}/>
          </div>
          <div style={{ width: 15 }}></div>
          <div className={"col"}>
            <CustomInput id={"card-number"} autocomplete={"cc-number"} name={"cardNumber"} label={"Card Number"} type={"bank-card"}
                         onChange={($event) => setFormData({ ...formData, cardNumber: $event.target.value })}
                         errors={formState.errors} reference={register({ required: true })}/>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col"}>
            <div className={"row"}>
              <div className={"col"}>
                <CustomSelect id={"month"} name={"month"} autocomplete={"cc-exp-month"} label={"MM"} reference={register({ required: true })}
                              errors={formState.errors} options={monthOptions}
                              onChange={(value) => setFormData({ ...formData, expirationMonth: value })}/>
              </div>
              <div style={{ width: 15 }}></div>
              <div className={"col"}>
                <CustomSelect id={"year"} name={"year"} label={"YY"} autocomplete={"cc-exp-year"} reference={register({ required: true })}
                              errors={formState.errors} options={yearOptions}
                              onChange={(value) => setFormData({ ...formData, expirationYear: value })}/>
              </div>
            </div>
            <div className={"row"}>
              <div className={"col"}>
                <CustomInput id={"ccv"} name={"ccv"} autocomplete={"cc-csc"} label={"CCV"} type={"text"}
                             errors={formState.errors}
                             onChange={($event) => setFormData({ ...formData, ccv: $event.target.value })}
                             reference={register({ required: true, minLength: 3, maxLength: 4 })}/>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className={"row"} >
          <button style={{ marginLeft: "auto" }} className={"button-primary"}>submit</button>
        </div>
        <br/>
      </form>
    </>
  )
}

BankCardPicker.defaultProps = {
  paymentMethods: []
}

BankCardPicker.propTypes = {
  paymentMethodsproducts: PropTypes.arrayOf(PropTypes.object)
}

export default BankCardPicker