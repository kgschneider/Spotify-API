$(document).ready( function() {
	$('.artist-getter').submit( function(event){

		$('.results').html('');

		var tags = $(this).find("input[name='tags']").val();
		getArtist(tags);
	});
});


var showArtist = function(artist) {
	

	var result = $('.templates .question').clone();


	var name = result.find('.band-name');
	name.html('<strong>' + artist.name + '</strong>');

	var genre = result.find('.band-genre');
	genre.html('Genre:' + ' ' + artist.genres);

	var followerCount = result.find('.followers');
	followerCount.html('Followers:' + ' ' + artist.followers.total);

	var bandPhoto = result.find('.band-photo');
	bandPhoto.html('<img src=' + artist.images[0].url + '>');

	return result;
};


var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query;
	return results;
};


var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};


var getArtist = function(tags) {
	

	var request = {tagged: tags, };
	
	var result = $.ajax({
		url: "https://api.spotify.com/v1/search/?q=" + tags + "&type=artist",
		data: request,
		dataType: "json",
		type: "GET",
		})

	.done(function(result){
		var searchResults = showSearchResults(request.tagged, result.artists.total);

		$('.search-results').html(searchResults);

		$.each(result.artists.items, function(i, item) {
			var artist = showArtist(item);
			$('.results').append(artist);
			return i < 2;
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};



