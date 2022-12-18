function calc(example){
	let prioritet = new Map();
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
				prioritet.set('st_index', Number(index)+1);
				//console.log('passive: ' + string); //
				return string;
			};
			if(index==0){
				prioritet.set('st_index', Number(index));
				//console.log('passive: ' + string); //
				return string;
			};
		};
	};
	function decide(){
		if(prioritet.get('operator')=='**'){
			return Number(prioritet.get('passive'))**Number(prioritet.get('active'));
		};
		if(prioritet.get('operator')=='*'){
			return Number(prioritet.get('passive'))*Number(prioritet.get('active'));
		};
		if(prioritet.get('operator')=='/'){
			return Number(prioritet.get('passive'))/Number(prioritet.get('active'));
		};
		if(prioritet.get('operator')=='+'){
			return Number(prioritet.get('passive'))+Number(prioritet.get('active'));
		};
		if(prioritet.get('operator')=='-'){
			return Number(prioritet.get('passive'))-Number(prioritet.get('active'));
		};
	};
	function search(op1, op2){
		let counter = -1;
		let symbol;
		for(i in example){
			counter += 1;
			symbol = example.charAt(i);
			if(symbol==op1 || symbol==op2){
				if(symbol==op1){prioritet.set('operator', op1);};
				if(symbol==op2){prioritet.set('operator', op2);};
				prioritet.set('op_index_active', counter);
				prioritet.set('op_index_passive', counter);
				prioritet.set('active', get_active());
				prioritet.set('passive', get_passive());
				//console.log(decide())
				example = example.slice(0, prioritet.get('st_index'))+decide()+example.slice(prioritet.get('en_index')-1, example.length);
				//console.log(prioritet)
				if(example.includes(op1) || example.includes(op2)){search(op1, op2);};
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
				//console.log(decide())
				example = example.slice(0, prioritet.get('st_index'))+decide()+example.slice(prioritet.get('en_index')-1, example.length);
				//console.log(prioritet)
				if(example.includes(operator)){double_search(operator);};
				break;
			};
		};
	};
	double_search('**')
	search('*', '/');
	search('+', '-');
	return example
};
console.log(calc('2**3**2'));
