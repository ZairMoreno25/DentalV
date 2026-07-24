import sqlite3

db = sqlite3.connect('db.sqlite3')
for r in db.execute("SELECT sql FROM sqlite_master WHERE type='table';"):
    print(f"--- Table Schema ---\n{r[0]}\n")
