import React from "react"
import PropTypes from "prop-types"
import { FaChevronDown } from "react-icons/fa"
import * as classnames from "classnames"

const CustomSelect = ({ id, name, label, options, onChange, reference, errors, autocomplete }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const selectStyle = {
    height: 25,
    borderRadius: 10,
    outline: "none",
    fontSize: "16px",
    background: "white",
    width: "100%",
    border: "none",
    padding: "7px 7px 7px 14px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  }

  const dropdownIconStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: 10,
    cursor: "pointer"
  }

  const dropdownListContainer = {
    display: open ? "block" : "none",
    transition: "max-height 2s ease",
    position: "absolute",
    width: "100%",
    background: "white",
    borderRadius: 10,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    maxHeight: open ? "100px" : "0px",
    overflowY: "scroll"
  }

  const dropdownListItem = {
    width: "100%",
    height: "35px",
    border: "none",
    background: "white"
  }

  const setSelectValue = (value) => {
    setOpen(false)
    setValue(value)
    onChange(value)
  }

  return (
    <div className={"row"} style={{ marginTop: 5, marginBottom: 5 }}>
      <label className={"col-12"} style={{ paddingTop: 5, paddingBottom: 5 }} for={id}>{label}</label>
      <div className={"col-12"}>
        <div style={{ position: "relative" }}>
          <div className={"row"}>
            <input autoComplete={autocomplete} onKeyDown={($event) => $event.preventDefault()} name={name} value={value} id={id} type={"string"} style={selectStyle} ref={reference}/>
            <FaChevronDown style={dropdownIconStyle} onClick={() => setOpen(!open)}/>
          </div>
          <div className={"col-12"}>
            <div style={dropdownListContainer}>
              {options.map((o, i) => (
                <button key={i} onClick={() => setSelectValue(o.value)}
                        style={dropdownListItem}>{o.label}</button>
              ))}
            </div>
          </div>
        </div>
        {(Object.keys(errors).length !== 0 && errors[name]) && (
          <div className={classnames("error-text", "col-12")}>
            {errors[name].type === "required" && (errors[name].message || "This field is required")}
            {errors[name].type === "pattern" && (errors[name].message || "This field is invalid")}
            {errors[name].type === "minLength" && (errors[name].message || "Min length not reached")}
            {errors[name].type === "maxLength" && (errors[name].message || "Max length exceeded")}
          </div>
        )}
      </div>
    </div>
  )
}

CustomSelect.defaultProps = {
  id: "select-id",
  name: "select",
  label: "Label",
  options: [],
  onChange: null,
  reference: null,
  errors: {},
  autocomplete: "off"
}

CustomSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.any,
  reference: PropTypes.any,
  errors: PropTypes.object,
  autocomplete: PropTypes.string
}

export default CustomSelect