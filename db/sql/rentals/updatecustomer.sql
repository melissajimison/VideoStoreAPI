UPDATE customers
SET account_credit= account_credit + $1
WHERE id=$2
RETURNING*;
