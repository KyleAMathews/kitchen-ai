CREATE TYPE photo_upload_state AS ENUM ('uploading', 'ai_processing', 'reviewing', 'done');


CREATE TABLE ingredients_photo_uploads (
    id UUID PRIMARY KEY,
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
    is_reviewed BOOLEAN NOT NULL,
    fill_level INTEGER NOT NULL,
    fill_date TEXT  NOT NULL, /* YYYY/MM */
    is_ground BOOLEAN,
    ingredients_photo_uploads_id UUID,
    FOREIGN KEY (ingredients_photo_uploads_id) REFERENCES ingredients_photo_uploads(id)
);

ALTER TABLE ingredients_photo_uploads ENABLE ELECTRIC;
ALTER TABLE ingredients ENABLE ELECTRIC;
