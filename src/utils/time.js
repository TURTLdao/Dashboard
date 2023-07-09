

export function convertUnixTime(unixTime) {
  const currentUnixTime = Math.floor(Date.now() / 1000); // Current Unix time in seconds
  const elapsedSeconds = currentUnixTime - unixTime;

  const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds

  // Get the components of the date
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  // Create formatted date string (DD/MM/YYYY)
  const formattedDate = `${day}/${month}/${year}`;

  // Create local time string
  const localTime = `${hours}:${minutes}:${seconds}`;

  if (elapsedSeconds < 60) {
    // Less than 60 seconds
    return {
      date: formattedDate,
      local_time: localTime,
      time_ago: `${elapsedSeconds} seconds ago`
    };
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) {
    // Less than 60 minutes
    if (elapsedMinutes === 1) {
      return {
        date: formattedDate,
        local_time: localTime,
        time_ago: `${elapsedMinutes} minute ago`
      };
    } else {
      return {
        date: formattedDate,
        local_time: localTime,
        time_ago: `${elapsedMinutes} minutes ago`
      };
    }
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    // Less than 24 hours
    if (elapsedHours === 1) {
      return {
        date: formattedDate,
        local_time: localTime,
        time_ago: `${elapsedHours} hour ago`
      };
    } else {
      return {
        date: formattedDate,
        local_time: localTime,
        time_ago: `${elapsedHours} hours ago`
      };
    }
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 7) {
    // Less than 7 days
    if (elapsedDays === 1) {
      return {
        date: formattedDate,
        local_time: localTime,
        time_ago: `${elapsedDays} day ago`
      };
    } else {
      return {
        date: formattedDate,
        local_time: localTime,
        time_ago: `${elapsedDays} days ago`
      };
    }
  }

  const elapsedWeeks = Math.floor(elapsedDays / 7);

  const elapsedMonths = Math.floor(elapsedDays / 30.44); // Approximate number of days in a month

  if (elapsedWeeks === 1) {
    return {
      date: formattedDate,
      local_time: localTime,
      time_ago: `${elapsedWeeks} week ago`
    };
  } else {
    return {
      date: formattedDate,
      local_time: localTime,
      time_ago: `${elapsedWeeks} weeks ago`
    };
  }
}