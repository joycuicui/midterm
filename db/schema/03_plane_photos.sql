DROP TABLE IF EXISTS plane_photos CASCADE;
CREATE TABLE plane_photos (
id SERIAL PRIMARY KEY NOT NULL,
planes_id INTEGER,
img_path1 TEXT NOT NULL,
img_path2 TEXT NOT NULL,
img_path3 TEXT NOT NULL
);
