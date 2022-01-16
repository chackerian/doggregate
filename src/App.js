import React, { Component, useState } from 'react';
import './App.css';

function Dogs(props) {
  console.log("RESULTS", props.resultsArr)
  return (
      <div className="listings">
        {props.resultsArr.map(({ age, sex, breed, image}) => (
            <div className="dogListing">
              <img src={image} alt="" />
              <span>Age: {age}</span>
              <br />
              <span>Breed: {breed}</span>
              <br />
              <span>Gender: {sex}</span>
            </div>
        ))}
      </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zip: '',
      resultsArr: [],
    }
  }

  inputy = (event) => {
    this.setState({
      zip: event
    })
  }

  searchy = () => {
    var xhttp = new XMLHttpRequest();
    var zip = this.state.zip
    xhttp.open("GET", "https://data.austintexas.gov/resource/vwti-2wcd.json", true);
    var results = []
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var parse = JSON.parse(this.responseText);
        var arr2 = parse.filter(x => x["location_zip"] === zip)

        arr2.map(x => {
          var id = x.animal_id
          var age = x.age
          var sex = x.sex
          var breed = x.looks_like
          console.log(x)
          var url = "http://petharbor.com/get_image.asp?RES=Detail&ID=" + id + "&LOCATION=ASTN"
          x.image = url

          var newarr = {age: age, sex: sex, breed: breed, image: url}

          console.log("NEW ARRAY", newarr)
          results.push(newarr)
        })

      }
    };
    this.setState({
      resultsArr: results
    })
    console.log("QUERY", results, this.state)
    xhttp.send();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Doggregate</h1>
        <div className="searchdiv">
          <input type="text" className="searchbar" placeholder="Enter a zip code" value={this.state.zip} onChange={(e) => this.inputy(e.target.value)} />
          <button className="search" onClick={() => this.searchy()}>Search</button>
        </div>
        <Dogs resultsArr={this.state.resultsArr} />
      </div>
    );
  }
}

export default App;
