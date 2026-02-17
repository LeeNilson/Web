import './App.css';

function App() {
  const name = 'Lee';
  const newName = name.toUpperCase();
 const url = 'https://via.placeholder.com/150'; 

  return (
    <div className="App">
      <h1>Olá {newName} seja bem vindo ao React!</h1>
      <p>Meu primeiro App </p>
      <img src={url} alt="Imagem de exemplo" />
    </div>
  );
}

export default App;
