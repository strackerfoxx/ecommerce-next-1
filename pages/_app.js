import { useState, useEffect } from 'react'

import '../styles/globals.css'
import '../styles/blog.css'
import '../styles/principal.css'
import '../styles/productos.css'
import '../styles/us.css'

function MyApp({ Component, pageProps }) {

  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
  const [carrito, setCarrito] = useState(carritoLS)
  const [hidratacion, setHidratacion] = useState(false)

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  useEffect(() => {
    setHidratacion(true)

  }, [])

  function addCarrito(producto){
      if(carrito.some( productoActual => productoActual.id === producto.id )){
          const cantidadUpdate = carrito.map( productoActual => {
              if(productoActual.id === producto.id){
                 productoActual.cantidad = producto.cantidad
              }
              return productoActual
          })
          setCarrito(cantidadUpdate)
      }else{
        setCarrito([...carrito, producto])
      }
  }
  
  function updateCarrito(producto){
    const cantidadUpdate = carrito.map( productoActual => {
      if(productoActual.id === producto.id){
         productoActual.cantidad = parseInt(producto.cantidad)
      }
      return productoActual
  })
  setCarrito(cantidadUpdate)
  }

  return  <Component {...pageProps}  
      addCarrito={addCarrito}
      carrito={carrito}
      updateCarrito={updateCarrito}
  />
}

export default MyApp
