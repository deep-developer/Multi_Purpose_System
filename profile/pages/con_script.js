
window.onload = function(){
	var  x = document.getElementById("contacts").children.length;
	if(x==0)
	{
		document.getElementById("head-contact").innerHTML = "No contact found !";
	}
}



function showing_photo_upload()
{
	var pic_box = document.getElementById("image");
	var image_path = localStorage.getItem(sessionStorage.getItem("user_mail") + "image_url");
	pic_box.style.background = "url("+image_path+")";
	pic_box.style.backgroundRepeat = "no-repeat";
	pic_box.style.backgroundSize = "cover";
}

showing_photo_upload();


// add contacts coding
function addcontact()
{
	var fullname = document.getElementById("ftext").value;
	var pnum = document.getElementById("pnumber").value;
	var snum = document.getElementById("snumber").value;
	
	if(fullname != "" && pnum != "" && snum != "")
	{
		if(isNaN(pnum))
		{
			alert("please type a valid primary number");
		}
		
		else{
			if(isNaN(snum))
			{
				alert("please type a valid secondary number");
			}
			
			else{
				var user = {fullname:fullname, pnum:pnum, snum:snum};
				var user_details = JSON.stringify(user);
				localStorage.setItem(fullname+" contact",user_details);
				
				var form = document.getElementById("user-input");
				form.reset();
				document.getElementById("saved").style.display = "block";
				setTimeout(function(){
					document.getElementById("saved").style.display = "none";
				},2000)
				window.location = location.href;
			}
		}
	}
	
	else{
		alert("some fields are empty");
	}
}



function show_contacts()
{
	var i;
	for(i=1;i<=localStorage.length;i++)
	{
		var keys = localStorage.key(i);
		if(keys.match("contact") != null)
		{
			var json_text = localStorage.getItem(keys);
			var json_extract = JSON.parse(json_text);
			var con = document.getElementById("contacts");
			var fieldset = document.createElement("FIELDSET");
			var legend = document.createElement("LEGEND");
			var ol = document.createElement("OL");
			var li_one = document.createElement("LI");
			var li_two = document.createElement("LI");
			var trash = document.createElement("I");
			trash.setAttribute("class","fa fa-trash");
			trash.setAttribute("id","delete-icon");
			trash.setAttribute("title","Delete contact");
			var edit = document.createElement("I");
			edit.setAttribute("class","fa fa-edit");
			edit.setAttribute("id","delete-icon");
			edit.setAttribute("title", "edit contact");
			var saved = document.createElement("SPAN");
			var save = document.createElement("I");
			save.setAttribute("class","fa fa-save");
			save.setAttribute("id","delete-icon");
			save.setAttribute("title","save contact");
			con.appendChild(fieldset);
			fieldset.appendChild(legend);
			fieldset.appendChild(ol);
			ol.appendChild(li_one);
			ol.appendChild(li_two);
			ol.appendChild(trash);
			ol.appendChild(edit);
			ol.appendChild(save);
			ol.appendChild(saved);
			save.style.display = "none";
			legend.appendChild(document.createTextNode(json_extract.fullname));
			li_one.appendChild(document.createTextNode(json_extract.pnum));
			li_two.appendChild(document.createTextNode(json_extract.snum));
			saved.appendChild(document.createTextNode("saved successfully !"));
			saved.style.color = "white";
			saved.style.fontFamily = "verdana";
			saved.style.float = "right";
			saved.style.fontWeight = "bold";
			saved.style.display = "none";
			del_contact(keys,trash)
			edit_contact(keys,edit,save,saved)
		}
	}
}

show_contacts();


function del_contact(contact_name, del_btn){
	del_btn.onclick= function(){
		var answer = confirm("Do you want to delete this contact");
		if(answer== true)
		{
		var ol = this.parentElement;
		var fieldset = ol.parentElement;
		fieldset.remove();
		document.cookie = contact_name +"="+localStorage.getItem(contact_name)+";max-age:2592000";
		localStorage.removeItem(contact_name);
		var  x = document.getElementById("contacts").children.length;
	if(x==0)
	{
		document.getElementById("head-contact").innerHTML = "No contact found !";
	}
		}
	}
	
}


// edit contact
function edit_contact(contact_name, edit_contact, save_contact, saved_contact)
{
	edit_contact.onclick = function(){
			save_contact.style.display = "block";
			var ol = this.parentElement;
			var fieldset = ol.parentElement;
			var legend = fieldset.getElementsByTagName("LEGEND");
			legend[0].setAttribute("contenteditable", "true");
			legend[0].focus();
			var li = ol.getElementsByTagName("LI");
			var i;
			for(i=0;i<li.length;i++)
			{
				li[i].setAttribute("contenteditable","true")
				li[i].focus();
			}
			var recent_legend;
			legend[0].onclick = function(){
				recent_legend = this.innerHTML;
			}
			
			var current_legend;
			legend[0].onblur = function(){
				current_legend = this.innerHTML;
			}
			
			var recent_number = [];
			var current_number = [];
			
			li[0].onclick = function(){
				recent_number[0] = this.innerHTML;
			}

			li[0].onblur = function(){
				current_number[0] = this.innerHTML;
			}
			
			li[1].onclick = function(){
				recent_number[1] = this.innerHTML;
			}
			
			li[1].onblur = function(){
				current_number[1] = this.innerHTML;
			}
			
			save_contact.onclick = function(){
				var edit_details = {fullname:current_legend==undefined?legend[0].innerHTML:current_legend, pnum:current_number[0]==undefined?li[0].innerHTML:current_number[0], snum:current_number[1]==undefined?li[1].innerHTML:current_number[1]};
				var final_data = JSON.stringify(edit_details);
				var txt = localStorage.getItem(contact_name);
				localStorage.setItem(contact_name,txt.replace(txt,final_data));
				saved_contact.style.display =  "block";
				setTimeout(function(){
					saved_contact.style.display = "none";
				},2000);
			}
	}
} 



function search_contact(user_input)
{
	var keyword = user_input.value.toUpperCase();
	var contact_list = document.getElementById("contacts");
	var legend = contact_list.getElementsByTagName("LEGEND");
	var i;
	
	for(i=0;i<legend.length;i++) 
	{
		if(legend[i].innerHTML.toUpperCase().indexOf(keyword) != -1)
		{
			legend[i].parentElement.style.display = "";
		}
		
		else{
			legend[i].parentElement.style.display = "none";
		}
	}
}

function restore_contact()
{
	var page = document.getElementById("restore-box");
	page.style.height = "100vh";
	page.setAttribute("top", "0");
	page.setAttribute("left","0");
	page.style.transition = "0.5s";
}