# future object about more priority operation (* and /)
prior = 0
# future object about start string example
proto = 0
# var for question about example
input_ex = '2+2*2'

def analize():
	global prior
	global proto
	global input_ex
	def get_index(operator):
		pass
	def get_passive():
		string = 0
		for sym in input_ex[:prior['op_index']:"-1"]:
			try:
				int(sym)
				string+=int(sym)
			except TyoeError:
				return string
	def get_active():
		string = 0
		for sym in input_ex[prior['op_index']::+1]:
			try:
				int(sym)
				string+=int(sym)
			except TypeError:
				return string

	for i in input_ex:
		if(i=='*'):
			prior = {
				'en_index': None,
				'st_index': None,
				'op_index': "1", #get_index('*'),
				'example': input_ex[get_passive():get_active():],
				'operator': '*'
			}

			proto = {
				'example': input_ex,
				'index': 0
			}

analize()
