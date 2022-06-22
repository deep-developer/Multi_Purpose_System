
// exit coding
function exit(){
	var exit = document.getElementById("exit");
	exit.onclick = function (){
		history.back();
	}
}
exit();


// menu hover coding 
function menu_hover(){
	var btn_effect = document.getElementsByClassName("btn");
	var i;
	for(i=0;i<btn_effect.length;i++)
	{
		btn_effect[i].onmouseover = function(){
			this.style.webkitTransform = "rotate(360deg)";
			this.style.mozTransform = "rotate(360deg)";
			this.style.transform = "rotate(360deg)";
			this.style.webkitTransition = "1s";
			this.style.mozTransition = "1s";
			this.style.transition = "1s";
			this.style.backgroundColor = "black";
			this.style.color = "white";
		}
		
		btn_effect[i].onmouseout = function(){
			this.style.webkitTransform = "rotate(0deg)";
			this.style.mozTransform = "rotate(0deg)";
			this.style.transform = "rotate(0deg)";
			this.style.webkitTransition = "1s";
			this.style.mozTransition = "1s";
			this.style.transition = "1s";
			this.style.backgroundColor = "#55917F";
			this.style.color = "black";
		}
	}
}

menu_hover();


// update cash and profit loss ledger coding

function default_ledger(){
	
	var cash = localStorage.getItem("cash_ledger");
	var profit_and_loss = localStorage.getItem("profit_loss_ledger");
	if(cash == null && profit_and_loss == null)
	{
		var cash_ledger = {ledger_name:"cash", groups:"cash in hand", opening_balance:"", mode:""};
		var cash_store = JSON.stringify(cash_ledger);
		localStorage.setItem("cash_ledger", cash_store);
		
		var profit_loss_ledger = {ledger_name:"Profit & Loss a/c", groups:"Profit & Loss a/c", opening_balance:"", mode:""};
		var profit_store = JSON.stringify(profit_loss_ledger);
		localStorage.setItem("profit_loss_ledger", profit_store);
	}
	
	else{
	
	}
}

default_ledger();


// unif of measure appear box

function unit_of_measure_appear(){
	document.getElementById("unit-measure").onclick = function(){
		var frame = document.getElementById("iframe");
		frame.style.display = "block";
		frame.src = "accounts_only.html#secondary-content";
		frame.onload = function(){
			var target = frame.contentWindow.document.getElementById("secondary-content");
			target.click();
			target.style.position = "absolute";
			target.style.top = "0";
			target.style.left = "0";
			
		}
	}
} 

unit_of_measure_appear();