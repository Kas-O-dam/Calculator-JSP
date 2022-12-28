//general variables
let form = document.getElementById('input');
let col = document.getElementsByClassName('botton');
let nums = new Object();
//declare nubers
nums.zero = col[9];
nums.one = col[8];
nums.two = col[7];
nums.three = col[6];
nums.four = col[5];
nums.five = col[4];
nums.six = col[3];
nums.seven = col[2];
nums.eight = col[1];
nums.nine = col[0];
//declare operators
nums.plus = col[10];
nums.minus = col[11];
nums.multiple = col[12];
nums.divide = col[13];
nums.degree = col[14];
nums.equal = col[15];
//event numbers
nums.zero.addEventListener('click', function(){form.value += '0'});
nums.one.addEventListener('click', function(){form.value += '1'});
nums.two.addEventListener('click', function(){form.value += '2'});
nums.three.addEventListener('click', function(){form.value += '3'});
nums.four.addEventListener('click', function(){form.value += '4'});
nums.five.addEventListener('click', function(){form.value += '5'});
nums.six.addEventListener('click', function(){form.value += '6'});
nums.seven.addEventListener('click', function(){form.value += '7'});
nums.eight.addEventListener('click', function(){form.value += '8'});
nums.nine.addEventListener('click', function(){form.value += '9'});
// event operators
nums.plus.addEventListener('click', function(){form.value += '+'});
nums.minus.addEventListener('click', function(){form.value += '-'});
nums.multiple.addEventListener('click', function(){form.value += '*'});
nums.divide.addEventListener('click', function(){form.value += '/'});
nums.degree.addEventListener('click', function(){form.value += '**'});
nums.equal.addEventListener('click', function(){form.value = calc(form.value)});
// Hot keys
document.addEventListener('keydown', function(event){if(event.key=='Enter'){form.value = calc(form.value)}});
document.addEventListener('keydown', function(event){if(event.key=='Delete'){form.value = ''}});
document.addEventListener('keydown', function(event){if(event.key=='Backspace'){form.value = form.value.slice(0, form.value.length-1)}});
//delete == clear input
//enter == decide
//backspace == delete last character


/*
   #####
   ##
   #####  # ##    #     # ## ##    ###
   ##     ##     # #    ##  #  #  #   #
   ##     #     #####   #   #  #  ###
   ##     #    #     #  #   #  #   ####
*/

let chk = 0;
let sw = true;
function calc(example){
	let prioritet = new Map();
	let slices = [];
	function get_active(){
		let string = '';
		for(let index = prioritet.get('op_index_active')+1; index <= example.length-1; index++){
			sym = example[index];
			if(sym != '*' && sym != '/' && sym != '+' && sym != '-'){
				//console.log('aindex: '+ index); //
				string+=sym;
			}else{
				prioritet.set('en_index', Number(index)+1);
				//console.log('active: ' + string); //
				return string;
			};
			if(index==example.length-1){
				prioritet.set('en_index', Number(index)+2);
				//console.log('active: ' + string); //
				return string;
			};
		};
	};
	function get_passive(){
		let string = '';
		for(let index = prioritet.get('op_index_passive')-1; index >= 0; index--){
			sym = example[index];
			if(sym != '*' && sym != '/' && sym != '+' && sym != '-'){
				//console.log('pindex: '+ index); //
				string+=sym;
			}else{
				string = string.split("").reverse().join("");
				prioritet.set('st_index', Number(index)+1);
				//console.log('passive: ' + string); //
				return string;
			};
			if(index==0){
				string = string.split("").reverse().join("");
				prioritet.set('st_index', Number(index));
				//console.log('passive: ' + string); //
				return string;
			};
		};
	};
	function decide(){
		if(prioritet.get('operator')=='**'){
			return (+prioritet.get('passive')) ** (+prioritet.get('active'));
		};
		if(prioritet.get('operator')=='*'){
			return (+prioritet.get('passive')) * (+prioritet.get('active'));
		};
		if(prioritet.get('operator')=='/'){
			return (+prioritet.get('passive')) / (+prioritet.get('active'));
		};
		if(prioritet.get('operator')=='+'){
			return (+prioritet.get('passive')) + (+prioritet.get('active'));
		};
		if(prioritet.get('operator')=='-'){
			return (+prioritet.get('passive')) - (+prioritet.get('active'));
		};
	};
	//pt = ParenThese
	//op = OPerator
	//st = STart
	//en = ENd
	//chk = CHecK
	function get_pt(){
		let indl = new Array();
		for(let i = 0; i <= example.length-1; i++){
			//console.log('ptindex: ' + i); //
			if(example[i]=='('){
				indl.push(i);
			};
			if(example[i]==')'){return {st: indl.pop()+1, end: i}};
			if(example[i]==')'&&i==example.length-1){return {st: indl.pop(), end: i}};
		};
	};
	function search_pt(pt){
		let counter = -1;
		let char = '';
		for(i in example){
			counter += 1;
			char = example.charAt(i);
			if(char==pt){
				let obj_pt = get_pt();
				//console.log(obj_pt)
				try{
					prioritet.set('pt_st_index', obj_pt.st);
					prioritet.set('pt_en_index', obj_pt.end);
				}catch(err){return};
				//prioritet.set('parethese', pt);
				prioritet.set('part', example.slice(prioritet.get('pt_st_index'), prioritet.get('pt_en_index')));
				slices.push(example);
				example = prioritet.get('part')
				let result = calc(example);
				example = slices.pop();
				example = example.slice(0, prioritet.get('pt_st_index')-1)+result+example.slice(prioritet.get('pt_en_index')+1, example.length);
				if(example.includes('(')){search_pt(pt)};
				//console.log(prioritet); //
				//console.log('example: ' + example);
			};
			
		};
	};
	function search(op){
		let counter = -1;
		let symbol;
		for(i in example){
			counter += 1;
			symbol = example.charAt(i);
			if(symbol==op){ 
				prioritet.set('operator', op);
				prioritet.set('op_index_active', counter);
				prioritet.set('op_index_passive', counter);
				prioritet.set('active', get_active());
				prioritet.set('passive', get_passive());
				//console.log(example) //
				example = example.slice(0, prioritet.get('st_index'))+decide()+example.slice(prioritet.get('en_index')-1, example.length);
				//console.log(prioritet) //
				if(example.includes(op)){search(op);};
				break;
			};
		};
	};
	function double_search(operator){
		for(i in example){
			if(example[Number(i)] + example[Number(i)+1] == operator){
				prioritet.set('operator', operator);
				prioritet.set('op_index_active', Number(i)+1);
				prioritet.set('op_index_passive', Number(i));
				prioritet.set('active', get_active());
				prioritet.set('passive', get_passive());
				//console.log(example) //
				example = example.slice(0, prioritet.get('st_index'))+decide()+example.slice(prioritet.get('en_index')-1, example.length);
				//console.log(prioritet) //
				if(example.includes(operator)){double_search(operator);};
				break;
			};
		};
	};
	search_pt('(');
	double_search('**');
	search('*');
	search('/');
	search('-');
	search('+');
	return example;
};
//5*(5*(2+2)) //100
//4+(6*2)**2+(7-6) //149



