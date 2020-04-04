import React, { Component } from "react";
import "./App.css";

const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      randomEx: undefined,
    };

    this.chooseRandom = this.chooseRandom.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/tiago-rr/ess-informa/master/json-base-de-dados-exercicios.json"
      )
      .then((result) => {
        this.setState({
          exercises: Array.from(result.data),
        }, this.chooseRandom);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  chooseRandom() {
    var ex = this.state.exercises[Math.floor(Math.random() * this.state.exercises.length)]
    if (ex) {
      if (ex.nome) {
        ex.nome = ex.nome.toUpperCase()
      }
      if (ex.descricao) {
        ex.descricao = ex.descricao.replace(/\n/g, '\n\r')
      }
      var linkSplit = ex.link.split('/')
      ex.link = 'https://i.imgur.com/' + linkSplit[linkSplit.length - 1] + '.jpg'
      this.setState({
        randomEx: ex
      });
    }
  }

  render() {
    var { randomEx } = this.state;
    return (
      <div className="App">
        {randomEx && (
          <div>
            <h1>{randomEx.nome}</h1>
            <img src={randomEx.link} className='gif' alt={randomEx.descricao}></img>
            <br/>
            <br/>
            {randomEx.descricao.length > 4 && 
              <div className='description'>
                {randomEx.descricao.split('\n').map((element, index) => {
                  return (
                    <div className='step' key={index}>{element}<br/></div>
                  )
                })}
              </div>
            }

            <br/>
            <button className='next' onClick={this.chooseRandom}>Outro exercicio!</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
