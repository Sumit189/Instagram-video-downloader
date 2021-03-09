window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}


//uncomment when public mode is ready to deploy
 $(document).ready(function(){
// $("#private_").fadeOut('fast');
	//comment for both
	make_box();
 });


$("#login-button").click(function(event){
		 event.preventDefault();
		 $("")
	 	 do_that();
});



function make_box(){
document.getElementById('private_').style.visibility="visible";
$("#private_").fadeIn('fast');
show_snackbar(1);
}

// function fade_in(){
// 	$("#private_").fadeOut('fast');
// }

function dynamic_url_maker(){
	var dynamicUrl = document.getElementById("link_").value;
	var check_url=dynamicUrl.replace(/ /g,'');
	if(check_url==''){
		show_snackbar(0);
	}
	else{
	var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if (!re.test(check_url)) { 
		show_snackbar(0);
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
window.open(durl,"_blank");
window.focus();
}
}

function do_that(){
	var pub_pri=$('input[name="optradio"]:checked').val();
	if(pub_pri==0){
		dynamicUrl=dynamic_url_maker();
		$.getJSON("https://cloudflare.com/"+dynamicUrl, function(data) {
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
function show_snackbar(response_) {
	var x = document.getElementById("snackbar");
	if (response_==1){
		x.innerText="Login Instagram.com \n to Download Private Videos";
	}
	else{
		x.innerText="Invalid Link";
	}
	x.className = "show";

	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }