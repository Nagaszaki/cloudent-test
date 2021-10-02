import React from 'react';
import './form.scss';

export default function Form({setFormType,formType}) {

  const basic_value = [
    {
      tag: 'Nincs',
      value: 'none'
    },
    {
      tag: 'Igen',
      value: 'yes'
    },
    {
      tag: 'Nem',
      value: 'no'
    },    
  ];

  const handleChange = (e) =>{
    const {value} = e.target;
    setFormType(value);
  };


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
                <input type="radio" name="default_value" value={item.value}></input>
                <label for={item.value}>{item.tag}</label>
              </>
            ))}
          </div>
        </label>
      </div>
    </div>
  )
}
