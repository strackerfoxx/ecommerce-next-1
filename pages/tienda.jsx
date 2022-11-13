import Layout from '../components/layout'
import Producto from '../components/producto'

export default function Tienda({data}) {
  return (
    <Layout>
        <div className='productos-grid'>
          {data.map( producto => (
              <div key={producto.id}>
                  <Producto producto={producto} />
              </div>
          ))}
        </div>
    </Layout>
  )
}

export async function getStaticProps(){
    const respuesta = await fetch(`${process.env.API_URL}/products?populate=imagen`)
    const {data} = await respuesta.json()
    return{
        props: {
            data
        }
    }
}