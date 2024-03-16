CREATE TABLE restaurant (
      id serial PRIMARY KEY,
      name varchar(100) not null,
      cnpj char(14) not null,
      email varchar not null unique
);