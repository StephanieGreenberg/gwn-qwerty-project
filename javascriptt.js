/* 
Orginal Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar 

*/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var position = 1;

$(".next").click(function(){
	console.log('Next!!!!!')
	position++;
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	position--;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});


// Triggers when a user presses Enter on the form or clicks Submit
var form_submit = function(event){
	if (position == 3) {
		// When the user gets to the final form and clicks Submit, save the form
		save_form($('form'));

		location.href = 'quilt.html'
	}
	event.preventDefault();
	return false;
}
$('input.submit').on('click', form_submit);



// This allows you to save everything the user entered in to the form fields. 
// localStorage is a simple way to store any type of information to reuse even if the webpage gets reloaded
var storage_name = 'stories'
var save_form = function(form) {
	// Let's loop through all the form text fields and store them in an object
	var form_data = {}
	$(form).find('input[type=text], input[type=hidden]').each(function(i, el) {
		form_data[$(el).attr('name')] = $(el).val()
	});
	form_data['created_at'] = Date(); // let's also store the time in which they submitted (not necessary, but it's nice to know!)

	// Now we get the current data stored in the database using something called `localStorage`
	var data = localStorage.getItem(storage_name);
	if (!data) {
		data = [];
	}
	else {
		data = JSON.parse(data);
	}
	// Then we take the form data and add 
	data.push(form_data);

	// Then we save it back to the database using localStorage. 
	localStorage.setItem(storage_name, JSON.stringify(data));
}
