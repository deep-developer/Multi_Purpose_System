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


// showing company logo

function showing_logo(){
	var brand_logo = document.getElementById("brand");
	brand_logo.style.backgroundImage = "url(" + localStorage.getItem("company-logo") + ")";
	brand_logo.style.backgroundSize ="cover";
	var brand_name = document.getElementById("brand-name");
	var string = localStorage.getItem("company");
	var company_details = JSON.parse(string);
	brand_name.innerHTML = company_details.cmp; 
	}
	
showing_logo();


// set unit of mesure

function unit_of_mesure(){
	var unit_btn = document.getElementById("unit-of-mesure");
	var prime_btn = document.getElementById("primary-content");
	var sec_btn = document.getElementById("secondary-content");
	var close = document.getElementById("close");
	var form = document.getElementById("unit-form");
	unit_btn.onclick = function(){
		document.getElementById("search-container").style.display = "none";
		prime_btn.style.display = "none";
		sec_btn.style.display = "block";
		close.onclick = function(){
			window.location = location.href;
			sec_btn.style.display = "none";
			unit_btn.innerHTML = "<i class='fa fa-balance-scale' style='font-size:25px; font-weight:bold; float:left;'></i> &nbspUnit of Mesure";
		}
		
		form.onsubmit = function(){
			var input = sec_btn.getElementsByTagName("INPUT");
			var symbol = input[0].value;
			var formal_name = input[1].value;
			var unit_object = {symbol:symbol,formal_name:formal_name};
			var unit_details = JSON.stringify(unit_object);
			localStorage.setItem("unit-of-mesure "+symbol, unit_details);
		}
	}
}
unit_of_mesure();
	
	
	
// sales voucher box appear coding 
function sales_voucher_appear(){
	var i;
	var sales_btn = document.getElementById("sales-voucher");
	var sales_voucher = document.getElementById("sales-voucher-box");
	sales_btn.onclick = function(){
		sales_voucher.style.display = "block";
		sales_voucher.className = "animated slideInDown";
		document.getElementById("search-container").style.display = "none";
		//showing voucher number
		for(i=0;i<localStorage.length;i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match("voucher_no_"))
			{
				var find_num = all_keys.split("_");
				all_voucher_no = find_num[2];
				all_voucher_no++;
				document.getElementById("voucher-no").innerHTML = "Voucher no: "+all_voucher_no;
			}
			
			else if(all_keys.match("voucher_no_") == null)
			{
				document.getElementById("voucher-no").innerHTML = "Voucher no: "+all_voucher_no;
			}
		}
		
		// tax coding
		var tax_display = document.getElementById("tax-value");
		for(i=0;i<localStorage.length;i++)
		{
			var tax_name = localStorage.key(i);
			if(tax_name.indexOf("tax") != -1)
			{
				var tax_item = localStorage.getItem(tax_name);
				var extract = JSON.parse(tax_item);
				tax_display.innerHTML += extract.name_of_tax+"("+extract.tax+")<br>";
				var subtotal = document.getElementById("subtotal").innerHTML;
				var tax_amount = document.getElementById("price_of_tax");
				tax_amount.innerHTML += subtotal+"<br>";
			}
		}
		
		var buyer_form = document.getElementById("buyer-form");
		var input = buyer_form.getElementsByTagName("INPUT");
		input[0].focus();
		input[0].onkeyup = function(event){
			if(event.keyCode == 13)
			{
				input[1].focus();
			}
		}
		
		input[1].onkeyup = function(event){
			if(event.keyCode == 13)
			{
				input[2].focus();
			}
		}
		
		input[2].onkeyup = function(event){
			if(event.keyCode == 13)
			{
				input[3].focus();
			}
		}
		
		input[3].onkeyup = function(event){
			if(event.keyCode == 13)
			{
				document.getElementById("add-item").click();
				var prd_table = document.getElementById("product-table");
				prd_table.getElementsByTagName("INPUT")[0].focus();
			}
		}
	}
	
}

sales_voucher_appear();


// sales voucher disappear coding 

