CREATE TABLE products (
	id serial PRIMARY KEY,
  name varchar not null,
  description text,
  value_unit real not null,
  category_id integer references category(id)
);