import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';


class MyDatePrettifier {

  // Example usage:
  // const startDate = new Date('2022-01-01T00:00:00Z');
  // const endDate = new Date(); // Current date
  // console.log(timePassed(startDate, endDate)); 
  static timePassed(startDate, endDate) {
    const seconds = differenceInSeconds(endDate, startDate);
    const minutes = differenceInMinutes(endDate, startDate);
    const hours = differenceInHours(endDate, startDate);
    const days = differenceInDays(endDate, startDate);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  }


  static getDateXDaysAgo(x) {
    const currentDate = new Date(); // Current date
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const millisecondsAgo = x * millisecondsPerDay; // Number of milliseconds to subtract
    return new Date(currentDate.getTime() - millisecondsAgo);
  }

}


export default MyDatePrettifier;