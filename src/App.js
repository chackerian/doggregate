import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zip: '',
      resultsArr: []
    }
  }

  inputy = (event) => {
    this.setState({
      zip: event
    })
    console.log(this.state)
  }

  searchy = () => {
    console.log(this.state)
    var xhttp = new XMLHttpRequest();
    var that = this.state.zip
    xhttp.open("GET", "https://data.austintexas.gov/resource/vwti-2wcd.json", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var parse = JSON.parse(this.responseText);
        var arr2 = parse.filter(x => x["location_zip"] === that)

        arr2.map(x => {
          var id = x.animal_id
          var age = x.age
          var sex = x.sex
          var url = "http://petharbor.com/get_image.asp?RES=Detail&ID=" + id + "&LOCATION=ASTN"
          x.image = url

          var newarr = {age: age, sex: sex, image: url}
          resultsArr.push(newarr)

          console.log("NEW ARRAY", newarr)
        })

      }
    };
    xhttp.send();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Doggregate</h1>
        <input type="text" className="searchbar" placeholder="Enter a zip code" value={this.state.zip} onChange={(e) => this.inputy(e.target.value)} />
        <button class="search" onClick={() => this.searchy()}>Search</button>
        <p className="results" id="results"></p>
        <Dogs {...this} />
      </div>
    );
  }
}

class Dogs extends Component {
    
    constructor(props) {
        super(props);    
        console.log(props, this)   
    }
    
    render() {
        
        return (
            <div className="dogListing">
            <div id="dog">Age: {newarr.age}</div>
            <div id="dog">Sex: {newarr.sex}</div>
            <img src={newarr.image} alt="" />
            </div>
        );
    }
}

export default App;
