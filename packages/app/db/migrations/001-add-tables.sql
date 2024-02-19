CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT
);

CREATE TYPE photo_upload_state AS ENUM ('uploading', 'ai_processing', 'reviewing', 'done');

CREATE TABLE ingredients_photo_uploads (
    id UUID PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE,
    state photo_upload_state NOT NULL,
    upload_duration_sec FLOAT,
    ai_processing_duration_sec FLOAT,
    photo_url TEXT
);

CREATE TABLE ingredients (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    is_reviewed BOOLEAN NOT NULL,
    fill_level INTEGER NOT NULL,
    shelf_life_months INTEGER NOT NULL,
    fill_date TEXT  NOT NULL, /* YYYY/MM */
    is_ground BOOLEAN,
    ingredients_photo_uploads_id UUID,
    FOREIGN KEY (ingredients_photo_uploads_id) REFERENCES ingredients_photo_uploads(id)
);

CREATE TABLE ingredient_events (
    id UUID PRIMARY KEY,
    ingredient_id UUID NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id),
    timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    from_values JSONB,
    to_values JSONB,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);


ALTER TABLE users ENABLE ELECTRIC;
ALTER TABLE ingredients_photo_uploads ENABLE ELECTRIC;
ALTER TABLE ingredients ENABLE ELECTRIC;
ALTER TABLE ingredient_events ENABLE ELECTRIC;
