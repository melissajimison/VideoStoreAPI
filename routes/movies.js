// - GET a list of all movies (/movies)
// * display a list to the customers.
// * in JSON
//
// - GET a subset of movies
// * make a dynamic route(s)
// * provide this path:
// 1. release_date: ("/movies/sort/release-date?n=5&p=1")
// 2. title: ("/movies/sort/title?n=5&p=1")
//     - Given a sort column, return n movie records, offset by p records (this will be used to create "pages" of movies)
//     - Sort columns are
//         - title
//         - release_date
//
// - Given a movies title...
//   (employees are getting the information)
//    - GET a list of customers that have currently checked out a copy of the film:
//       get request (/movies/Jaws/current)
//       connect = link movie to the rental, check status
//       if status == active(checked out),
//       return customer(s)
//         a collection of customers (each):
//         - name,
//         - phone number,
//         - account credit
//
//     - GET a list of customers that have checked out a copy in the past  route the employee will use: (/movies/Jaws/history/sort/name)
//       intermediate table (history)
//         keeps all movies rented
//         pull out the records that have the movie id,
//         then associte the id with the customer id
//         then send the collection of customers,
//       if
//       return customers
//         - include each customers
//         name,
//         phone number,
//         account credit
//         - ordered by customer name or
//         - ordered by check out date
//
//         cust_id  movie_id
//         2        3
//         4        3
//         7        1
//
//         SELECT cust_id
//         WHERE movie_id = 3
//         => [2,4]
