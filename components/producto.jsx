import Link from 'next/link'
import Image from 'next/image'

export default function Producto({producto}) {
    const {nombre, descripcion, precio, imagen} = producto.attributes
    const imgM = imagen.data.attributes.formats.medium.url
    const {id} = producto
  return (
    <div className='producto'>
      <div className='contenido'>
        <h3>{nombre}</h3>
        <Image src={imgM} alt={`imagen del producto: ${nombre}`} width={230} height={10} />
        <p className='descripcion' >{descripcion}</p>
        <p className='precio' >${precio}</p>
        <Link className='enlace' href={`/products/${id}`}>Ver producto</Link>
      </div>
    </div>
  )
}

