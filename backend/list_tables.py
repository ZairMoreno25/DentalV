import sqlite3

db = sqlite3.connect('db.sqlite3')
for r in db.execute("SELECT name FROM sqlite_master WHERE type='table';"):
    print(r[0])
