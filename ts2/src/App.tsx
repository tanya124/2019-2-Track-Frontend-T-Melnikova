import React from 'react';
import * as d3 from "d3";
import './App.css';
import Stats from './components/Stats'

class App extends React.Component<{}, {country: string, inputCountry: string}> {
  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    country: 'russia',
    inputCountry: ''
  }

  componentDidUpdate() {
    d3.select("#country").selectAll('*').remove();
    d3.select("svg").selectAll('*').remove();
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({
      inputCountry: event.currentTarget.value
    })
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
      const { inputCountry } = this.state;
      this.setState({
        country: inputCountry,
        inputCountry: ''
      })
  }

  render() {
    let country = this.state.country
    return (
      <div className="App">
        <header className="App-header">
          <p>COVID-19 stats</p>
        </header>
          <form onSubmit={this.handleSubmit}>
            <input className='input' type='text' placeholder='Country' value={this.state.inputCountry} onChange={this.handleChange}/>
            <input className='submit' type='submit' value='Get stats' />
          </form>
        <div className="stats">
          <Stats country={country}/>
        </div>
      </div>
    );
  }
}

export default App;
