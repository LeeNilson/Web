import './App.css';
import HelloWorld  from './components/HelloWord';
import SayMyName from './components/SayMyName';
import Pessoa from './components/Pessoa';

function App() {
const name = "Maria";
  return (
    <div className="App">
      <HelloWorld />
      <SayMyName name="Matheus"/>
      <SayMyName name="João"/>
      <SayMyName name={name}/>
      <Pessoa 
      name="Lee" 
      idade="28" 
      profissao="Desenvolvedor"
      foto="https://via.placeholder.com/150" 
      />
    </div>
  );
}

export default App;
