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
input_ex = ''
counter = -1
operations = ('+', '-', '*', '/')
class SymbolError(Exception):
	def __init__(self, *args):
		self.symbol = args[0]
		self.index = args[1]
		self.message = 'uncorrect symbol \''+self.symbol+'\' in index '+str(self.index)
	def __str__(self):
		return self.message
def calc(value):
	global input_ex
	global prior
	global proto
	global counter
	input_ex = value
	part = []
	def get_passive():
		global prior
		string = ''
		for idx in range(0,prior['op_index'])[::-1]:
			#print('pidx: '+str(idx)) #
			sym = input_ex[idx]
			try:
				int(sym)
				string+=sym
			except:
				if(sym not in operations):
					raise SymbolError(sym, idx)
				op_dict = {'st_index': idx+1}
				prior.update(op_dict)
				#print('passive: ' + string[::-1]) #
				return string[::-1]
			if(idx==0):
				op_dict = {'st_index': idx}
				prior.update(op_dict)
				#print('passive: ' + string[::-1]) #
				return string[::-1]
	def get_active():
		string = ''
		for idx in range(prior['op_index']+1,len(input_ex)):
			#print('aidx: ' + str(idx)) #
			sym = input_ex[idx]
			try:
				int(sym)
				string+=sym
			except:
				if(sym not in operations):
					raise SymbolError(sym, idx)
				op_dict = {'en_index': idx+1}
				prior.update(op_dict)
				#print('active: ' + string) #
				return string
			if(idx==len(input_ex)-1):
				op_dict = {'en_index': idx+2}
				prior.update(op_dict)
				#print('active: ' + string) #
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
		result = int(result)
		#print('result: '+str(result))
		return str(result)
	#for i in range(0,len(input_ex)):
	#	if(input_ex[i]=='('):
	#		for s in range(i,len(input_ex),1):
	#			if(s==')'):
	#				part.append(input_ex)
	#				input_ex = input_ex[i+1:s]
	#				calc(input_ex)
	#				input_ex = part.pop()				
	def searcher(op1, op2):
		global input_ex
		global counter
		counter = -1
		for i in input_ex:
			counter+=1
			if(i==op1 or i==op2):
				if(counter == 0):
					break
				op_dict = {'op_index': counter}
				prior.update(op_dict)
				op_dict = {'active': get_active()}
				prior.update(op_dict)
				op_dict = {'passive': get_passive()}
				prior.update(op_dict)
				if(i==op1):
					op_dict = {'operator': op1}
					prior.update(op_dict)
				if(i==op2):
					op_dict = {'operator': op2}
					prior.update(op_dict)
				input_ex = input_ex[0:prior['st_index']]+decide()+input_ex[prior['en_index']-1:len(input_ex)]
				#print(prior['st_index'])
				#print(prior['en_index'])
				#print('ie: '+input_ex)
				if(input_ex.find(op1) or input_ex.find(op2)):
					searcher(op1, op2)
				break
	searcher('*', '/')
	searcher('+', '-')
	return input_ex
