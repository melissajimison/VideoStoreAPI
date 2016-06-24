SELECT customers.id, customers.name, customers.phone, customers.account_credit, history.checkout_date FROM movies
  INNER JOIN rentals
  ON movies.id=rentals.movie_id
    INNER JOIN history
    ON rentals.id=history.rental_id
      INNER JOIN customers
      ON history.customer_id=customers.id
WHERE title = $1
ORDER BY customers.id;
