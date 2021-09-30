import React from 'react';
import './form.scss';

export default function Form() {

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
  return (
    <div className="form">
      <label for="form-style">
        <h3>Űrlap mező típusa:</h3>
        <select name="form-style" id="form-style">
          <option selected disabled>Válassz egy opciót</option>
          <option value="boolean">Eldöntendő</option>
          <option value="textarea">Kifejtendő</option>
        </select>
      </label>
      <label>
        <h3>Alapértelmezett állapot:</h3>
        {basic_value.map((item) => (
          <>
            <input type="radio" name="default_value" value={item.value}></input>
            <label for={item.value}>{item.tag}</label>
          </>
        ))};
        </label>
      </div>
  )
}
