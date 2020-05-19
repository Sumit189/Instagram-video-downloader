$(document).ready(function(){
$("#private_").fadeOut('fast');
});


$("#login-button").click(function(event){
		 event.preventDefault();
		 $("")
	 	 do_that();
});

function make_box(){
document.getElementById('private_').style.visibility="visible";
$("#private_").fadeIn('fast');
}

function fade_in(){
	$("#private_").fadeOut('fast');
}

function dynamic_url_maker(){
	var dynamicUrl = document.getElementById("link_").value;
	var check_url=dynamicUrl.replace(/ /g,'');
	if(check_url==''){
		show_snackbar();
	}
	else{
	var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if (!re.test(check_url)) { 
		show_snackbar();
		return "error_link";
	}
	var n=dynamicUrl.split('');
	var dynamic_url="";
	var slash=0;
	var i;
	for(i=0;i<n.length;i++){
		if(n[i]=='/'){
			slash+=1
		}
		dynamic_url+=n[i];
		if(slash==5){
			break;
		}
	}
	dynamicUrl=dynamic_url+'?__a=1';
	return dynamicUrl;
}
}
function open_json(){
durl=dynamic_url_maker();
if(durl!="error_link"){
window.open(durl,"blank");
window.focus();
}
}
function do_that(){
	var pub_pri=$('input[name="optradio"]:checked').val();
	if(pub_pri==0){
		dynamicUrl=dynamic_url_maker();
		$.getJSON(dynamicUrl, function(data) {
			window.open(data.graphql.shortcode_media.video_url,"_self");
		  });
	}
	else{
		data=document.getElementById('json_').value;
		var string_=String(data);
		var n = string_.search("video_url");
		n+=11;
		var data_="";
		for(var i=n;i<string_.length;i++){
			if (string_[i]==','){
				break;
			}
			data_+=string_[i];
			data_=data_.replace(/\"/g, '');
		}
		window.open(data_,"_self");
	}

}
function show_snackbar() {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");
  
	// Add the "show" class to DIV
	x.className = "show";
  
	// After 3 seconds, remove the show class from DIV
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