function sales_voucher_close(){
	var sales_voucher = document.getElementById("sales-voucher-box");
	var close_voucher = document.getElementById("close-voucher");
	close_voucher.onclick = function(){
		sales_voucher.className = "animated slideOutUp";
		document.getElementById("search-container").style.display = "block";
		document.getElementById("tax-value").innerHTML = "";
		document.getElementById("price_of_tax").innerHTML = "";
	}
}

sales_voucher_close();


// company logo appear coding 

function cmp_logo_appear(){
	var cmp_logo = document.getElementById("cmp-logo");
	cmp_logo.style.background = "url("+localStorage.getItem('company-logo')+")";
	cmp_logo.style.backgroundSize = "cover";
	var cmp_address = document.getElementById("cmp-address");
	var string = localStorage.getItem("company");
	var cmp_details = JSON.parse(string);
	cmp_address.innerHTML = "<div style='font-size:35px;font-weight:bold;font-family:Righteous;margin-left:10px;color:red;'>" +cmp_details.cmp +"</div><address style='margin-left:10px;font-weight:bold;font-size:20px;margin-bottom:5px;'> Venue : " + cmp_details.address + "</address><div style='margin-left:10px;font-size:15px;font-weight:bold;margin-bottom:5px;'> Call : " + cmp_details.phone + "</div>";
}

cmp_logo_appear();


