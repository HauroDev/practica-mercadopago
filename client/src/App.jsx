import axios from 'axios'
import './App.css'

const App = () => {
  const onClickBuy = async () => {
    const result = await axios.post('http://localhost:3000/create-order')
    const { data } = result

    console.log(data)
    window.location.href = data.init_point
  }

  return (
    <main>
      <section>
        <h2>Producto: Producto prueba</h2>
        <button onClick={onClickBuy}>Comprar</button>
      </section>
    </main>
  )
}

export default App
