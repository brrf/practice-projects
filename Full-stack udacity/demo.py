import psycopg2

connection = psycopg2.connect('dbname=example2')

cursor = connection.cursor()

cursor.execute('DROP TABLE IF EXISTS table2')

cursor.execute('''
	CREATE TABLE table2 (
		id INTEGER PRIMARY KEY,
		completed BOOLEAN NOT NULL DEFAULT False
	);
''')

cursor.execute('INSERT INTO table2 (id, completed) VALUES (%(id)s, %(completed)s);', {
	'id': 2,
	'completed': False
	})

cursor.execute('INSERT INTO table2 (id, completed)' +
	' VALUES (%s, %s);', (1, True))

cursor.execute('SELECT * FROM table2;')

result = cursor.fetchone()
print(result)

connection.commit()

connection.close()
cursor.close()