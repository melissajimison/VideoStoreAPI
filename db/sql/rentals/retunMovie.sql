UPDATE rentals AS r
SET customer_id = NULL, status='available'
FROM (
  SELECT rentals.id
  FROM rentals
  INNER JOIN movies
  ON movies.id=rentals.movie_id
    WHERE title=$2 AND rentals.customer_id = $1
    LIMIT 1
) AS result
WHERE r.id=result.id
RETURNING *;
