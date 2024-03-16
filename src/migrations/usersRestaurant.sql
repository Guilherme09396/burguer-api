CREATE TABLE users_restaurant (
  id serial PRIMARY KEY,
  id_restaurant integer references restaurant(id),
  name varchar not null,
  password varchar not null
);