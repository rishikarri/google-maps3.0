

// ************************Google Maps Portion ***********************************************



var map = new google.maps.Map(
	document.getElementById('map'),
	{
		center:{lat: 39.8282, lng: -98.5795},
		zoom: 4
	}
);

var infoWindow = new google.maps.InfoWindow({})
// a function that places a  marker at a city location 
function createMarker(city){
	var icon = 'http://i.imgur.com/eQ3pSuK.png'
	var cityLL = {
		lat: city.lat, 
		lng: city.lon
	}
	//takes in two parameters, position and what map to use 
	var marker = new google.maps.Marker({
		position: cityLL,
		map: map,
		title: city.city,
		icon: icon
	})
	google.maps.event.addListener(marker, 'click', function(event){
		infoWindow.setContent(`<h2 ${city.city} </h2> <div> <p>${city.state} </p></div>`);
		infoWindow.open(map, marker);
	})
}

// ************************REACT PORTION ***********************************************

function GoogleCity(props){
	return(
		<tr>
			<td className="city-name">{props.cityObject.city}</td>
			<td className="city-name">{props.cityObject.yearRank}</td>
		</tr>
	)
}

var Cities = React.createClass({
	getInitialState: function(){
		return(
			{
				currCities: this.props.cities
			}
		)
	},

	handleInputChange: function(event){
		var newFilterValue = event.target.value; 
		var filteredCitiesArray = [];
		this.props.cities.map(function(currCity, index){
			if(currCity.city.indexOf(newFilterValue) !== -1){
				//hit - it is in the word 
				filteredCitiesArray.push(currCity);
			}
		});
		this.setState({
			currCities: filteredCitiesArray
		})
	},
	
	render: function(){
		var cityRows = [];

		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity)
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />
		)})


		return(
			<div> 
				<form onSubmit={this.updateMarkers}>
					<input type="text" onChange={this.handleInputChange} />
					<input type="submit" value="Update Markers" />
				</form>	
				<table>
					<thead>
						<tr>
							<th> City Name </th>
							<th> City Rank </th>
						</tr>	
					</thead>
					<tbody>
						{cityRows}
					</tbody>
				</table>
			 </div>
		)
	}
})

ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)