import React from "react"
import PropTypes from "prop-types"
import * as classnames from "classnames"

const CustomInput = ({ type, id, name, label, reference, errors, onChange, style }) => {
  const inputStyle = {
    height: 25,
    borderRadius: 10,
    outline: "none",
    border: "none",
    padding: "5px 5px 5px 15px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  }

  const cardInputChanged = (event) => {
    let key
    if (event.type === "paste") {
      event.preventDefault()
      return
    }

    key = event.keyCode || event.which
    key = String.fromCharCode(key)
    if (!key.match(/[1-9]+/i) || event.target.value.length >= 19) {
      event.preventDefault()
    } else if(event.target.value.length === 4 || event.target.value.length === 9 || event.target.value.length === 14) {
      event.target.value += " ";
    }
  }

  if (type === "bank-card") {
    return (
      <div className={"row"} style={{ marginTop: 5, marginBottom: 5, ...style }}>
        <label style={{ paddingTop: 5, paddingBottom: 5 }} className={"col-12"} for={id}>{label}</label>
        <input style={inputStyle} className={"col-12"} onPaste={($event) => cardInputChanged($event)}
               onChange={($event) => onChange($event)} onKeyPress={($event) => cardInputChanged($event)} type={"string"} id={id} name={name} ref={reference}/>
        {(Object.keys(errors).length !== 0 && errors[name]) && (
          <div className={classnames("error-text", "col-12")}>
            {errors[name].type === "required" && (errors[name].message || "This field is required")}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={"row"} style={{ marginTop: 5, marginBottom: 5, ...style }}>
      <label style={{ paddingTop: 5, paddingBottom: 5 }} className={"col-12"} for={id}>{label}</label>
      <input style={inputStyle} className={"col-12"} onChange={($event) => onChange($event)} type={type} id={id} name={name} ref={reference}/>
      {(Object.keys(errors).length !== 0 && errors[name]) && (
      <div className={classnames("error-text", "col-12")}>
        {errors[name].type === "required" && (errors[name].message || "This field is required")}
        {errors[name].type === "pattern" && (errors[name].message || "This field is invalid")}
        {errors[name].type === "minLength" && (errors[name].message || "Min length not reached")}
        {errors[name].type === "maxLength" && (errors[name].message || "Max length exceeded")}
      </div>
    )}
    </div>
  )
}

CustomInput.defaultProps = {
  type: "text",
  id: "input-id",
  name: "text",
  label: "Input",
  reference: null,
  errors: null,
  onChange: null,
  style: {}
}

CustomInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  reference: PropTypes.any,
  errors: PropTypes.object,
  onChnage: PropTypes.any,
  style: PropTypes.object
}

export default CustomInput