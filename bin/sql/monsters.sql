CREATE TABLE monsters(
  id serial PRIMARY KEY,
  name character varying(50),
  personality character varying(50)
);

CREATE TABLE habitats(
  id serial,
  name character varying(50),
  climate character varying(50),
  temperature int
);

CREATE TABLE lives(
  monster character varying(50),
  habitat character varying(50)
);

CREATE TABLE aliens(
  id serial PRIMARY KEY,
  name character varying(50),
  superpower character varying(50)
);

CREATE TABLE enemies(
  alien_id int not null,
  monster_id int not null,
  CONSTRAINT fk_alien_id FOREIGN KEY(alien_id) REFERENCES aliens(id),
  CONSTRAINT fk_monster_id FOREIGN KEY(monster_id) REFERENCES monsters(id)
);

INSERT INTO monsters(name, personality)
VALUES
  ('Fluffy', 'Agressive'),
  ('Snowy', 'Smiley'),
  ('Noodles', 'Impatient'),
  ('Rusty', 'Passionate');

INSERT INTO habitats(name, climate, temperature)
VALUES
  ('desert', 'dry', 40),
  ('forest', 'haunted', 14),
  ('mountain', 'icy', 3);

INSERT INTO lives(monster, habitat)
VALUES
  ('Fluffy', 'desert'),
  ('Noodles', 'forest'),
  ('Snowy', 'mountain'),
  ('Rusty', 'desert');

INSERT INTO aliens(name, superpower)
VALUES
  ('Gizzmo', 'flying'),
  ('Dimpo', 'invisibility'),
  ('Dusso', 'omnivore'),
  ('Tizzo', 'time freezing');

INSERT INTO enemies(alien_id, monster_id)
VALUES
  (1, 4),
  (2, 3),
  (3, 2),
  (4, 1)