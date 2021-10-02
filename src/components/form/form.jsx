import React, {useState} from 'react';
import './form.scss';

export default function Form({setFormType,formType,basicValue,setBasicValue}) {
  const basic_value = [
    {
      tag: 'Nincs',
      basicValue: 0
    },
    {
      tag: 'Igen',
      basicValue: 1
    },
    {
      tag: 'Nem',
      basicValue: 2
    },    
  ];

  const handleChange = (e) =>{
    const {value} = e.target;
    setFormType(value);
  };

  const changeValue = (e) => {
    setBasicValue(e);
  }


  return (
    <div className="form">
      <div className="status">
      <label for="form-style">
        <h3>Űrlap mező típusa:</h3>
        <select name="form-style" id="form-style" onChange = {handleChange}>
          {formType === '' || !formType ? 
          <option selected disabled>Válassz egy opciót</option> 
          : <option disabled>Válassz egy opciót</option> }
          {formType === 'bool' ? 
          <option selected value = "bool" >Eldöntendő</option> 
          : <option value = "bool">Eldöntendő</option> }
          {formType === 'text' ? 
          <option selected value = "text">Kifejtendő</option> 
          : <option value = "text">kifejtendő</option> }
        </select>
      </label>
      </div>
      <div className="status">
        <label>
          <h3>Alapértelmezett állapot:</h3>
          <div className="radio">
            {basic_value.map((item) => (
              <>
                {basicValue === item.basicValue?<> 
                <input checked type="radio" name="default_value" onClick={(e) => changeValue(item.basicValue)} value={item.basicValue}></input>
                <label for={item.basicValue} onClick={(e) => changeValue(item.basicValue)}>{item.tag}</label></>
              :<><input type="radio" name="default_value" onClick={(e) => changeValue(item.basicValue)} value={item.basicValue}></input>
              <label for={item.basicValue} onClick={(e) => changeValue(item.basicValue)}>{item.tag}</label></>}
              </>
            ))}
          </div>
        </label>
      </div>
    </div>
  )
}
