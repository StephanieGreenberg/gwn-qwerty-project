$( document ).ready(function() {

$("imagelist").hover(function(){
    $("#imagelist").fadeIn("slow");
},
function(){
    $("#imagelist").fadeOut();
});

	$('#add-story').on('click', function(event) {
		location.href = 'indexy' + (Math.round(Math.random() * 2) + 1) + '.html'
		event.preventDefault();
		return false;
	});
});
	var storage_name = 'stories'

	// This function is used to hide the form and show all the results that users have entered
	var show_results = function() {
		$('div#form').fadeOut(400);
		var data = JSON.parse(localStorage.getItem(storage_name)).reverse();

		// We loop through each user and append it to the results div. 
		// You can change this HTML to work however you want and use CSS to style it all
		$(data).each(function(i) {
			if (data[i]['story'] == 'story1') {
				var story_html = data[i]['name'] + ' is a ' + data[i]['adj1'] + ', ' + data[i]['adj2'] + ' ' + data[i]['noun1'] + ' who dreams of living in a mansion in ' + data[i]['place'] + ' with a pet ' + data[i]['animal'] + ' and no one else. '
			}
			else if (data[i]['story'] == 'story2') {
				var story_html = 'Straight out of ' + data[i]['neighborhood'] + ', ' + data[i]['name'] + ' is an avid fan of ' + data[i]['mus1'] + ' and ' + data[i]['mus2'] + ' who would eat 5 tons of ' + data[i]['favfood'] + ' if they could.'
			}
			else {
				var story_html = data[i]['name'] + ' is a ' + data[i]['adj3'] + ' ' + data[i]['noun3'] + ' who cries every day because they are not a character from ' + data[i]['show'] + ' or a protagonist in a ' + data[i]['genre'] + ' novel.'
			}

			$('#quilt').append(
				$('<div />').html('<span>' + story_html + '</span>').css({
					'background': data[i]['color']
				})
			)	
		})
		$('#quilt').delay(400).fadeIn(400);
	}

	show_results();
