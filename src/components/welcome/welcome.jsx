import React from 'react'
import './welcome.scss'

export default function Welcome() {
  return (
    <div className = "welcome">
      <h2>Anamnézis mezők</h2>
      <div className = "information">
        <img src="assets/help_black_24dp.svg"/>
      <p>Itt tudod szerkeszteni a páciens egészségügyi anamnézis mezőket blablaab további leírás még ide. <br/> <a href="@">Nézd meg videónkat és leírást itt</a></p>
      
      </div>
      <h3>Anamnézis űrlap</h3>
      <p>Ez az űrlap lesz a páciens számára is elérhető majd a Páciens Portál modul-ban. Hamarosan érkezik! Így a páciens már akár otthonról, vagya rendelőben egy tabletről is  kitöltheti az adatait, ezáltal lényegesen csökkentve az adminisztrációs terheket és a hibalehetőségeket a rendelőben.</p>
    </div>
  )
}
