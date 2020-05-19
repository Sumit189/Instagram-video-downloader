$("#login-button").click(function(event){
		 event.preventDefault();
	 	 do_that();
});

function do_that(){
	var dynamicUrl = document.getElementById("link_").value;
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
	var dynamicUrl=dynamic_url+'?__a=1';
	$.getJSON(dynamicUrl, function(data) {
	  console.log("This is an example of a dynamic JSON file being served by a web server.")
	  window.open(data.graphql.shortcode_media.video_url,"_self");
	});
}