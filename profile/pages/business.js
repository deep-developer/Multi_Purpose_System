
// showing profile picture

function showing_photo_upload()
{
	var pic_box = document.getElementById("image");
	var image_path = localStorage.getItem(sessionStorage.getItem("user_mail") + "image_url");
	pic_box.style.background = "url("+image_path+")";
	pic_box.style.backgroundRepeat = "no-repeat";
	pic_box.style.backgroundSize = "cover";
}

showing_photo_upload();



// button hover effect

function button_hover_effect(){
	var button = [document.getElementById("create-company-text"), document.getElementById("delete-company-text"), document.getElementById("sign-out-text")];
	var i;
	for(i=0;i<button.length;i++)
	{
		button[i].onmouseover = function(){
			this.className = "animated pulse";
		}
		
		button[i].onmouseout = function(){
			this.className = "";
		}
	}
}

button_hover_effect();


// open create company form

function open_create_form(){
	 var create_company = document.getElementById("create-company-text");
	 create_company.onclick = function(){
		 
		 var model = document.getElementById("model");
		 if(model.offsetHeight == 0)
		 {
			 model.style.display = "block";
			 model.style.height = "400px";
			 model.className = "animated fadeInDown";
			 this.innerHTML = "Close Form";
		 }
		 
		 else{
			 model.style.height = "0";
			 model.className = "animated fadeOut";
			 this.innerHTML = "Create Company";
		 }
	 }
}

open_create_form(); 



// create company form validation

function form_val(){
	var cmp_name = document.getElementById("input-one");
	var mail_name = document.getElementById("input-two");
	var finance_year = document.getElementById("input-eight");
	var address = document.getElementById("input-three");
	var phone_number = document.getElementById("input-four");
	var fax_number = document.getElementById("input-five");
	var email = document.getElementById("input-six");
	var website = document.getElementById("input-seven");
	var finance = document.getElementById("input-eight");
	var stock = document.getElementById("stock-type");
	cmp_name.onchange = function(){
		if(isNaN(this.value))
		{
			mail_name.onchange = function(){
				if(this.value == cmp_name.value)
				{
						this.value = "whoops ! Company Name & Mailing Name should not be same";
						this.style.color = "red";
						this.style.border = "1px solid red";
						this.style.textAlign = "center";
						this.style.fontWeight = "bold";
						this.className = "animated infinite pulse";
						this.onclick = function(){
								this.value = "";
								this.style.color = "";
								this.style.border = "";
								this.style.textAlign = "";
								this.style.fontWeight = "";
								this.className = "";
						}
				}
				
				else{
					
						if(this.value.indexOf(cmp_name.value + ".pvt.ltd") != -1 || this.value.indexOf(cmp_name.value + ".govt.ltd") != -1)
						{
							finance_year.onchange = function(){
								
								var current_date = new Date();
								var selected_date = new Date(finance_year.value);
									if(selected_date.getFullYear() <= current_date.getFullYear())
									{
											if(selected_date.getMonth()+1 == 4)
											{
												if(selected_date.getDate() == 1)
												{	
													var full_form = document.getElementById("form-val");
													full_form.onsubmit = function(){
													var cmp_details = {cmp:cmp_name.value, mail:mail_name.value, fine:finance_year.value, address:address.value, phone:phone_number.value, fax:fax_number.value, email:email.value, website:website.value, stock:stock.value};
													var cmp_data = JSON.stringify(cmp_details);
													localStorage.setItem("company", cmp_data);
													document.getElementById("form").innerHTML = "<center><i class='fa fa-check-circle' style='color:red;font-size:50px; font-weight:bold;margin-top:50px;'></i><br><br><br> <h1 style='padding:0;margin:0;font-size:25px;font-family:Ubuntu;font-weight:bold;color:yellow;'>Company create successfully</h1><br><br><br><button id='click-here'>click here</button></center>"
													
													
													document.getElementById("click-here").onclick = function(){
														window.location = location.href;
													}
													
													
													}
													
													
												}
												
												else{
														this.type = "text";
														this.value = "whoops ! only 1st date allowed";
														this.style.color = "red";
														this.style.borderColor = "red";
														this.className = "animated infinite pulse";
														this.onclick = function(){
												
														this.type = "date";
														this.style.color = "red";
														this.style.borderColor = "red";
														this.className = "animated infinite pulse";	
														}
												}
												
											}
											
											else{
												
													this.type = "text";
													this.value = "whoops ! only april month allowed";
													this.style.color = "red";
													this.style.borderColor = "red";
													this.className = "animated infinite pulse";
													this.onclick = function(){
												
													this.type = "date";
													this.style.color = "red";
													this.style.borderColor = "red";
													this.className = "animated infinite pulse";	
											}
												
											}
										
									}
									
									else{
												this.type = "text";
												this.value = "whoops ! passed year not allowed";
												this.style.color = "red";
												this.style.borderColor = "red";
												this.className = "animated infinite pulse";
												 this.onclick = function(){
												
												this.type = "date";
												this.style.color = "red";
												this.style.borderColor = "red";
												this.className = "animated infinite pulse";	
												}
									}
							}
						}
						
						else{
								this.value = "  Name should be 'company name.pvt.ltd' or 'company name.govt.ltd'";
								this.textAlign = "center";
								this.style.color = "red";
								this.style.borderColor = "red";
								this.className = "animated infinite pulse";
								this.style.fontWeight = "bold";
								this.onclick = function(){
										this.value = "";
										this.textAlign = "";
										this.style.color = "";
										this.style.borderColor = "";
										this.className = "";
										this.style.fontWeight = "";
								}
						}
				}
			}
		}
		
		else{
			this.style.border = "1px solid red";
			this.value = "whoops ! Number not allowed";
			this.style.color = "red";
			this.style.textAlign = "center";
			this.style.fontWeight = "bold";
			this.className = "animated infinite pulse";
			this.onclick = function(){
					this.style.border = "";
					this.value = "";
					this.style.color = "";
					this.style.textAlign = "";
					this.style.fontWeight = "";
					this.className = "";
			}
		}
	}
}