// adding item coding 
var store_subtotal, store_tax =[], store_total, store_paid, store_dues, all_voucher_no = 1;
function display_item(){
	var product_table = document.getElementById("product-table");
	var tr = document.createElement("TR");
	var td_item = document.createElement("TD");
	var td_price = document.createElement("TD");
	var td_qty = document.createElement("TD");
	var td_amount = document.createElement("TD");
	var td_delete = document.createElement("TD");
	var input_item = document.createElement("INPUT");
	input_item.type = "text";
	input_item.placeholder = "item description";
	input_item.className = "items";
	var input_price = document.createElement("INPUT");
	input_price.type = "number";
	input_price.placeholder = "0.00";
	input_price.disabled = true;
	input_price.className = "price";
	var input_qty = document.createElement("INPUT");
	input_qty.type = "number";
	input_qty.placeholder = "1";
	input_qty.disabled = true;
	input_qty.className = "qty";
	var input_amount = document.createElement("INPUT");
	input_amount.type="number";
	input_amount.placeholder = "0.00";
	input_amount.className = "amount";
	var input_delete = document.createElement("I");
	input_delete.className = "fa fa-trash";
	input_delete.style.fontSize = "30px";
	product_table.append(tr);
	tr.append(td_item);
	tr.append(td_price);
	tr.append(td_qty);
	tr.append(td_amount);
	tr.append(td_delete);
	td_item.append(input_item);
	td_price.append(input_price);
	td_qty.append(input_qty);
	td_amount.append(input_amount);
	td_delete.append(input_delete);
	td_delete.align = "center";
	td_delete.style.cursor = "pointer";
	input_delete.onclick = function(){
		var del_icon = this.parentElement;
		var remove_item = del_icon.parentElement;
		remove_item.remove();
		var amount_value = remove_item.getElementsByClassName("amount")[0].value;
		store_subtotal = store_subtotal-amount_value;
		document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> " + store_subtotal ;
		
		var i, tax_qty = "";
		for(i=0;i<localStorage.length;i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match("tax") != null)
			{
				var tax_string = localStorage.getItem(all_keys);
				var tax_extract = JSON.parse(tax_string);
				tax_qty += tax_extract.tax+",";
			}
		}
		
		var split_comma = tax_qty.split(",");
		document.getElementById("price_of_tax").innerHTML = "";
		for(i=0;i<split_comma.length-1;i++)
		{
			var num = split_comma[i].replace("%","");
			var final_cal = (store_subtotal*num)/100;
			tax[i] = final_cal;
			document.getElementById("price_of_tax").innerHTML += "<i class='fa fa-rupee'></i> "+final_cal+"<br>";
		}
		var all_taxes = 0;
		for(i=0;i<tax.length;i++)
		{
			all_taxes = all_taxes+tax[i];
		}
		store_total = store_subtotal+all_taxes;
		document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+ store_total;
	}
	
	
	input_amount.onkeydown = function(){
		return false;
	}
	
	input_amount.oncontextmenu = function(){
		return false;
	}
	
	
	input_item.oninput = function(){
		this.onkeyup = function(event){
			if(event.keyCode == 13){
				var td = this.parentElement;
				var tr = td.parentElement;
				tr.getElementsByTagName("INPUT")[1].focus();
			}
		}
		input_price.disabled = false;
		input_price.oninput = function(){
			this.onkeyup = function(event){
			if(event.keyCode == 13){
				var td = this.parentElement;
				var tr = td.parentElement;
				tr.getElementsByTagName("INPUT")[2].focus();
			}
		}
			input_qty.disabled = false;

		}
		
	}
	
				input_qty.oninput = function(){
				input_amount.value = input_price.value*input_qty.value;
				var total_amount =document.getElementsByClassName("amount");
				var i;
				var previous_amount = 0;
				for(i=0;i<total_amount.length;i++)
				{
					previous_amount = previous_amount + Number(total_amount[i].value);
					store_subtotal = previous_amount.toFixed(2);
					document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);
				}
				var reverse = 0;
				for(i=0;i<localStorage.length;i++)
				{
					var tax_name = localStorage.key(i);
					if(tax_name.indexOf("tax") != -1)
					{
						var tax_item = localStorage.getItem(tax_name);
						var extract = JSON.parse(tax_item);
						reverse += extract.tax +"<br>";
						document.getElementById("price_of_tax").innerHTML = "<span id='percentage' style='display:none;'>"+reverse.replace(0,"")+"</span>";
					}
				}
				
				
				
				var split_num = document.getElementById("percentage").innerHTML;
				var final_num = split_num.split("%<br>");
				
				for(i=0;i<final_num.length-1;i++)
				{
					var fixed = (previous_amount*final_num[i])/100;
					store_tax[i] = fixed.toFixed(2);
					document.getElementById("price_of_tax").innerHTML += "<i class='fa fa-rupee'></i> "+fixed.toFixed(2)+"<br>";
					previous_amount = previous_amount+fixed;
					store_total = previous_amount.toFixed(2);
					document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i>" + previous_amount.toFixed(2) ;
					document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i>" + previous_amount.toFixed(2) ;
					var paid = document.getElementById("input");
					paid.oninput = function(){
						store_paid = this.value;
						var dues = previous_amount-this.value;
						store_dues = dues.toFixed(2);
						document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i> "+dues.toFixed(2);
					}
				}
				
				
				
				
				input_qty.onkeyup = function(event){
					
					if(event.keyCode == 13)
					{
						document.getElementById("add-item").click();
						var item = document.getElementsByClassName("items");
						item[item.length-1].focus();
					}
					
				}
			}
			
			
						input_price.oninput = function(){
				input_amount.value = input_price.value*input_qty.value;
				var total_amount =document.getElementsByClassName("amount");
				var i;
				var previous_amount = 0;
				for(i=0;i<total_amount.length;i++)
				{
					previous_amount = previous_amount + Number(total_amount[i].value);
					store_subtotal = previous_amount.toFixed(2);
					document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);
				}
				var reverse = 0;
				for(i=0;i<localStorage.length;i++)
				{
					var tax_name = localStorage.key(i);
					if(tax_name.indexOf("tax") != -1)
					{
						var tax_item = localStorage.getItem(tax_name);
						var extract = JSON.parse(tax_item);
						reverse += extract.tax +"<br>";
						document.getElementById("price_of_tax").innerHTML = "<span id='percentage' style='display:none;'>"+reverse.replace(0,"")+"</span>";
					}
				}
				
				
				
				var split_num = document.getElementById("percentage").innerHTML;
				var final_num = split_num.split("%<br>");
				
				for(i=0;i<final_num.length-1;i++)
				{
					var fixed = (previous_amount*final_num[i])/100;
					store_tax[i] = fixed.toFixed(2);
					document.getElementById("price_of_tax").innerHTML += "<i class='fa fa-rupee'></i> "+fixed.toFixed(2)+"<br>";
					previous_amount = previous_amount+fixed;
					store_total = previous_amount.toFixed(2);
					document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i>" + previous_amount.toFixed(2) ;
					document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i>" + previous_amount.toFixed(2) ;
					var paid = document.getElementById("input");
					paid.oninput = function(){
						store_paid = this.value;
						var dues = previous_amount-this.value;
						store_dues = dues.toFixed(2);
						document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i> "+dues.toFixed(2);
					}
				}
				
				
				
				
				input_qty.onkeyup = function(event){
					
					if(event.keyCode == 13)
					{
						document.getElementById("add-item").click();
						var item = document.getElementsByClassName("items");
						item[item.length-1].focus();
					}
					
				}
			}
}


