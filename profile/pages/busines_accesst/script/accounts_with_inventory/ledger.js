// tabs appear coding

function tabs(){
	var option_list = document.getElementById("option-list");
	var button = option_list.getElementsByTagName("BUTTON");
	var hide = document.getElementsByClassName("open");
	var i,j;
	for(i=0;i<button.length;i++)
	{
		button[i].onclick = function(){
			for(j=0;j<hide.length;j++)
			{
				hide[j].style.display = "none";
			}
			
			for(j=0;j<hide.length;j++)
			{
				hide[j].ClassName = "active";
			}
			var id_value = this.innerHTML.toLowerCase();
			var show_element = document.getElementById(id_value);
			show_element.style.display = "block";
			var input = show_element.getElementsByTagName("INPUT");
			input[0].click(); 
		}
	}
}
tabs();


// update cr and dr
function update_cr_dr(){
	var group = document.getElementById("group-account");
	group.onchange = function(){
		var ac = this.value;
		var mode = document.getElementById("mode-input");
		switch(ac)
		{
			case "capital Account" : mode.value = "Cr";
			break;
			case "sales Account" : mode.value = "Cr";
			break;
			case "purchase Account" : mode.value = "Dr";
			break;
			case "sundry creditor" : mode.value = "Cr";
			break;
			case "sundry debitor" : mode.value = "Dr";
			break;
			default : mode.value = "";
		}
	}
}
update_cr_dr();

// ledger submit coding

function ledger_submit(){
	var create = document.getElementById("create-form");
	create.onsubmit = function(){
		var group = document.getElementById("group-account");
		if(group.value != "select group")
		{
			var ledger_name = document.getElementById("ledger-input").value;
			var opening_balance = document.getElementById("opening-input").value;
			var mode = document.getElementById("mode-input").value;
			var mailing_name = document.getElementById("mailing-name-input").value;
			var mailing_address = document.getElementById("textarea").value;
			var ledger_details = {ledger_name:ledger_name, group:group.value, opening_balance:opening_balance, mode:mode, mailing_name:mailing_name,mailing_address:mailing_address};
			var store_ledgers = JSON.stringify(ledger_details);
			localStorage.setItem("ledger_no_" +  document.getElementById("ledger-no").innerHTML, store_ledgers);
		}
		
		else{
			group.style.borderColor = "red";
			group.className = "animated infinite pulse";
			group.onclick = function(){
				group.style.borderColor = "";
			    group.className = "";
			}
			return false;
		}
	}
}
ledger_submit();



// ledger no update
 
function ledger_no()
{
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match("ledger_no_"))
		{
			var no = all_keys.split("_");
			document.getElementById("ledger-no").innerHTML = Number(no[2])+ 1;
		}
	}
}
ledger_no();


// ladger addition coding

function ledger_addition(){
	var i, credit = 0, debit = 0;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match("ledger_no"))
		{
			var ledger_details = localStorage.getItem(all_keys);
			var ledger_extract = JSON.parse(ledger_details);
			if(ledger_extract.mode.match("Cr") != null)
			{
				credit += Number(ledger_extract.opening_balance);
				document.getElementById("credit").innerHTML = credit +" Cr";
			}
			
			else{
				debit += Number(ledger_extract.opening_balance);
				document.getElementById("debit").innerHTML = debit +" Dr";
			}
			
			if(credit>debit)
			{
				document.getElementById("dif").innerHTML = credit-debit+" Cr";
			}
			
			else{
				document.getElementById("dif").innerHTML = debit-credit+" Cr";
			}
		}
	}
}

ledger_addition();


// ledger edit coding 

