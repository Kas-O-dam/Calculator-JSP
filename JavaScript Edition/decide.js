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



