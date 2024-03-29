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
	let dynamicUrl = document.getElementById("link_").value;
	const check_url = dynamicUrl.replace(/ /g,'');
	if(check_url === ''){
		show_snackbar(0);
	}
	else{
	const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	if (!re.test(check_url)) { 
		show_snackbar(0);
		return "error_link";
	}
	let n=dynamicUrl.split('');
	let dynamic_url="";
	let slash=0;
	let i;
	for(i=0;i<n.length;i++){
		if(n[i]=='/'){
			slash+=1
		}
		dynamic_url+=n[i];
		if(slash==5){
			break;
		}
	}
	dynamicUrl=dynamic_url+'?__a=1&__d=dis';
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
	const pub_pri=$('input[name="optradio"]:checked').val();
	if(pub_pri === 0){
		dynamicUrl=dynamic_url_maker();
		$.getJSON("https://cloudflare.com/"+dynamicUrl, function(data) {
			window.open(data.graphql.shortcode_media.video_url,"_self");
		  });
	}
	else{
		let data = document.getElementById('json_').value;
		let jsonData = JSON.parse(data);
		let videoURL;
		if (data.toString().startsWith('{"graphql"')) {
			videoURL = jsonData?.graphql?.shortcode_media?.video_url
		} else if(data.toString().startsWith('{"items"')) {
			videoURL = jsonData?.items?.[0]?.video_versions?.[0]?.url
		} else {
			show_snackbar(2);
		}
		if (videoURL) {
			window.open(videoURL,"_self");
		}
	}
}
function show_snackbar(response_) {
	var x = document.getElementById("snackbar");
	if (response_==1){
		x.innerText="Login Instagram.com \n to Download Private Videos";
	} else if(response_ === 2) {
		x.innerText = "Error in Pasted Data"
	}
	else{
		x.innerText="Invalid Link";
	}
	x.className = "show";

	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }