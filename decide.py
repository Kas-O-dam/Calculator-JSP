#                                                                                   $$$$$$$
#	  %%%%%   %%%%%    #######                                                 $$()$$$$$
#	 %%%%%%% %%%%%%%   ###  ###                ##                                 $$$$$$;;;
#	%%%%%%%%%%%%%%%%%  ###  ###           ##   ##                           $$$$$$$$$$$;;;;;;
#	 %%%%%%%%%%%%%%%   ######   ##   ##  ####  ######    ####   #####      $$$$$$$$$$;;;;;;;;;
#	   %%%%%%%%%%%     ##        ## ##    ##   ##   ##  ##  ##  ##   ##     $$$$;;;;;;;;;;;;;
#	      %%%%%        ##         ##      ##   ##   ##  ##  ##  ##   ##      $$$;;;;;;
#	        %          ##        ##        ##  ##   ##   ####   ##   ##         ;;;;;;();;
#										     ;;;;;;;
#Для мотивации, радости и желании работать
prior = {
	'en_index': 0,
	'st_index': 0,
	'op_index': 0,
	'active': 0,
	'passive': 0,
	'example': '',
	'operator': ''
}
proto = {
	'example': '',
	'st_index': 0
}
def calc(input_ex):
	global prior
	global proto
	counter=-1
	def get_passive():
		global prior
		string = ''
		for idx in range(0,prior['op_index'])[::-1]:
			#print('pidx: '+str(idx))
			sym = input_ex[idx]
			try:
				int(sym)
				string+=sym
			except:
				op_dict = {'st_index': idx+1}
				prior.update(op_dict)
				#print('passive: ' + string[::-1])
				return string[::-1]
			if(idx==0):
				op_dict = {'st_index': idx}
				prior.update(op_dict)
				#print('passive: ' + string[::-1])
				return string[::-1]
	def get_active():
		string = ''
		for idx in range(prior['op_index']+1,len(input_ex)):
			#print('aidx: ' + str(idx))
			sym = input_ex[idx]
			try:
				int(sym)
				string+=sym
			except:
				op_dict = {'en_index': idx+1}
				prior.update(op_dict)
				#print('active: ' + string)
				return string
			if(idx==len(input_ex)-1):
				op_dict = {'en_index': idx+2}
				prior.update(op_dict)
				#print('active: ' + string)
				return string
	def decide():
		result=0
		if(prior['operator']=='*'):
			result = int(prior['passive'])*int(prior['active'])
		if(prior['operator']=='/'):
			result = int(prior['passive'])/int(prior['active'])
		if(prior['operator']=='+'):
			result = int(prior['passive'])+int(prior['active'])
		if(prior['operator']=='-'):
			result = int(prior['passive'])-int(prior['active'])
		#print('result: '+str(result))
		return str(result)
	def acpc():
		op_dict = {'active': get_active()}
		prior.update(op_dict)
		op_dict = {'passive': get_passive()}
		prior.update(op_dict)
	for i in input_ex:
		counter+=1
		if(i=='*' or i=='/'):
			op_dict = {'op_index': counter}
			prior.update(op_dict)
			acpc()
			if(i=='*'):
				op_dict = {'operator': '*'}
				prior.update(op_dict)
			if(i=='/'):
				op_dict = {'operator': '/'}
				prior.update(op_dict)
				
			input_ex = input_ex[0:prior['st_index']]+decide()+input_ex[prior['en_index']-1:len(input_ex)]
			#print(prior['st_index'])
			#print(prior['en_index'])
			#print('ie: '+input_ex)
	counter=-1
	for i in input_ex:
		counter+=1
		if(i=='+' or i=='-'):
			op_dict = {'op_index': counter}
			prior.update(op_dict)
			acpc()
			if(i=='+'):
				op_dict = {'operator': '+'}
				prior.update(op_dict)
			if(i=='-'):
				op_dict = {'operator': '-'}
				prior.update(op_dict)
			input_ex = input_ex[0:prior['st_index']]+decide()+input_ex[prior['en_index']-1:len(input_ex)]
			#print(prior['st_index'])
			#print(prior['en_index'])
			#print('ie: '+input_ex)
	return input_ex