// add item coding


function add_item(){
	document.getElementById("add-item").onclick = function()
	{
		display_item();
	}
}

add_item();



// tax setup
function adding_tax(){
	var tax_setup = document.getElementById("tax-setup");
	tax_setup.onclick = function(){
		document.getElementById("search-container").style.display = "none";
		document.getElementById("adding-tax-box").style.display = "block";
		
		var tax_close = document.getElementById("tax-close");
		tax_close.onclick = function(){
			document.getElementById("adding-tax-box").style.display = "none";
		}
	}
	
	var tax_name = document.getElementById("tax-name");
	var tax = document.getElementById("tax");
	tax_name.onchange = function(){
		if(this.value.indexOf("tax") != -1)
		{
			tax.oninput = function(){
				if(tax.value.charAt(0).indexOf("%") == -1)
				{
					document.getElementById("tax-form").onsubmit = function(){
						if(tax.value.indexOf("%") != -1)
						{
								var name_of_tax = document.getElementById("tax-name").value;
								var tax_qty = tax.value;
								var tax_details = {name_of_tax:name_of_tax,tax:tax_qty};
								var tax_key = JSON.stringify(tax_details);
								localStorage.setItem(name_of_tax,tax_key);
		
						}
						
						else{
							alert("only 0 to 9 and % symbol allowed");
							return false;
						}
					}
				}
				
				else{
					tax.className = "animated infinite pulse";
					tax.border = "red";
					tax.value = "% not allowed at first place";
					tax.style.color = "red";
					tax.onclick = function(){
						tax.className = "";
					tax.border = "";
					tax.value = "";
					tax.style.color = "";
					}
					
				}
			}
		}
		
		else{
			this.className = "animated infinite pulse";
			this.value = "must use 'tax' word";
			this.style.color = "red";
			this.style.borderColor = "red";
			this.onclick = function(){
				this.className = "";
				this.value = "";
				this.style.color = "";
				this.style.borderColor = "";
			}
		}
	}
	
}

adding_tax();

// tax setup button close coding
function tax_btn_close(){
	var tax_close = document.getElementById("tax-close");
	tax_close.onclick = function(){
		document.getElementById("adding-tax-box").style.display = "none";
		document.getElementById("search-container").style.display = "block";
	}
}

tax_btn_close();


// showing current date
var voucher_date;
function show_date(){
	var date = new Date();
	var current_date = date.getDate();
	var month = date.getMonth()+1;
	var year = date.getFullYear();
	document.getElementById("showing-currentdate").innerHTML = "Date : "+current_date+"-"+month+"-"+year;
	voucher_date = current_date+"-"+month+"-"+year;
}

show_date();



// get bill coding