function ledger_edit(){
	var edit_input = document.getElementById("edit-input");
	edit_input.onkeyup = function(event)
	{
		if(event.keyCode == 13){
			if(this.value == "")
			{
				return false;
			}
			
			else{
				if(localStorage.getItem("ledger_no_"+this.value) != null)
				{ 
					var ledger_details = localStorage.getItem("ledger_no_"+this.value);
					var ledger = JSON.parse(ledger_details);
					if(ledger.delete_mode != "active")
					{
					document.getElementById("ledger-notice").innerHTML  = "";
					document.getElementById("edit-lno").innerHTML = "Ledger No : "+this.value;
					document.getElementById("edit-lname").innerHTML = "Ledger Name : "+"<span contenteditable='true' id='current-lname' style='border:1px dashed blue;padding:5px;'>"+ledger.ledger_name+"</span>";
					document.getElementById("edit-group").innerHTML = "Group Name : ";
					document.getElementById("sel-group").style.display = "block";
					document.getElementById("sel-group").value = ledger.group;
					document.getElementById("edit-balance").innerHTML = "Opening Balance : "+ "<span contenteditable='true' id='current-balance' style='border:1px dashed blue;padding:5px;'>" +ledger.opening_balance+"</span> "+"<span id='current-mode'>"+ledger.mode+"</span>";
					document.getElementById("edit-mname").innerHTML = ledger.mailing_name == "" || ledger.mailing_name == undefined ? "": "Mailing Name : "+"<span contenteditable='true' id='current-mname' style='border:1px dashed blue;padding:5px;'>" +ledger.mailing_name+"</span>";
					document.getElementById("edit-address").innerHTML = ledger.mailing_address == "" || ledger.mailing_address == undefined ? "":"Mailing Addres : "+ "<span contenteditable='true' id='current-maddress' style='border:1px dashed blue;padding:5px;'>" + ledger.mailing_address + "</span>";
					document.getElementById("sel-group").onchange = function(){
							var ac = this.value;
							var current_mode = document.getElementById("current-mode");
							switch(ac)
							{
								case "capital Account" : current_mode.innerHTML = "Cr";
								break;
								case "sales Account" : current_mode.innerHTML = "Cr";
								break;
								case "purchase Account" : current_mode.innerHTML = "Dr";
								break;
								case "sundry creditor" : current_mode.innerHTML = "Cr";
								break;
								case "sundry debitor" : current_mode.innerHTML = "Dr";
								break;
								default : current_mode.innerHTML = "";
							}
	}
					document.getElementById("save-eladger").style.display = "block";
					document.getElementById("save-eladger").onclick = function(){
						var save_data ={
							ledger_name : document.getElementById("current-lname").innerHTML,
							group : document.getElementById("sel-group").value,
							mode : document.getElementById("current-mode").innerHTML,
							mailing_address : document.getElementById("current-maddress").innerHTML,
							mailing_name : document.getElementById("current-mname").innerHTML,
							opening_balance : document.getElementById("current-balance").innerHTML
						};
						
						var final_data = JSON.stringify(save_data);
						localStorage.setItem("ledger_no_"+edit_input.value,final_data);
					}
					
					document.getElementById("delete-eladger").style.display = "block";
					document.getElementById("delete-eladger").onclick = function(){
						var delete_choice = window.confirm("Do you want to delete?");
						if( delete_choice == true)
						{
							save_data ={
							ledger_name : document.getElementById("current-lname").innerHTML,
							group : document.getElementById("sel-group").value,
							mode : document.getElementById("current-mode").innerHTML,
							mailing_address : document.getElementById("current-maddress") == null ? "": document.getElementById("current-maddress").innerHTML,
							mailing_name : document.getElementById("current-mname") == null ? "": document.getElementById("current-mname").innerHTML,
							opening_balance : document.getElementById("current-balance").innerHTML,
							delete_mode : "active"
						};
						
						final_data = JSON.stringify(save_data);
						localStorage.setItem("ledger_no_"+edit_input.value,final_data);
						window.location = location.href;
						}
						
					}
					
				}
				
				else{
					
					document.getElementById("ledger-notice").innerHTML = "whoops! your ledger just deleted <button id='restore'>Restore ledger</button>";
					document.getElementById("restore").onclick = function(){
						var take_data = localStorage.getItem("ledger_no_"+ edit_input.vlaue);
						var warning_restore = window.confirm("Do you want to restore deleted ledger");
						if(warning_restore == true)
						{
							localStorage.setItem("ledger_no_"+ edit_input.value, take_data.replace('active','deactive'));
							window.location = location.href;   
						}
					}
				}
				
			}
			
				
				
				else{
					document.getElementById("ledger-notice").innerHTML = "Ledger Not Found !";
					document.getElementById("edit-lno").innerHTML = "";
					document.getElementById("edit-lname").innerHTML = "";
					document.getElementById("edit-group").innerHTML = "";
					document.getElementById("edit-balance").innerHTML = "";
					document.getElementById("edit-mname").innerHTML = "";
					document.getElementById("edit-address").innerHTML = "";
				}
			}
		}
	}
}
ledger_edit();


// search ledger coding

function search_ledger(){
	var search_ledger_input = document.getElementById("search-input");
	search_ledger_input.onkeyup = function(event){
		if(event.keyCode == 13)
		{ 
			if(search_ledger_input == "")
			{
				return false;
			}
			
			else{
				if(localStorage.getItem("ledger_no_"+ this.value) != null)
				{
					var search_data = localStorage.getItem("ledger_no_"+ this.value);
					var search_all = JSON.parse(search_data);
					document.getElementById("search-details-box").style.display = "block;";
					document.getElementById("s-lno").innerHTML += this.value;
					document.getElementById("s-lname").innerHTML += search_all.ledger_name;
					document.getElementById("s-lgroup").innerHTML += search_all.group;
					document.getElementById("s-lbalance").innerHTML += search_all.opening_balance+" "+search_all.mode;
					document.getElementById("s-mname").innerHTML += search_all.mailing_name;
					document.getElementById("s-maddress").innerHTML += search_all.mailing_address;
					
					
				}
				
				else{
					document.getElementById("search-notice").innerHTML = "<i class='fa fa-ban'></i> Ledger Not Found!";
				} 
				
			}
		}
	}
}

search_ledger();