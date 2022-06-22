 
// signup coding
function signup(){
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var mobile = document.getElementById("mobile").value;
	
	if(name != "" && email != "" && pass != "" && mobile != "")
	{
		var user_data = {name:name, email:email, password:pass, mobile:mobile};
		var user_input = JSON.stringify(user_data);
		localStorage.setItem(email,user_input);
		document.getElementById("signup-text").innerHTML = "submit successfully";
		document.getElementById("name").value="";
		email = document.getElementById("email").value="";
		pass = document.getElementById("password").value="";
		mobile = document.getElementById("mobile").value="";
		setTimeout(function(){document.getElementById("signup-text").innerHTML =""},2000)
		return false;
	}
}  

// user exit coding
function user_exist()
{
	var email = document.getElementById("email").value;
	if(localStorage.getItem(email) != null)
	{
		document.getElementById("s-text").innerHTML = "user already exist";
		document.getElementById("password").disabled = true;
		document.getElementById("mobile").disabled = true;
		document.getElementById("sign").disabled = true;
		document.getElementById("password").style.cursor = "not-allowed";
		document.getElementById("mobile").style.cursor = "not-allowed";
		document.getElementById("sign").style.cursor = "not-allowed";
		document.getElementById("email").style.background = "black";
		document.getElementById("email").style.color = "white";
		document.getElementById("email").classList.add("swing");
		
		document.getElementById("email").onclick = function()
		{
			this.value = "";
			this.style.background = "";
			this.style.color = "";
			document.getElementById("s-text").innerHTML = "";
			document.getElementById("password").disabled = false;
			document.getElementById("mobile").disabled = false;
			document.getElementById("sign").disabled = false;
			document.getElementById("password").style.cursor = "";
		document.getElementById("mobile").style.cursor = "";
		document.getElementById("sign").style.cursor = "";
		}
	}
};



function login()
{
	var username = document.getElementById("login-user").value;
	var password = document.getElementById("login-password").value;
	var user_input = {username:username, password:password};
	var user_data = JSON.stringify(user_input);
	sessionStorage.setItem(username,user_data);
	
	var user_match = sessionStorage.getItem(username);
	var user_details = JSON.parse(user_match);
	if(localStorage.getItem(user_details.username) == null)
	{
		alert("user not found");
	}
	else{
		if(localStorage.getItem(user_details.username).match(user_details.password))
		{
			location.replace("profile/profile.html");
			sessionStorage.setItem('user_mail',username);
			return false;
		}
		else{
			alert("password not matched");
		}
	}
}
