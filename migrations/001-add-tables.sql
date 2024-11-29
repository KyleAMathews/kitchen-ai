CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT
);

CREATE TYPE ingredient_photo_upload_state AS ENUM ('uploading', 'ai_processing', 'reviewing', 'done');
CREATE TABLE ingredients_photo_uploads (
    id UUID PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE,
    state ingredient_photo_upload_state NOT NULL,
    upload_duration_sec FLOAT,
    ai_processing_duration_sec FLOAT,
    photo_url TEXT
);

CREATE TYPE grocery_section AS ENUM (
    'Produce',
    'Deli',
    'Bakery',
    'Meat_Seafood',
    'Dairy_Eggs',
    'Dry__Goods',
    'Canned__Foods',
    'Spices_Herbs',
    'Beverages',
    'Frozen__Foods',
    'Oil_Vinegar',
    'Other__Aisles'
);
CREATE TYPE grocery_section2 AS ENUM (
    'Produce',
    'Deli',
    'Bakery',
    'Meat_Seafood',
    'Dairy_Eggs',
    'Dry__Goods',
    'Canned__Foods',
    'Spices_Herbs',
    'Beverages',
    'Frozen__Foods',
    'Oil_Vinegar',
    'Other__Aisles'
);

CREATE TYPE ingredients_tracking_type AS ENUM ('fill_level', 'count');
CREATE TABLE ingredients (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    is_reviewed BOOLEAN NOT NULL,
    embedding TEXT NOT NULL,
    tracking_type ingredients_tracking_type,
    fill_level INTEGER NOT NULL,
    grocery_section grocery_section NOT NULL,
    count INTEGER NOT NULL,
    expiration_date TIMESTAMP WITH TIME ZONE NOT NULL,
    ingredients_photo_uploads_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
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

CREATE TABLE recipes (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY,
    listing TEXT NOT NULL,
    extracted_name TEXT NOT NULL,
    embedding TEXT NOT NULL,
    grocery_section grocery_section2 NOT NULL,
    recipe_id UUID NOT NULL REFERENCES recipes(id)
);

CREATE TYPE jobs_state AS ENUM ('working', 'done', 'error');
CREATE TABLE jobs (
    id UUID PRIMARY KEY,
    state jobs_state NOT NULL,
    target_id UUID,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    error JSONB,
    result JSONB
);
