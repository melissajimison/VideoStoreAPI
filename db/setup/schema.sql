DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  inventory integer
);

CREATE INDEX movies_title ON movies (title);
CREATE INDEX movies_release_date ON movies (release_date);

DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at text,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit decimal
);


DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  movie_id integer,
  customer_id integer,
  status text
);

CREATE INDEX rentals_customer_id ON rentals (customer_id);
CREATE INDEX rentals_status ON rentals (status);

DROP TABLE IF EXISTS history;
CREATE TABLE history(
  id serial PRIMARY KEY,
  rental_id integer,
  customer_id integer,
  checkout_date text,
  return_date text
);

CREATE INDEX history_customer_id ON history (customer_id);
