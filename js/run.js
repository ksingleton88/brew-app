	$(function(){
		$('#search-term').submit(function(event){
			event.preventDefault();
			var searchTerm =$('#query').val();
			getRequest(searchTerm);
		});
	});

	function getRequest(searchTerm){
		var params = {
			q:searchTerm,
			type:'beer'
		};

		url= 'https://api.brewerydb.com/v2/search/style/?key=b5637d693e0cdb21a8821a6cdcfcc383';

		$.getJSON(url, params, function(data){
			showResults(data.data);
		});

	}

	function showResults(results){
		var html ="";
		$.each(results, function(index, beerStyle){
			html += '<p>' + beerStyle.name + '</p>';
			html += '<p>' + beerStyle.id + '</p>;';
			html += '<p>' + '<a href = "#/beerStyle/' + beerStyle.id + '" class="toBeer">' + beerStyle.name + '</a>'
		
		});
		$('#search-results').html(html);
	}
	//listener
	$('#search-results').on('click', '.toBeer', function(event){
		event.preventDefault(); //prevents you going to the url

		var href = $(this).attr('href');

		href = href.split("/");

		var styleId = href[2]
		getBeerResults(styleId);
	})

	function getBeerResults(styleId){
		var params = {
			styleId:styleId
		};

		url= 'https://api.brewerydb.com/v2/beers/?key=b5637d693e0cdb21a8821a6cdcfcc383';

		$.getJSON(url, params, function(data){
			showBeerResults(data.data);
		});
	}

	function showBeerResults(results){
			var html ="";
			$.each(results, function(index, beer){
				html += '<p>' + beer.name + '</p>';
				
				if(beer.labels){
					html += '<p>';
					html += '<img src="' + beer.labels.medium + '"/>';
					html += '</p>';
				}
			});



		$('#beer-search-results').html(html);
	}