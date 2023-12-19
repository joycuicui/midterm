/* ONLY RUN ALTER TABLE STATEMENTS AFTER TABLES HAVE BEEN SEEDED */

/* altering planes table to add foreigh key constraint*/
ALTER TABLE planes
ADD CONSTRAINT fk_plane_photos_id
FOREIGN KEY (plane_photos_id) REFERENCES plane_photos(id) ON DELETE CASCADE;

/* altering plane_photos table to add foreigh key constraint*/
ALTER TABLE plane_photos
ADD CONSTRAINT fk_planes_id
FOREIGN KEY (planes_id) REFERENCES planes(id) ON DELETE CASCADE;
