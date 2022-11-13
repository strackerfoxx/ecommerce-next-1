import Layout from '../../components/layout'
import Image from 'next/image'
import { useState } from 'react'

export default function Producto({data, addCarrito}) {
    const {nombre, stock, imagen, descripcion, precio} = data.attributes
    const img = imagen.data.attributes.formats.medium.url
    const {id} = data
    const [cantidad, setCantidad] = useState(1)

    function handleSubmit(e){
        e.preventDefault();

        const producto = {
            id,
            nombre,
            stock, 
            imagen: img, 
            precio,
            cantidad
        }

        addCarrito(producto)
    }

    const arreglo = []
    for (let i = 1; i <= stock; i++) {
        arreglo.push(i)
        
    }
  return (
    <Layout>
        <div className='contenedor producto full'>
         <Image src={img} alt={`imagen del producto: ${nombre}`} width={500} height={500} />
           <div className="contenido" >
               <h1 className='heading'>{nombre}</h1>
               <p>Unidades en existencia:<p className='precio'> {stock}</p></p>
                 <p>Unidades en precio:<p className='precio'> {precio}</p></p>    
                 <a href="/" className='enlace'>Comprar ahora</a>  

                 <form onSubmit={handleSubmit} className='formulario' >
                    <label>Selecciona una cantidad</label>
                    <select onChange={ e => setCantidad(+e.target.value) }  id='cantidad'>
                        {arreglo.map( i => (
                            <option value={i}>{i}</option>
                        ))}
                    </select>

                    <input type='submit' value='agregar al carrito' />
                 </form>
                 
             </div>
         </div>
         <p>{descripcion}</p>
    </Layout>
  )
}

export async function getStaticPaths(){
    const respuesta = await fetch(`${process.env.API_URL}/products`)
    const {data} = await respuesta.json()

    const paths = data.map( productoActual => (
        {params: {
            url: productoActual.id.toString()
        }
    }
    ))

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {url}}){
    const respuesta = await fetch(`${process.env.API_URL}/products/${url}?populate=imagen`)
    const {data} = await respuesta.json()
    return{
        props: {
            data
        }
    }
}