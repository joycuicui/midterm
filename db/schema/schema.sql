DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS planes CASCADE;
CREATE TABLE planes (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  condition VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  planes_class VARCHAR(255) NOT NULL,
  airframe_hours INTEGER NOT NULL,
  engine_hours INTEGER NOT NULL,
  date_posted TIMESTAMP NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sold BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCES planes(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES planes(id) ON DELETE CASCADE,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  time_sent TIMESTAMP NOT NULL
);