import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Digite algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("Ops, tente novamente")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>

      </div>

      {Object.keys(cep).length > 0 &&(
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <spam>{cep.logradouro}</spam>
          <spam>{cep.bairro}</spam>
          <spam>{cep.localidade} - {cep.uf}</spam>

        </main>
      )}

      

    </div>
  );
}

export default App;
