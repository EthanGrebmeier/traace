import React, { createRef} from "react";

export default class SearchLocationInput extends React.Component {

  constructor(props){
    super(props)
    this.autoCompleteRef = createRef();
    this.state = {
      query: "",
    }
  }
  autoComplete;


  componentDidMount(){
    this.loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTRDqReOmucCvRJliuTZsEj4FfeGPhloU&libraries=places`,
      () => this.handleScriptLoad((query) => {this.setState({query: query})}, this.autoCompleteRef)
    );
  }
  

  loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  handleScriptLoad = (updateQuery, autoCompleteRef) => {
    this.autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["establishment"], componentRestrictions: { country: "us" } }
    );
    this.autoComplete.setFields(["address_components", "place_id", "name"]);
    this.autoComplete.addListener("place_changed", () =>
      this.handlePlaceSelect(updateQuery)
    );
  }
  
   handlePlaceSelect = (updateQuery) => {
    let addressObject = this.autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);

    this.props.setLocation(addressObject)
  }

  render(){
    return (
      <div className="search-location-input">
        <input
          ref={this.autoCompleteRef}
          onChange={event => this.setState({query: event.target.value})}
          placeholder=""
          value={this.state.query}
        />
      </div>
    );
  }
  
}
