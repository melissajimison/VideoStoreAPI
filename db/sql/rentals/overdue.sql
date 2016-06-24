-- customer name
-- movie title
-- history check-out date
-- history return date

SELECT customers.name, movies.title, history.checkout_date, history.return_date FROM history
  INNER JOIN rentals
  ON history.rental_id = rentals.id
    INNER JOIN movies
    ON rentals.movie_id = movies.id
      INNER JOIN customers
      ON history.customer_id = customers.id
WHERE history.overdue = true;