import React from 'react'
import { Link } from 'react-router-dom'
import { ProductsCards } from '../layout/componentes/productCards'
import ProductSlider from '../layout/componentes/Slider'
import { Banner } from '../layout/componentes/Banner'

export const Welcome = () => {
  return (
    <div>
      <ProductSlider/>
 

      <div className="container">
        <ProductsCards limit={4} type={"nuevas_ofertas"}/>

        <Banner/>

        <ProductsCards limit={4} type={"mejores_ofertas"}/>
        <ProductsCards limit={4} type={"ultimos_productos"}/>

      </div>

    </div>
  )
}