function bill(){
	var get_bill = document.getElementById("get-bill");
	get_bill.onclick = function(){
		var i, store_item=[], store_price=[], store_qty=[], store_amount=[];
		var remove_element = document.getElementsByClassName("remove");
		for(i=0;i<remove_element.length;i++)
		{
			remove_element[i].style.display = "none";
		}
		document.getElementById("add-item").style.display = "none";
		var close_v = document.getElementById("close-voucher");
		close_v.style.display = "none";
		var sales_box = document.getElementById("sales-voucher-box");
		sales_box.style.width = "100%";
		sales_box.style.top = "0";
		sales_box.style.left = "0";
		sales_box.style.padding = "0";
		sales_box.style.margin = "0";
		this.style.display = "none";
		var form = document.getElementById("buyer-form");
		var input = form.getElementsByTagName("INPUT");
		for(i=0;i<input.length;i++)
		{
			input[i].style.border = "inherit";
			input[i].style.background = "#ddd";
		}
		
		var product_table = document.getElementById("product-table");
		var product_tr = product_table.getElementsByTagName("TR");
		for(i=0;i<product_tr.length;i++)
		{
			var product_td = product_tr[i].getElementsByTagName("TD");
			product_td[product_td.length-1].remove();
		}
		
		document.getElementById("calc-table").border = "1";
		document.getElementById("input").border = "inherit";
		
		// storing voucher details
		var buyer_name = document.getElementById("buyer_name").value;
		var buyer_email = document.getElementById("buyer_email").value;
		var buyer_address = document.getElementById("buyer_address").value;
		var buyer_number = document.getElementById("buyer_phone_num").value;
		var buyer_item = document.getElementsByClassName("items");
		for(i=0;i<buyer_item.length;i++)
		{
			store_item[i] = buyer_item[i].value;
		}
		
		var buyer_price = document.getElementsByClassName("price");
		for(i=0;i<buyer_price.length;i++)
		{
			store_price[i] = buyer_price[i].value;
		}
		
		var buyer_qty = document.getElementsByClassName("qty");
		for(i=0;i<buyer_qty.length;i++)
		{
			store_qty[i] = buyer_qty[i].value;
		}
		
		var buyer_amount = document.getElementsByClassName("amount");
		for(i=0;i<buyer_amount.length;i++)
		{
			store_amount[i] = buyer_amount[i].value;
		}
		
		var buyer_object = {buyer_name:buyer_name,buyer_email:buyer_email,buyer_address:buyer_address,buyer_number:buyer_number,store_item:store_item,store_price:store_price,store_qty:store_qty,store_amount:store_amount,store_subtotal:store_subtotal,store_tax:store_tax,store_total:store_total,store_paid:store_paid,store_dues:store_dues,store_date:voucher_date};
		
		var buyer_details = JSON.stringify(buyer_object);
		localStorage.setItem("voucher_no_"+all_voucher_no, buyer_details);
	}
}

bill();


// search voucher

function search_voucher()
{
	var search_field = document.getElementById("enter-voucher-no");
	search_field.onkeyup = function(event)
	{
		if(event.keyCode == 13)
		{
			var unit_type = "voucher_no_"+this.value;
			var i;
			for(i=0;i<localStorage.length;i++)
			{
				var keys = localStorage.key(i);
				if(keys == unit_type)
				{
					var buyer_string = localStorage.getItem(keys);
					var buyer_extract = JSON.parse(buyer_string);
					document.getElementById("sales-voucher").click();
					var dlt_voucher = document.getElementById("delete-voucher");
					dlt_voucher.style.display = "block";
					dlt_voucher.onclick = function(){
						var allow = window.confirm("Are you Sure");
						if(allow == true)
						{
							localStorage.removeItem("voucher_no_"+search_field.value);
							window.location = location.href;
						}
					}
					document.getElementById("voucher-no").innerHTML = "Voucher no: " +this.value;
					document.getElementById("buyer_name").value = buyer_extract.buyer_name;
					document.getElementById("buyer_email").value = buyer_extract.buyer_email;
					document.getElementById("buyer_address").value = buyer_extract.buyer_address;
					document.getElementById("buyer_phone_num").value = buyer_extract.buyer_number;
					var item = document.getElementsByClassName("items");
					var price = document.getElementsByClassName("price");
					var qty = document.getElementsByClassName("qty");
					var amount = document.getElementsByClassName("amount");
					var item_length = buyer_extract.store_item.length;
					var j;
					for(j=0;j<item_length;j++)
					{
						document.getElementById("add-item").click();
						item[j].value = buyer_extract.store_item[j];
						price[j].value = buyer_extract.store_price[j];
						price[j].disabled = false;
						qty[j].value = buyer_extract.store_qty[j];
						qty[j].disabled = false;
						amount[j].value = buyer_extract.store_amount[j];
					}
					
					
				
				var total_amount =document.getElementsByClassName("amount");
				var previous_amount = 0;
				for(j=0;j<total_amount.length;j++)
				{
					previous_amount = previous_amount + Number(total_amount[j].value);
					store_subtotal = previous_amount.toFixed(2);
					document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+ previous_amount.toFixed(2);
				}
				var reverse = 0;
				for(j=0;j<localStorage.length;j++)
				{
					var tax_name = localStorage.key(j);
					if(tax_name.indexOf("tax") != -1)
					{
						var tax_item = localStorage.getItem(tax_name);
						var extract = JSON.parse(tax_item);
						reverse += extract.tax +"<br>";
						document.getElementById("price_of_tax").innerHTML = "<span id='percentage' style='display:none;'>"+reverse.replace(0,"")+"</span>";
					}
				}
				
				
				
				var split_num = document.getElementById("percentage").innerHTML;
				var final_num = split_num.split("%<br>");
				
				for(j=0;j<final_num.length-1;j++)
				{
					var fixed = (previous_amount*final_num[j])/100;
					store_tax[j] = fixed.toFixed(2);
					document.getElementById("price_of_tax").innerHTML += "<i class='fa fa-rupee'></i> "+fixed.toFixed(2)+"<br>";
					previous_amount = previous_amount+fixed;
					store_total = previous_amount.toFixed(2);
					document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i>" + previous_amount.toFixed(2) ;
					document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i>" + previous_amount.toFixed(2) ;
					var paid = document.getElementById("input");
					paid.oninput = function(){
						store_paid = this.value;
						var dues = previous_amount-this.value;
						store_dues = dues.toFixed(2);
						document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i> "+dues.toFixed(2);
					}
				}
					
					document.getElementById("input").value = buyer_extract.store_paid;
					document.getElementById("balance").innerHTML = "<i class='fa fa-rupee'></i> "+buyer_extract.store_dues;	
					document.getElementById("showing-currentdate").innerHTML = "Date : "+buyer_extract.store_date;
					all_voucher_no = this.value;
				}
			}
			
			
			var date = document.getElementById("showing-currentdate");
			date.onclick = function(){
				this.style.cursor = "pointer";
				var input = window.prompt("Edit date in this format", buyer_extract.store_date);
				this.innerHTML = "Date : "+ input;
				voucher_date = input;
				if(input == null)
				{
					this.innerHTML = "Date : "+buyer_extract.store_date;
				}
			}
		}
	}
}

