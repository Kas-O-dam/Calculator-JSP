function equation(example='+76+324*238'){
	let element = [];
	function search(op){
		let smb = '';
		for(let idx in example){
			smb = example[idx];
			if(smb==op){
				console.log('find operator: '+op)
				let obj = {};
				obj.num = '';
				for(let i = +idx+1; i <= example.length-1; i++){
					s = example[i];
					console.log('num symbol now: '+s); //
					if(!isNaN(s)){obj.num+=s}else{break};
				};
				delete obj.op
				obj.num = +obj.num;
				element.push(obj);
				console.log(element[element.length-1]); //
			};
		};
	};
	search('/');
	search('*');
	search('-');
	search('+');
};
console.log(equation());
