var nextId = (function() {
	var nextIndex = [0,0,0];
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	var num = chars.length;

	return function() {
		var a = nextIndex[0];
		var b = nextIndex[1];
		var c = nextIndex[2];
		var id = chars[a] + chars[b] + chars[c];

		a = ++a % num;

		if (!a) {
			b = ++b % num; 

			if (!b) {
				c = ++c % num; 
			}
		}
		nextIndex = [a, b, c]; 
		return id;
	}
}());

var selectboxes=document.getElementsByClassName('autoselect');
for(i=0;i<selectboxes.length;i++){

	var options=[];
	var rvar=nextId();
	selectboxes[i].insertAdjacentHTML('afterEnd',"<div class='astdata' id='astdata"+rvar+"'><input type='text' autocomplete='off' rel='astdataul"+rvar+"' index='"+i+"' class='ast form-control' id='ast"+rvar+"'></div>");
	
	var datarvar=document.getElementById('astdata'+rvar);
	var html="<ul class='astdataul' style='display:none' id='astdataul"+rvar+"'>";
	for(j=0;j<selectboxes[i].options.length;j++){
		html+="<li value='"+selectboxes[i].options[j].value+"'>"+selectboxes[i].options[j].text+"</li>";
	}
	html+="</ul>";
	datarvar.innerHTML+=html;
	var inputrvar=document.getElementById('ast'+rvar);

	
	var found;
	inputrvar.addEventListener('keyup',function(){
		var dataulrvar=document.getElementById(this.getAttribute('rel'));
		var elinput=this;
		var index=this.getAttribute('index');
		found=0;
		for(k=0;k<dataulrvar.childNodes.length;k++){
			if(dataulrvar.childNodes[k].innerHTML.toLowerCase().indexOf(this.value.toLowerCase())<0)
				dataulrvar.childNodes[k].style.display='none';
			else{
				dataulrvar.childNodes[k].style.display='inherit';
				found++;
			}
			
			dataulrvar.style.display='block';
			if(this.value=='')
				dataulrvar.style.display='none';

			dataulrvar.childNodes[k].addEventListener('click',function(){
				selectboxes[index].value=this.getAttribute('value');
				selectboxes[index].dispatchEvent(new Event('change'));
				elinput.value=this.innerHTML;
				dataulrvar.style.display='none';
			},false);
		}
	},false)

	inputrvar.addEventListener('blur',function(){
		if(found==0)
			this.value="";
	},false)
}