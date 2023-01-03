export class SeatReservations {
  // the input is provided as a string with rows as numbers and columns as letters
  // this object converts the column letters to their corresponding numbers to match the format of the data structure
  // columns 3 and 8 are skipped because this is where aisle are in the data structure

  private readonly seatingColumnMap: { [key: string]: number } = {
    A: 0,
    B: 1,
    C: 2,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 9,
    J: 10,
    K: 11,
  };

  private parseSeats(reservedSeats: string): number[][] {
    if (reservedSeats.length < 1) {
      return [];
    }

    let returnArray: number[][] = [];
    let reservedSeatsArray = reservedSeats.split(" ");

    for (let i = 0; i < reservedSeatsArray.length; i++) {
      returnArray.push([
        // because the inputs are received as 1 based, we need to convert to a 0 based index
        parseInt(reservedSeatsArray[i][0]) - 1,
        this.seatingColumnMap[reservedSeatsArray[i][1]],
      ]);
    }

    return returnArray;
  }

  private constructSeatingList(): number[][] {
    let seats: number[][] = [];

    // the new commuter plane has 5 rows and 10 seats in each row + 2 aisles
    // we construct the 2D array to represent this layout
    for (let i = 0; i < 5; i++) {
      seats.push([]);
      for (let j = 0; j < 12; j++) {
        // index 3 and 8 are aisles, set them to 1 so we know they are unavailable
        if (j == 3 || j == 8) {
          seats[i][j] = 1;
        } else {
          // set all other seats to 0 to indicate availability
          seats[i][j] = 0;
        }
      }
    }
    return seats;
  }

  private addReservedSeats(reservedSeats: number[][], seats: number[][]) {
    for (let i = 0; i < reservedSeats.length; i++) {
      let rowIdx = reservedSeats[i][0];
      let columnIdx = reservedSeats[i][1];

      // since 1 represents aisles, use 2 to represent reserved seats
      seats[rowIdx][columnIdx] = 2;
    }
    return seats;
  }

  public CalculateAvailability(reservedSeats: string) {
    let familyAvailability = 0;

    // construct the seating layout accounting for reserved seats and aisles
    const seatingLayout = this.addReservedSeats(
      this.parseSeats(reservedSeats),
      this.constructSeatingList()
    );

    for (let i = 0; i < seatingLayout.length; i++) {
      // the first and last aisles in the seating layout do not affect the maximum number of four-person families that can fit
      // so we start at index 1 and end at index length - 2
      let j = 0;
      let count = 0;
      while (j <= seatingLayout[i].length - 1) {
        // when the current seat is available, add 1 to count and move to the next seat
        if (seatingLayout[i][j] == 0) {
          count++;
          j++;
          // when encountering an aisle, if the count is 2 or 3 there is potential for a match.
          // we only need 2 available seats on each side so the count is set to 2 and we move to the next seat.
          // if the count is less than 2 than there is no potential for a match. we reset count and move to the next seat
        } else if (seatingLayout[i][j] == 1) {
          count = 0;
          j++;
          // when the current seat is reserved, reset the count and move to the next seat
        } else if (seatingLayout[i][j] == 2) {
          count = 0;
          j++;
        }

        // we found a match, add one to the availability counter and reset the count
        if (count == 3) {
          count = 0;
          familyAvailability++;
        }
      }
    }
    console.log(familyAvailability);
    return familyAvailability;
  }
}

const reservation = new SeatReservations();

reservation.CalculateAvailability("");
reservation.CalculateAvailability("1A");
reservation.CalculateAvailability("1A 1F");
reservation.CalculateAvailability("1A 1E 1H");
