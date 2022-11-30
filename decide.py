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

# А сейчас я поведаю об алгоритме сией программы
# есть функция analize, в которой сначала объявляются функции get_passive & get_active а потом гоняем по всему примеру циклом и всю инфу заносим в объекты
# цикл в конце анализирует два объекта: prior и proto, prior - объект выражения приоритетного оператора таких как умножить и делить, proto это инфа обо всём выражении в целом
# get_active - функция добывающая активное число, т. е. число НА которое делят, вычитают, суммируют...
# get_passive - добывает пассивное число, 3+2 пассивное 3, активное 2
# сейчас всё работает фигово... но синтаксические ошибки исправлены, интерпретатор не ругается
# 
# 
# 
# 
# 
# поля на будущее...
# 
# 
# 
# 
# 


# Это будущий объект для хранения информации о части с которой работает интерпретатор на данный момент
prior = {
	'en_index': 0,
	'st_index': 0,
	'op_index': 0,
	'active': 0,
	'passive': 0,
	'example': '',
	'operator': ''
}
# Это будущий объект содержащий информацию о первоначальном состоянии примера
proto = {
	'example': '',
	'st_index': 0
}
# По идей тут должен быть инпут, строка присвоена чтоб не парится
def analize(input_ex):
	# выставляем все переменные как глобальные
	global prior
	global proto
	counter=-1
	# фунция для нахождения пассивного числа (числителя)
	def get_passive():
		global prior
		# Содержит в себе пассивное число и будет ретарнино по окончании интерпретации
		string = ''
		# интерпретатор
		for idx in range(0,prior['op_index'])[::-1]: # перебираем символы в подстроке
			# блок-try (трай) служит для ловли ошибок
			#print('pidx: '+str(idx))
			sym = input_ex[idx]
			try:
				# Если содержимое трай вызывает ошибку... ->
				# пробуем, я посставил это в начало, чтобы переменной пассивного числа не присваивалась всякаяя фигня
				int(sym)
				# теперь присваеваем
				string+=sym
			except:
				# <- ...то выполнится блок-ексепт
				# ретарн пассивного числа
				op_dict = {'st_index': idx+1}
				prior.update(op_dict)
				#print('passive: ' + string[::-1])
				return string[::-1]
			# На случай если пассивное число самое первое в примере
			if(idx==0):
				op_dict = {'st_index': idx}
				prior.update(op_dict)
				#print('passive: ' + string[::-1])
				return string[::-1]
	# всё тоже самое только для активного числа (знаменателя)
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
	# Вот тут начинается объектная жесть
	for i in input_ex:
		counter+=1
		# делить добавим потом, для начала нужен алгоритм
		if(i=='*' or i=='/'):
			# присваиваем объекту все свойства
			# Тут всё можно было сделать проще... но зачем? Ведь и так же работает. На самом деле так нужно чтобы свойства не были кортежами
			op_dict = {'op_index': counter}
			prior.update(op_dict)
			# активное число
			op_dict = {'active': get_active()}
			prior.update(op_dict)
			# пассивное число
			op_dict = {'passive': get_passive()}
			prior.update(op_dict)
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
		# делить добавим потом, для начала нужен алгоритм
		if(i=='+' or i=='-'):
			# присваиваем объекту все свойства
			# Тут всё можно было сделать проще... но зачем? Ведь и так же работает. На самом деле так нужно чтобы свойства не были кортежами
			op_dict = {'op_index': counter}
			prior.update(op_dict)
			# активное число
			op_dict = {'active': get_active()}
			prior.update(op_dict)
			# пассивное число
			op_dict = {'passive': get_passive()}
			prior.update(op_dict)
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
# Всё будет оформлено в виде модуля, так что обернуть функцию и вызвать её - это обязательно
