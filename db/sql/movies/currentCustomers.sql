SELECT customers.name, customers.phone, customers.account_credit FROM movies
  INNER JOIN rentals
  ON movies.id=rentals.movie_id
    INNER JOIN customers
    ON rentals.customer_id=customers.id
WHERE title = $1;
