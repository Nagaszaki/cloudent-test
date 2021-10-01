import React from 'react';
import './form.scss';

export default function Form({formType,setFormType}) {

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
          <option selected disabled>Válassz egy opciót</option>
          <option value="bool">Eldöntendő</option>
          <option value="text">Kifejtendő</option>
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