search_voucher();


// manage voucher box coding

function manage_voucher(){
	var i;
	for(i=0;localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.indexOf("voucher_no_") != -1)
		{
			document.getElementById("voucher-section").style.display = "block";
			return false; 
		}
		else{
			document.getElementById("voucher-section").style.display = "none";
		}
	}
}

manage_voucher();


// manage tax coding

function manage_taxes()
{
	var select_tax = document.getElementById("select-tax");
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match("tax"))
		{
			document.getElementById("tax-section").style.display = "block";
			var option = document.createElement("OPTION");
			option.append(document.createTextNode(all_keys));
			select_tax.append(option);
		}
	}
	
	// selected tax appear on taax button
		select_tax.onchange = function(){
			var reverse = this.value;
			document.getElementById("tax-setup").click();
			var tax_icon = document.getElementById("tax-icon");
			tax_icon.className = "fa fa-trash";
			tax_icon.onclick = function(){
				var confirm = window.confirm("Do you want to delete this tax ?");
				if(confirm == true)
				{
					localStorage.removeItem(reverse);
					window.location = location.href;
				}
			}
		select_tax.onclick = function(){
			document.getElementById("tax-setup").click();
		}
		
		var tax_string = localStorage.getItem(this.value);
		var tax_extract = JSON.parse(tax_string);
		document.getElementById("tax-name").value = tax_extract.name_of_tax;
		document.getElementById("tax").value = tax_extract.tax;
		document.getElementById("tax-submit").onclick = function(){
			var name_of_tax = document.getElementById("tax-name").value;
			var tax_qty = document.getElementById("tax").value;
			if(name_of_tax == reverse){
			var tax_object = {name_of_tax:name_of_tax, tax:tax_qty};
			var tax_store = JSON.stringify(tax_object);
			localStorage.setItem(name_of_tax, tax_store);
			}
			
			else{
				localStorage.removeItem(reverse);
				var tax_object = {name_of_tax:name_of_tax, tax:tax_qty};
				var tax_store = JSON.stringify(tax_object);
				localStorage.setItem(name_of_tax, tax_store);
			}
		}
	}
}

manage_taxes();



// shut company coding

function shut_company(){
	var shut_cmp = document.getElementById("shut-company");
	shut_cmp.onclick = function(){
		window.location = "../business.html";
	}
}

shut_company();

//shut_company();
