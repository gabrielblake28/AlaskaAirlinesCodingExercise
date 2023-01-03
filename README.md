# AlaskaAirlinesCodingExercise

Initial Questions

- Why is the letter I omitted from the column labels.

Assumptions

- The layout of the planes rows and aisles would never change
- The availability of the first and last seats in each row are not needed to solve the problem

Initial Planning

- Parse string letters to numbers so I can access column index easier
- Construct a 2D array and fill it with 1s and 0s to act as aisles and available seats
- Add reserved seats represented as 2s to the 2D array
- Traverse the 2D array to calculate all four-person family matches
