$(document).ready(function(){



function getResults(){

var searchString=$('#searchString').val();

var startDate=$('#startDate').val();

	startDate = startDate + "0101";

var endDate=$('#endDate').val();

	endDate = endDate + "1231";

var numResults=$('#numResults').val();



	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "247c5455a1e04df0a47785c833eb1fc2",
  'q': searchString,
  'begin_date': startDate,
  'end_date': endDate,
  'page':numResults
});



$.ajax({
  url: url,
  method: 'GET'
}).done(function(result) {
  console.log(result);

  var response = result.response.docs;

for(var i=0; i<response.length; i++){
	var charTitle = $('<p>').addClass('article-title')
		.html(response[i].headline.main);

	if(response[i].byline == null){
        var charAuthor = $('<p>').addClass('author')
            .html("");
	}
	else {
        var charAuthor = $('<p>').addClass('author')
            .html(response[i].byline.original);
    }

	var charSection = $('<p>').addClass('section')	
		.html(response[i].section_name);

	var charDate = $('<p>').addClass('date')
		.html(response[i].pub_date);

	var charUrl = $('<p>').addClass('url')
		.html(response[i].web_url);	

	$('<div>').addClass('article-content')
		.append(charTitle,charAuthor,charSection,charDate,charUrl)
			.appendTo('.resultsArea');
}


}).fail(function(err) {
  throw err;
});
}

$("#search-btn").on("click", function (event) {
		event.preventDefault();
		getResults();
	});
	$("#clear-btn").on("click", function (event) {
		event.preventDefault();
		$(".form-control").empty();
	});


}); //this is the doc ready