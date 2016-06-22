UPDATE rentals AS r
SET customer_id = $1, status='rented'
FROM (
  SELECT rentals.id
  FROM rentals
  INNER JOIN movies
  ON movies.id=rentals.movie_id
    WHERE title=$2 AND rentals.status = 'available'
    LIMIT 1
) AS result
WHERE r.id=result.id
RETURNING *;
