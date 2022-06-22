// show profile picture

function show_profile_pic(){
	var profile_pic = document.getElementById("cmp-logo");
	var get_profile_pic = localStorage.getItem(sessionStorage.getItem("user_mail") + "image_url");
	profile_pic.style.background ="url("+get_profile_pic+")";
	profile_pic.style.backgroundRepeat = "no-repeat";
	profile_pic.style.backgroundSize = "cover";
}

show_profile_pic();


// show company logo

function show_company_logo(){
	var show_logo = document.getElementById("logo-retrive");
	show_logo.style.backgroundImage = "url("+localStorage.getItem("company-logo")+")";
	show_logo.style.backgroundRepeat = "no-repeat";
	show_logo.style.backgroundSize = "cover";
	var cmp_name = document.getElementById("cmp-name");
	var string = localStorage.getItem("company");
	var string_extract = JSON.parse(string);
	cmp_name.innerHTML = string_extract.cmp;
	cmp_name.style.textTransform = "capitalize";
}

show_company_logo();




// show current date and time
function date_time(){
	var date = new Date();
	var get_date = date.getDate();
	var get_month = date.getMonth()+1;
	var get_year = date.getFullYear();
	var cmp_date = document.getElementById("cmp-date");
	cmp_date.innerHTML = "Date : " + get_date+"-"+ get_month +"-"+get_year;
	var cmp_time = document.getElementById("cmp-time");
	cmp_time.innerHTML = "Time : " +date.toLocaleTimeString();
}
date_time();