export default [
  {
    "statements": [
      "CREATE TABLE \"users\" (\n  \"id\" TEXT NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"avatar_url\" TEXT,\n  CONSTRAINT \"users_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"ingredients_photo_uploads\" (\n  \"id\" TEXT NOT NULL,\n  \"user_id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  \"uploaded_at\" TEXT,\n  \"state\" TEXT NOT NULL,\n  \"upload_duration_sec\" REAL,\n  \"ai_processing_duration_sec\" REAL,\n  \"photo_url\" TEXT,\n  CONSTRAINT \"ingredients_photo_uploads_user_id_fkey\" FOREIGN KEY (\"user_id\") REFERENCES \"users\" (\"id\"),\n  CONSTRAINT \"ingredients_photo_uploads_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"ingredients\" (\n  \"id\" TEXT NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"description\" TEXT NOT NULL,\n  \"is_reviewed\" INTEGER NOT NULL,\n  \"embedding\" TEXT NOT NULL,\n  \"tracking_type\" TEXT,\n  \"fill_level\" INTEGER NOT NULL,\n  \"count\" INTEGER NOT NULL,\n  \"expiration_date\" TEXT NOT NULL,\n  \"ingredients_photo_uploads_id\" TEXT,\n  \"created_at\" TEXT NOT NULL,\n  \"updated_at\" TEXT NOT NULL,\n  CONSTRAINT \"ingredients_ingredients_photo_uploads_id_fkey\" FOREIGN KEY (\"ingredients_photo_uploads_id\") REFERENCES \"ingredients_photo_uploads\" (\"id\"),\n  CONSTRAINT \"ingredients_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"ingredient_events\" (\n  \"id\" TEXT NOT NULL,\n  \"ingredient_id\" TEXT NOT NULL,\n  \"user_id\" TEXT NOT NULL,\n  \"timestamp\" TEXT NOT NULL,\n  \"from_values\" TEXT_JSON,\n  \"to_values\" TEXT_JSON,\n  CONSTRAINT \"ingredient_events_ingredient_id_fkey\" FOREIGN KEY (\"ingredient_id\") REFERENCES \"ingredients\" (\"id\"),\n  CONSTRAINT \"ingredient_events_user_id_fkey\" FOREIGN KEY (\"user_id\") REFERENCES \"users\" (\"id\"),\n  CONSTRAINT \"ingredient_events_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"recipes\" (\n  \"id\" TEXT NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"description\" TEXT NOT NULL,\n  \"url\" TEXT NOT NULL,\n  \"user_id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  \"updated_at\" TEXT NOT NULL,\n  CONSTRAINT \"recipes_user_id_fkey\" FOREIGN KEY (\"user_id\") REFERENCES \"users\" (\"id\"),\n  CONSTRAINT \"recipes_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"recipe_ingredients\" (\n  \"id\" TEXT NOT NULL,\n  \"listing\" TEXT NOT NULL,\n  \"extracted_name\" TEXT NOT NULL,\n  \"embedding\" TEXT NOT NULL,\n  \"grocery_section\" TEXT NOT NULL,\n  \"recipe_id\" TEXT NOT NULL,\n  CONSTRAINT \"recipe_ingredients_recipe_id_fkey\" FOREIGN KEY (\"recipe_id\") REFERENCES \"recipes\" (\"id\"),\n  CONSTRAINT \"recipe_ingredients_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"shopping_list\" (\n  \"id\" TEXT NOT NULL,\n  \"recipe_id\" TEXT NOT NULL,\n  \"recipe_ingredient_id\" TEXT NOT NULL,\n  \"purchased\" INTEGER NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  CONSTRAINT \"shopping_list_recipe_id_fkey\" FOREIGN KEY (\"recipe_id\") REFERENCES \"recipes\" (\"id\"),\n  CONSTRAINT \"shopping_list_recipe_ingredient_id_fkey\" FOREIGN KEY (\"recipe_ingredient_id\") REFERENCES \"recipe_ingredients\" (\"id\"),\n  CONSTRAINT \"shopping_list_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"jobs\" (\n  \"id\" TEXT NOT NULL,\n  \"state\" TEXT NOT NULL,\n  \"target_id\" TEXT,\n  \"type\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  \"updated_at\" TEXT NOT NULL,\n  \"error\" TEXT_JSON,\n  \"result\" TEXT_JSON,\n  CONSTRAINT \"jobs_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.users', 1);",
      "  /* Triggers for table users */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_users_primarykey;",
      "CREATE TRIGGER update_ensure_main_users_primarykey\n  BEFORE UPDATE ON \"main\".\"users\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_users_into_oplog;",
      "CREATE TRIGGER insert_main_users_into_oplog\n   AFTER INSERT ON \"main\".\"users\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'users', 'INSERT', json_object('id', new.\"id\"), json_object('avatar_url', new.\"avatar_url\", 'id', new.\"id\", 'name', new.\"name\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_users_into_oplog;",
      "CREATE TRIGGER update_main_users_into_oplog\n   AFTER UPDATE ON \"main\".\"users\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'users', 'UPDATE', json_object('id', new.\"id\"), json_object('avatar_url', new.\"avatar_url\", 'id', new.\"id\", 'name', new.\"name\"), json_object('avatar_url', old.\"avatar_url\", 'id', old.\"id\", 'name', old.\"name\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_users_into_oplog;",
      "CREATE TRIGGER delete_main_users_into_oplog\n   AFTER DELETE ON \"main\".\"users\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'users', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('avatar_url', old.\"avatar_url\", 'id', old.\"id\", 'name', old.\"name\"), NULL);\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.ingredients_photo_uploads', 1);",
      "  /* Triggers for table ingredients_photo_uploads */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_ingredients_photo_uploads_primarykey;",
      "CREATE TRIGGER update_ensure_main_ingredients_photo_uploads_primarykey\n  BEFORE UPDATE ON \"main\".\"ingredients_photo_uploads\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_ingredients_photo_uploads_into_oplog;",
      "CREATE TRIGGER insert_main_ingredients_photo_uploads_into_oplog\n   AFTER INSERT ON \"main\".\"ingredients_photo_uploads\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients_photo_uploads')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredients_photo_uploads', 'INSERT', json_object('id', new.\"id\"), json_object('ai_processing_duration_sec', cast(new.\"ai_processing_duration_sec\" as TEXT), 'created_at', new.\"created_at\", 'id', new.\"id\", 'photo_url', new.\"photo_url\", 'state', new.\"state\", 'upload_duration_sec', cast(new.\"upload_duration_sec\" as TEXT), 'uploaded_at', new.\"uploaded_at\", 'user_id', new.\"user_id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_ingredients_photo_uploads_into_oplog;",
      "CREATE TRIGGER update_main_ingredients_photo_uploads_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredients_photo_uploads\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients_photo_uploads')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredients_photo_uploads', 'UPDATE', json_object('id', new.\"id\"), json_object('ai_processing_duration_sec', cast(new.\"ai_processing_duration_sec\" as TEXT), 'created_at', new.\"created_at\", 'id', new.\"id\", 'photo_url', new.\"photo_url\", 'state', new.\"state\", 'upload_duration_sec', cast(new.\"upload_duration_sec\" as TEXT), 'uploaded_at', new.\"uploaded_at\", 'user_id', new.\"user_id\"), json_object('ai_processing_duration_sec', cast(old.\"ai_processing_duration_sec\" as TEXT), 'created_at', old.\"created_at\", 'id', old.\"id\", 'photo_url', old.\"photo_url\", 'state', old.\"state\", 'upload_duration_sec', cast(old.\"upload_duration_sec\" as TEXT), 'uploaded_at', old.\"uploaded_at\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_ingredients_photo_uploads_into_oplog;",
      "CREATE TRIGGER delete_main_ingredients_photo_uploads_into_oplog\n   AFTER DELETE ON \"main\".\"ingredients_photo_uploads\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients_photo_uploads')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredients_photo_uploads', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('ai_processing_duration_sec', cast(old.\"ai_processing_duration_sec\" as TEXT), 'created_at', old.\"created_at\", 'id', old.\"id\", 'photo_url', old.\"photo_url\", 'state', old.\"state\", 'upload_duration_sec', cast(old.\"upload_duration_sec\" as TEXT), 'uploaded_at', old.\"uploaded_at\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_ingredients_photo_uploads_user_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_ingredients_photo_uploads_user_id_into_oplog\n  AFTER INSERT ON \"main\".\"ingredients_photo_uploads\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'users', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"users\" WHERE \"id\" = new.\"user_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_ingredients_photo_uploads_user_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_ingredients_photo_uploads_user_id_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredients_photo_uploads\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'users', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"users\" WHERE \"id\" = new.\"user_id\";\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.ingredients', 1);",
      "  /* Triggers for table ingredients */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_ingredients_primarykey;",
      "CREATE TRIGGER update_ensure_main_ingredients_primarykey\n  BEFORE UPDATE ON \"main\".\"ingredients\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_ingredients_into_oplog;",
      "CREATE TRIGGER insert_main_ingredients_into_oplog\n   AFTER INSERT ON \"main\".\"ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredients', 'INSERT', json_object('id', new.\"id\"), json_object('count', new.\"count\", 'created_at', new.\"created_at\", 'description', new.\"description\", 'embedding', new.\"embedding\", 'expiration_date', new.\"expiration_date\", 'fill_level', new.\"fill_level\", 'id', new.\"id\", 'ingredients_photo_uploads_id', new.\"ingredients_photo_uploads_id\", 'is_reviewed', new.\"is_reviewed\", 'name', new.\"name\", 'tracking_type', new.\"tracking_type\", 'updated_at', new.\"updated_at\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_ingredients_into_oplog;",
      "CREATE TRIGGER update_main_ingredients_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredients', 'UPDATE', json_object('id', new.\"id\"), json_object('count', new.\"count\", 'created_at', new.\"created_at\", 'description', new.\"description\", 'embedding', new.\"embedding\", 'expiration_date', new.\"expiration_date\", 'fill_level', new.\"fill_level\", 'id', new.\"id\", 'ingredients_photo_uploads_id', new.\"ingredients_photo_uploads_id\", 'is_reviewed', new.\"is_reviewed\", 'name', new.\"name\", 'tracking_type', new.\"tracking_type\", 'updated_at', new.\"updated_at\"), json_object('count', old.\"count\", 'created_at', old.\"created_at\", 'description', old.\"description\", 'embedding', old.\"embedding\", 'expiration_date', old.\"expiration_date\", 'fill_level', old.\"fill_level\", 'id', old.\"id\", 'ingredients_photo_uploads_id', old.\"ingredients_photo_uploads_id\", 'is_reviewed', old.\"is_reviewed\", 'name', old.\"name\", 'tracking_type', old.\"tracking_type\", 'updated_at', old.\"updated_at\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_ingredients_into_oplog;",
      "CREATE TRIGGER delete_main_ingredients_into_oplog\n   AFTER DELETE ON \"main\".\"ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredients', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('count', old.\"count\", 'created_at', old.\"created_at\", 'description', old.\"description\", 'embedding', old.\"embedding\", 'expiration_date', old.\"expiration_date\", 'fill_level', old.\"fill_level\", 'id', old.\"id\", 'ingredients_photo_uploads_id', old.\"ingredients_photo_uploads_id\", 'is_reviewed', old.\"is_reviewed\", 'name', old.\"name\", 'tracking_type', old.\"tracking_type\", 'updated_at', old.\"updated_at\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_ingredients_ingredients_photo_uploads_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_ingredients_ingredients_photo_uploads_id_into_oplog\n  AFTER INSERT ON \"main\".\"ingredients\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients_photo_uploads') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'ingredients_photo_uploads', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"ingredients_photo_uploads\" WHERE \"id\" = new.\"ingredients_photo_uploads_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_ingredients_ingredients_photo_uploads_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_ingredients_ingredients_photo_uploads_id_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients_photo_uploads') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'ingredients_photo_uploads', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"ingredients_photo_uploads\" WHERE \"id\" = new.\"ingredients_photo_uploads_id\";\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.ingredient_events', 1);",
      "  /* Triggers for table ingredient_events */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_ingredient_events_primarykey;",
      "CREATE TRIGGER update_ensure_main_ingredient_events_primarykey\n  BEFORE UPDATE ON \"main\".\"ingredient_events\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_ingredient_events_into_oplog;",
      "CREATE TRIGGER insert_main_ingredient_events_into_oplog\n   AFTER INSERT ON \"main\".\"ingredient_events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredient_events')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredient_events', 'INSERT', json_object('id', new.\"id\"), json_object('from_values', new.\"from_values\", 'id', new.\"id\", 'ingredient_id', new.\"ingredient_id\", 'timestamp', new.\"timestamp\", 'to_values', new.\"to_values\", 'user_id', new.\"user_id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_ingredient_events_into_oplog;",
      "CREATE TRIGGER update_main_ingredient_events_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredient_events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredient_events')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredient_events', 'UPDATE', json_object('id', new.\"id\"), json_object('from_values', new.\"from_values\", 'id', new.\"id\", 'ingredient_id', new.\"ingredient_id\", 'timestamp', new.\"timestamp\", 'to_values', new.\"to_values\", 'user_id', new.\"user_id\"), json_object('from_values', old.\"from_values\", 'id', old.\"id\", 'ingredient_id', old.\"ingredient_id\", 'timestamp', old.\"timestamp\", 'to_values', old.\"to_values\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_ingredient_events_into_oplog;",
      "CREATE TRIGGER delete_main_ingredient_events_into_oplog\n   AFTER DELETE ON \"main\".\"ingredient_events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredient_events')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'ingredient_events', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('from_values', old.\"from_values\", 'id', old.\"id\", 'ingredient_id', old.\"ingredient_id\", 'timestamp', old.\"timestamp\", 'to_values', old.\"to_values\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_ingredient_events_ingredient_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_ingredient_events_ingredient_id_into_oplog\n  AFTER INSERT ON \"main\".\"ingredient_events\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'ingredients', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"ingredients\" WHERE \"id\" = new.\"ingredient_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_ingredient_events_ingredient_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_ingredient_events_ingredient_id_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredient_events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.ingredients') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'ingredients', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"ingredients\" WHERE \"id\" = new.\"ingredient_id\";\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_ingredient_events_user_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_ingredient_events_user_id_into_oplog\n  AFTER INSERT ON \"main\".\"ingredient_events\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'users', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"users\" WHERE \"id\" = new.\"user_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_ingredient_events_user_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_ingredient_events_user_id_into_oplog\n   AFTER UPDATE ON \"main\".\"ingredient_events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'users', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"users\" WHERE \"id\" = new.\"user_id\";\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.recipes', 1);",
      "  /* Triggers for table recipes */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_recipes_primarykey;",
      "CREATE TRIGGER update_ensure_main_recipes_primarykey\n  BEFORE UPDATE ON \"main\".\"recipes\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_recipes_into_oplog;",
      "CREATE TRIGGER insert_main_recipes_into_oplog\n   AFTER INSERT ON \"main\".\"recipes\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'recipes', 'INSERT', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'description', new.\"description\", 'id', new.\"id\", 'name', new.\"name\", 'updated_at', new.\"updated_at\", 'url', new.\"url\", 'user_id', new.\"user_id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_recipes_into_oplog;",
      "CREATE TRIGGER update_main_recipes_into_oplog\n   AFTER UPDATE ON \"main\".\"recipes\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'recipes', 'UPDATE', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'description', new.\"description\", 'id', new.\"id\", 'name', new.\"name\", 'updated_at', new.\"updated_at\", 'url', new.\"url\", 'user_id', new.\"user_id\"), json_object('created_at', old.\"created_at\", 'description', old.\"description\", 'id', old.\"id\", 'name', old.\"name\", 'updated_at', old.\"updated_at\", 'url', old.\"url\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_recipes_into_oplog;",
      "CREATE TRIGGER delete_main_recipes_into_oplog\n   AFTER DELETE ON \"main\".\"recipes\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'recipes', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('created_at', old.\"created_at\", 'description', old.\"description\", 'id', old.\"id\", 'name', old.\"name\", 'updated_at', old.\"updated_at\", 'url', old.\"url\", 'user_id', old.\"user_id\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_recipes_user_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_recipes_user_id_into_oplog\n  AFTER INSERT ON \"main\".\"recipes\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'users', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"users\" WHERE \"id\" = new.\"user_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_recipes_user_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_recipes_user_id_into_oplog\n   AFTER UPDATE ON \"main\".\"recipes\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.users') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'users', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"users\" WHERE \"id\" = new.\"user_id\";\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.recipe_ingredients', 1);",
      "  /* Triggers for table recipe_ingredients */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_recipe_ingredients_primarykey;",
      "CREATE TRIGGER update_ensure_main_recipe_ingredients_primarykey\n  BEFORE UPDATE ON \"main\".\"recipe_ingredients\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_recipe_ingredients_into_oplog;",
      "CREATE TRIGGER insert_main_recipe_ingredients_into_oplog\n   AFTER INSERT ON \"main\".\"recipe_ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipe_ingredients')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'recipe_ingredients', 'INSERT', json_object('id', new.\"id\"), json_object('embedding', new.\"embedding\", 'extracted_name', new.\"extracted_name\", 'grocery_section', new.\"grocery_section\", 'id', new.\"id\", 'listing', new.\"listing\", 'recipe_id', new.\"recipe_id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_recipe_ingredients_into_oplog;",
      "CREATE TRIGGER update_main_recipe_ingredients_into_oplog\n   AFTER UPDATE ON \"main\".\"recipe_ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipe_ingredients')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'recipe_ingredients', 'UPDATE', json_object('id', new.\"id\"), json_object('embedding', new.\"embedding\", 'extracted_name', new.\"extracted_name\", 'grocery_section', new.\"grocery_section\", 'id', new.\"id\", 'listing', new.\"listing\", 'recipe_id', new.\"recipe_id\"), json_object('embedding', old.\"embedding\", 'extracted_name', old.\"extracted_name\", 'grocery_section', old.\"grocery_section\", 'id', old.\"id\", 'listing', old.\"listing\", 'recipe_id', old.\"recipe_id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_recipe_ingredients_into_oplog;",
      "CREATE TRIGGER delete_main_recipe_ingredients_into_oplog\n   AFTER DELETE ON \"main\".\"recipe_ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipe_ingredients')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'recipe_ingredients', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('embedding', old.\"embedding\", 'extracted_name', old.\"extracted_name\", 'grocery_section', old.\"grocery_section\", 'id', old.\"id\", 'listing', old.\"listing\", 'recipe_id', old.\"recipe_id\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_recipe_ingredients_recipe_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_recipe_ingredients_recipe_id_into_oplog\n  AFTER INSERT ON \"main\".\"recipe_ingredients\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'recipes', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"recipes\" WHERE \"id\" = new.\"recipe_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_recipe_ingredients_recipe_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_recipe_ingredients_recipe_id_into_oplog\n   AFTER UPDATE ON \"main\".\"recipe_ingredients\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'recipes', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"recipes\" WHERE \"id\" = new.\"recipe_id\";\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.shopping_list', 1);",
      "  /* Triggers for table shopping_list */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_shopping_list_primarykey;",
      "CREATE TRIGGER update_ensure_main_shopping_list_primarykey\n  BEFORE UPDATE ON \"main\".\"shopping_list\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_shopping_list_into_oplog;",
      "CREATE TRIGGER insert_main_shopping_list_into_oplog\n   AFTER INSERT ON \"main\".\"shopping_list\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.shopping_list')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'shopping_list', 'INSERT', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'id', new.\"id\", 'purchased', new.\"purchased\", 'recipe_id', new.\"recipe_id\", 'recipe_ingredient_id', new.\"recipe_ingredient_id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_shopping_list_into_oplog;",
      "CREATE TRIGGER update_main_shopping_list_into_oplog\n   AFTER UPDATE ON \"main\".\"shopping_list\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.shopping_list')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'shopping_list', 'UPDATE', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'id', new.\"id\", 'purchased', new.\"purchased\", 'recipe_id', new.\"recipe_id\", 'recipe_ingredient_id', new.\"recipe_ingredient_id\"), json_object('created_at', old.\"created_at\", 'id', old.\"id\", 'purchased', old.\"purchased\", 'recipe_id', old.\"recipe_id\", 'recipe_ingredient_id', old.\"recipe_ingredient_id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_shopping_list_into_oplog;",
      "CREATE TRIGGER delete_main_shopping_list_into_oplog\n   AFTER DELETE ON \"main\".\"shopping_list\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.shopping_list')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'shopping_list', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('created_at', old.\"created_at\", 'id', old.\"id\", 'purchased', old.\"purchased\", 'recipe_id', old.\"recipe_id\", 'recipe_ingredient_id', old.\"recipe_ingredient_id\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_shopping_list_recipe_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_shopping_list_recipe_id_into_oplog\n  AFTER INSERT ON \"main\".\"shopping_list\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'recipes', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"recipes\" WHERE \"id\" = new.\"recipe_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_shopping_list_recipe_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_shopping_list_recipe_id_into_oplog\n   AFTER UPDATE ON \"main\".\"shopping_list\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipes') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'recipes', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"recipes\" WHERE \"id\" = new.\"recipe_id\";\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_shopping_list_recipe_ingredient_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_shopping_list_recipe_ingredient_id_into_oplog\n  AFTER INSERT ON \"main\".\"shopping_list\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipe_ingredients') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'recipe_ingredients', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"recipe_ingredients\" WHERE \"id\" = new.\"recipe_ingredient_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_shopping_list_recipe_ingredient_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_shopping_list_recipe_ingredient_id_into_oplog\n   AFTER UPDATE ON \"main\".\"shopping_list\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.recipe_ingredients') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'recipe_ingredients', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"recipe_ingredients\" WHERE \"id\" = new.\"recipe_ingredient_id\";\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.jobs', 1);",
      "  /* Triggers for table jobs */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_jobs_primarykey;",
      "CREATE TRIGGER update_ensure_main_jobs_primarykey\n  BEFORE UPDATE ON \"main\".\"jobs\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_jobs_into_oplog;",
      "CREATE TRIGGER insert_main_jobs_into_oplog\n   AFTER INSERT ON \"main\".\"jobs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.jobs')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'jobs', 'INSERT', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'error', new.\"error\", 'id', new.\"id\", 'result', new.\"result\", 'state', new.\"state\", 'target_id', new.\"target_id\", 'type', new.\"type\", 'updated_at', new.\"updated_at\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_jobs_into_oplog;",
      "CREATE TRIGGER update_main_jobs_into_oplog\n   AFTER UPDATE ON \"main\".\"jobs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.jobs')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'jobs', 'UPDATE', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'error', new.\"error\", 'id', new.\"id\", 'result', new.\"result\", 'state', new.\"state\", 'target_id', new.\"target_id\", 'type', new.\"type\", 'updated_at', new.\"updated_at\"), json_object('created_at', old.\"created_at\", 'error', old.\"error\", 'id', old.\"id\", 'result', old.\"result\", 'state', old.\"state\", 'target_id', old.\"target_id\", 'type', old.\"type\", 'updated_at', old.\"updated_at\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_jobs_into_oplog;",
      "CREATE TRIGGER delete_main_jobs_into_oplog\n   AFTER DELETE ON \"main\".\"jobs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.jobs')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'jobs', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('created_at', old.\"created_at\", 'error', old.\"error\", 'id', old.\"id\", 'result', old.\"result\", 'state', old.\"state\", 'target_id', old.\"target_id\", 'type', old.\"type\", 'updated_at', old.\"updated_at\"), NULL);\nEND;"
    ],
    "version": "1"
  }
]