form_val();



// create company enabled
function cmp_available(){
	if(localStorage.getItem("company") != null)
	{
		document.getElementById("model").remove();
		var key_data = localStorage.getItem("company");
		var cmp_data = JSON.parse(key_data);
		var brand_name = document.getElementById("create-company-text");
		brand_name.innerHTML = cmp_data.cmp;
		brand_name.style.color = "red";
		brand_name.className = "animated infinite pulse";
		
		var brand_icon = document.getElementById("create");
		var upld_img = document.getElementById("create_icon");
		brand_icon.className = "fa fa-upload animated infinite flash";
		brand_icon.onclick = function(){
			
			var input = document.createElement("INPUT");
			input.type = "file";
			input.accept = "images/*";
			input.click();
			input.onchange = function(){
				if(this.files[0].size > 512000)
				{
					alert("please upload logo size below 512kbps");
				}
				
				else{
					var reader = new FileReader();
					reader.readAsDataURL(this.files[0]);
					reader.onload = function(){
						localStorage.setItem("company-logo", reader.result);
						window.location = location.href;
					}
				}
			}
		}
		brand_name.onclick = function(){
			var cmp_data = localStorage.getItem("company");
			var get_cmp_data = JSON.parse(cmp_data);
			if(get_cmp_data.stock == "Accounts only")
			{
				window.location = "busines_accesst/accounts_only.html";
			}
			
			else{
				window.location = "busines_accesst/accounts_with_inventory.html";
			}
		}
		
	}
	
}

cmp_available();



// showing logo picture

function show_logo(){
	var create = document.getElementById("create");
	if(localStorage.getItem("company-logo") != null){
	create.className = "";
	create.backgroundImage = "url(" + localStorage.getItem("company-logo") + ")";
	create.backgroundSize = "cover";
	}
}

show_logo();




// delete company coding

function del_company(){
	var del_com = document.getElementById("delete-company-text");
	del_com.onclick = function(){
		var del_notice = document.getElementById("del-notice");
		if(localStorage.getItem("company") != null)
		{
			del_notice.style.display = "block";
			del_notice.className = "animated fadeInDown";
			var ok_btn = document.getElementById("ok");
			ok_btn.onclick = function(){
				localStorage.removeItem("company");
				localStorage.removeItem("company-logo");
				var i;
				for(i=0;i<localStorage.length;i++)
				{
					var all_keys = localStorage.key(i);
					if(all_keys.match("tax") != null)
					{
						localStorage.removeItem(all_keys);
					}
					
					else if(all_keys.match("voucher_no_") != null)
					{
						localStorage.removeItem(all_keys);
					}
					
					if(all_keys.match("unit-of-mesure") != null)
					{
						localStorage.removeItem(all_keys);
					}
				}
				window.location = location.href;
			}
			
			var cancel = document.getElementById("cancel");
			cancel.onclick = function (){
				del_notice.style.display = "none";
			}
		}
		
		
		else{
			
			del_notice.style.display = "block";
			del_notice.className= "animated fadeInDown";
			del_notice.innerHTML = "NO company found !";
			setTimeout(function(){del_notice.style.display = "none";},2000);
		}
	}
}

del_company();




// logout coding

function logout(){
	var log_out = document.getElementById("sign-out-text");
	log_out.onclick = function(){
		sessionStorage.clear();
		var log_notice = document.getElementById("log-notice");
		log_notice.style.display ="block";
		setTimeout(function(){window.location = "../../index.html";},2000);
	}
}

logout();


