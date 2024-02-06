CREATE TABLE spice_jar_photos_upload (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE,
    upload_duration_sec FLOAT,
    ai_processing_duration_sec FLOAT,
    photo_url TEXT,
    extracted_data JSONB
);

ALTER TABLE spice_jar_photos_upload ENABLE ELECTRIC;
