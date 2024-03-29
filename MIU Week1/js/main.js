//Isayev Anton
// MIU
window.addEventListener("DOMContentLoaded", function(){


	function ge (x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
function makeChoises (){
	var formTag = document.getElementsByTagName("form")
		selectLi = ge('gameinfos'),
		makeGameinfo = document.createElement('select');
		makeGameinfo.setAttribute("id","groups");
	for (var i = 0, j = gameGroups.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText = gameGroups[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeGameinfo.appendChild(makeOption);
	}
	selectLi.appendChild(makeGameinfo);
}

function getSelectedRadio(){
	var radio = document.forms[0].console;
	for (var i = 0; i <radio.length; i++) {
		if (radio[i].checked) {
			consoleValue = radio[i].value;
		};
	};
};


function getCheckboxCategory(){
	if(ge('coop').checked){
		coopValue = ge('coop').value;
	}else{
		coopValue = "No";
	}
		if(ge('multyplayer').checked){
		multyplayerValue = ge('multyplayer').value;
	}else{
		multyplayerValue = "No";
	}
		if(ge('singleplayer').checked){
		singleplayerValue = ge('singleplayer').value;
	}else{
		singleplayerValue = "No";
	}
};

function toggleControls(n){
	switch(n){
		case "on":
			ge('AddGameForm').style.display = "none";
			ge('clear').style.display = "inline";
			ge('displayLink').style.display = "none";
			ge('addNew').style.display = "inline";
			ge('submit').style.display = "none";
			break;
		case "off":
			ge('AddGameForm').style.display = "block";
			ge('clear').style.display = "inline";
			ge('displayLink').style.display = "inline";
			ge('addNew').style.display = "none";
			ge('items').style.display = "none";
			break;
		default:
			return false;
	}
}

function storeData(key){
	if(!key){
		var id 			= Math.floor(Math.random( )*1000000001);
	}else{
		id = key;
	}
	getCheckboxCategory();
	getSelectedRadio();
	var item 			= {};
	item.gname 			=["Game name:", ge('gname').value];
	item.rday 			=["Relise date:", ge('rday').value];
	item.aat 			=["Available at:", ge('aat').value];
	item.pri 			=["Price:", ge('pri').value];
	item.gametype 		=["Game type:", ge('groups').value];
	item.console 		=["Console:", consoleValue];
	item.coop 			=["Co-op Game:", coopValue];
	item.multyplayer 	=["Multi-player Game:", multyplayerValue];
	item.singleplayer 	=["Single-player Game:", singleplayerValue];
	item.priority 		=["Priority of the Game:", ge('priority').value];
	item.addinfo		=["Aditional Info:", ge('aditionalinfo').value]
	localStorage.setItem(id, JSON.stringify(item));
	alert("Game added");
}



function getData(){
	if(localStorage.length === 0){
		alert("There is no game in your library! default data was added.");
		autoFillData();
	}
	makeDiv = document.createElement('div');
	makeDiv.setAttribute("id","items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	ge('items').style.display = "block";
	for(var i=0, len=localStorage.length; i<len;i++){
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubList);
		getImage(obj.groups[1], makeSubList);
		for(var n in obj){
			var makeSubli = document.createElement('li');
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi); 
	}
	toggleControls("on");
}

function getImage(catName, makeSubList){
	var imageLi = document.createElement('li');
	makeSubList.appendChild(imageLi);
	var newImg = document.createElement('img');
	var setSrc = newImg.setAttribute("src","img/" + catName + ".png");
	imageLi.appendChild(newImage);
}

function autoFillData(){
	for(var n in json){
		var id = Math.floor(Math.random( )*1000000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
}

function makeItemLinks(key, linksLi){
	var editLink = document.createElement('a');
 	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Game";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	//var brakeTag = document.createElement('br');
	//linksLi.appendChild(brakeTag);

	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Game";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

function editItem(){
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);

	toggleControls("off");

	ge('gname').value = item.gname[1];
	ge('rday').value = item.rday[1];
	ge('aat').value = item.aat[1];
	ge('pri').value = item.pri[1];
	ge('groups').value = item.gametype[1];
	ge('aditionalinfo').value = item.addinfo[1];
	var radios = document.forms[0].console;
	for( var i=0; i<radios.length; i++){
		if(radios[i].value == "XBox" && item.console[1] == "XBox") {
			radios[i].setAttribute("checked", "checked")
		} else if(radios[i].value == "PS3" && item.console[1] == "PS3") {
			radios[i].setAttribute("checked", "checked")
		} else if(radios[i].value == "PC" && item.console[1] == "PC") {
			radios[i].setAttribute("checked", "checked")
		} else if(radios[i].value == "Wii" && item.console[1] == "Wii") {
			radios[i].setAttribute("checked", "checked")
		} else if(radios[i].value == "MAC" && item.console[1] == "MAC") {
			radios[i].setAttribute("checked", "checked")
		}
	}
	if(item.coopValue[i] == "coop") {
		ge('Co-op Game:').setAttribute("checked", "checked");
	}
	if(item.multyplayerValue[i] == "multyplayer") {
		ge('Multi-player Game:').setAttribute("checked", "checked");
	}	
	if(item.singleplayerValue[i] == "singleplayer") {
		ge('Single-player Game:').setAttribute("checked", "checked");
	}
	ge('priority').value = item.priority[1];
	ge('aditionalinfo').value = item.addinfo[1];

	save.removeEventListener("click", storeData);

	ge('submit').value = "Edit Game";
	var editSubmit = ge('submit');
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;

};

function deleteItem(){
	var ask = confirm("Are you sure you want to delit this game?");
	if(ask){
		localStorage.removeItem(this.key);
		window.location.reload("delited");
	}else{
		alert("Game was not deleted.")
	}
};

function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All games are deleted!");
		window.location.reload();
		return false;
	}
};

function validate(e){
	var getGrops = ge('groups');
	var getGname = ge('gname');
	var getAat 	 =  ge('aat');
	var getPri   = ge('pri');
	var getRday  = ge('rday');

	errMsg.innerHTML = "";
	getGrops.style.border = "1px solid black";
	getGname.style.border = "1px solid black";
	getAat.style.border = "1px solid black";
	getPri.style.border = "1px solid black";
	getRday.style.border = "1px solid black";

	var messageAry = [];

	if(getGrops.value =="---Chose Game type---"){
		var groupsError = " Please choose Game type !";
		getGrops.style.border = "1px solid red";
		messageAry.push(groupsError); 

	}
	if(getGname.value === ""){
		var gnameError = " Please enter game name !";
		getGname.style.border = "1px solid red";
		messageAry.push(gnameError);
	}
	if(getAat.value === ""){
		var aatError = " Please enter Available at !";
		getAat.style.border = "1px solid red";
		messageAry.push(aatError);
	}
	if(getPri.value === ""){
		var priError = " Please enter Price !";
		getPri.style.border = "1px solid red";
		messageAry.push(priError);
	}
	if(getRday.value === ""){
		var rdayError = " Please enter Relise date !";
		getRday.style.border = "1px solid red";
		messageAry.push(rdayError);
	}
	// display errors
	if(messageAry.length >= 1){
		for(var i=0, j=messageAry.length; i < j; i++){
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
	}else{
		storeData(this.key);
	}
}

var gameGroups = ["---Chose Game type---","Action","RPG","Strategy","Racing","Simulation","MMO"],
	console,
	coopValue = "No",
	multyplayerValue = "No",
	singleplayerValue = "No",
	errMsg = ge('errors');

makeChoises();
 //click events
var displayLink = ge('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);
});