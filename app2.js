$(document).ready( function() {
	$('.artist-getter').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		$('.album-results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		getArtist(tags);
		getAlbum(tags);
	});
});

// this function takes the artist object returned by Spotify
// and creates new result to be appended to DOM
var showArtist = function(artist) {
	
	// clone our result template code
	var result = $('.templates .question').clone();

	// set some properties related to asker
	var nameGenre = result.find('.name-genre');
	nameGenre.html('Name:' + ' ' + artist.name + '<br>' + 'Genre:' + ' ' + artist.genres);

	var followerCount = result.find('.followers');
	followerCount.html('<br>' + 'Spotify Followers:' + ' ' + artist.followers.total);

	var bandPhoto = result.find('.band-photo');
	bandPhoto.html('<img src=' + artist.images[0].url + '>');

	return result;
};

var showAlbum = function(album) {
	
	// clone our result template code
	var result = $('.templates .question2').clone();

	// set some properties related to asker
	var top3Albums = result.find('.top-3-albums');
	top3Albums.html(album.name);

	return result;
};


// "5 results for The Beatles!"
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query;
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};


var getArtist = function(tags) {
	
	// the parameters we need to pass in our request to Spotify's API
	var request = {tagged: tags,

							};
	
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

var getAlbum = function(tags) {
	
	// the parameters we need to pass in our request to Spotify's API
	var request = {tagged: tags,

							};
	
	var result = $.ajax({
		url: "https://api.spotify.com/v1/search/?q=" + tags + "&type=album",
		data: request,
		dataType: "json",
		type: "GET",
		})

	.done(function(result){
		var searchResults = showSearchResults(request.tagged, result.albums.total);

		$('.album-search-results').html(searchResults);

		$.each(result.albums.items, function(i, item) {
			var album = showAlbum(item);
			$('.album-results').append(album);
			return i < 2;
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.album-search-results').append(errorElem);
	});
};



//BACKUP!!!!!!!!!!!!!!!!!!!!!


// $(document).ready( function() {
//	$('.unanswered-getter').submit( function(event){
		// zero out results if previous search has run
//		$('.results').html('');
		// get the value of the tags the user submitted
//		var tags = $(this).find("input[name='tags']").val();
//		getUnanswered(tags);
//	});
//});

// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
//var showQuestion = function(question) {
	
	// clone our result template code
//	var result = $('.templates .question').clone();
	
	// Set the question properties in result
//	var questionElem = result.find('.question-text a');
//	questionElem.attr('href', question.link);
//	questionElem.text(question.title);

	// set the #views for question property in result
//	var viewed = result.find('.viewed');
//	viewed.text(question.view_count);

	// set some properties related to asker
//	var asker = result.find('.asker');
//	asker.html('<p>Name: <a target="_blank" href=https://api.spotify.com/v1/artists/' + question.id + ' >' +
//													question.name +
//												'</a>' +
//							'</p>' +
 //							'<p>Reputation: ' + question.genres + '</p>'
	//);

//	return result;
//};

//var showSearchResults = function(query, resultNum) {
//	var results = resultNum + ' results for <strong>' + query;
//	return results;
//};

// takes error string and turns it into displayable DOM element
//var showError = function(error){
//	var errorElem = $('.templates .error').clone();
//	var errorText = '<p>' + error + '</p>';
//	errorElem.append(errorText);
//};


//var getUnanswered = function(tags) {
	
	// the parameters we need to pass in our request to Spotify's API
//	var request = {tagged: tags,

		//					};
	
//	var result = $.ajax({
//		url: "https://api.spotify.com/v1/search/?q=" + tags + "&type=artist",
//		data: request,
//		dataType: "json",
//		type: "GET",
//		})

//	.done(function(result){
//		var searchResults = showSearchResults(request.tagged, result.artists.total);

//		$('.search-results').html(searchResults);

//		$.each(result.artists.items, function(i, item) {
//			var question = showQuestion(item);
//			$('.results').append(question);
//		});
//	})
//	.fail(function(jqXHR, error, errorThrown){
//		var errorElem = showError(error);
//		$('.search-results').append(errorElem);
//	});
//};




