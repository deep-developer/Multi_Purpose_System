     
// url copy paste security

function url()
{
	if(sessionStorage.length<=0)
	{
		var hide = document.getElementById("main-profile-page");
		hide.style.display = "none";
		document.body.style.background = "black";
		document.body.innerHTML = "Illegal action performed";
		document.body.style.color = "white";
	}
}

url();

// image upload coding

function upload()
{
	var uinput = document.getElementById("input");
	
	if(uinput.files[0].size<1000000)
	
	{var freader = new FileReader();
	freader.readAsDataURL(uinput.files[0]);
	freader.onloadend = function(event){
		var show = document.getElementById("up-btn");
		show.style.backgroundImage = "url(" + event.target.result + ")";
		var img_url = event.target.result;
		show.style.backgroundRepeat = "no-repeat";
		show.style.backgroundSize = "cover";
		document.getElementById("i").style.display = "none";
		var next = document.getElementById("fa-next");
		next.style.display = "block";
		next.onclick = function() {
			localStorage.setItem(sessionStorage.getItem('user_mail') + 'image_url',img_url);
			var hide = document.getElementById("profile-page");
			hide.style.display = "none";
			var show = document.getElementById("profile-content");
			show.style.display = "block";
			window.location = location.href;
		}
		
	}
	}
	
	else{alert("please upload photo size below 1 mb")};
}


// user name coding

function profile()
{
	var title = document.getElementById("msg-name");
	var user_mail = sessionStorage.getItem('user_mail');
	var user_details = localStorage.getItem(user_mail);
	var result = JSON.parse(user_details);
	title.innerHTML = result.name;
	title.style.textTransform = "uppercase";
	title.style.textAlign = "center";
}

profile();


// logout coding
function logout()
{
	sessionStorage.clear();
	document.getElementById("please-wait").style.display = "block";
	setTimeout(function(){
		window.location = "../index.html";
	},2000);
}


// stop upload coding

function stop_upload()
{
	if(localStorage.getItem(sessionStorage.getItem('user_mail') + "image_url") != null)
	{
		var load = document.getElementById("profile-page");
		load.style.display = "none";
		var show = document.getElementById("profile-content");
		show.style.display = "block";
	}
}

stop_upload();


// start app contents

function showing_name()
{
	var name = document.getElementById("head-text");
	var user_find = sessionStorage.getItem("user_mail");
	var user_details = localStorage.getItem(user_find);
	var user_data = JSON.parse(user_details);
	var fullname = user_data.name;
	name.innerHTML = fullname;
	
	
	var pic_box = document.getElementById("user-img");
	var image_path = localStorage.getItem(user_find + "image_url");
	pic_box.style.background = "url("+image_path+")";
	pic_box.style.backgroundRepeat = "no-repeat";
	pic_box.style.backgroundSize = "cover";
}

showing_name();

