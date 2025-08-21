// src/utils/csvParser.jsx

/**
 * @description Converts a duration string in HH:MM:SS format to total seconds.
 * @param {string} timeStr - The time string (e.g., "00:45:30").
 * @returns {number} The total number of seconds.
 */
function durationToSeconds(timeStr) {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * @description Creates a reliable Date object from DD/MM/YYYY and HH:MM:SS strings.
 * @param {string} dateStr - The date string in "DD/MM/YYYY" format.
 * @param {string} timeStr - The time string in "HH:MM:SS" format.
 * @returns {Date} A JavaScript Date object.
 */
function createDateFromParts(dateStr, timeStr) {
  const [day, month, year] = dateStr.split('/').map(Number);
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  // Gemini Note: We subtract 1 from the month because JavaScript months are 0-indexed (0 = January).
  // This is the key to correctly parsing the DD/MM/YYYY format.
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

/**
 * @description Parses a CSV file content into an array of session objects.
 * @param {string} csvText - The raw text content of the CSV file.
 * @returns {Array<object>} An array of session objects.
 * @throws {Error} If the CSV headers are incorrect.
 */
export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headerLine = lines.shift().trim();

  const expectedHeaders = ['Date', 'Start Time', 'End Time', 'Work Duration', 'Breaks', 'Notes'];
  const actualHeaders = headerLine.split(',').map(h => h.trim());

  if (JSON.stringify(expectedHeaders) !== JSON.stringify(actualHeaders)) {
    throw new Error(
      `Invalid CSV headers. Expected: "${expectedHeaders.join(', ')}". Received: "${actualHeaders.join(', ')}"`
    );
  }

  const sessions = lines.map((line) => {
    const values = line.split(',');
    const notesIndex = expectedHeaders.indexOf('Notes');
    const notes = values.slice(notesIndex).join(',').trim().replace(/^"|"$/g, ''); // Handle quoted notes

    const date = values[0].trim();
    const startTimeStr = values[1].trim();
    const endTimeStr = values[2].trim();
    const durationStr = values[3].trim();

    // Gemini Note: This is the updated, robust logic.
    // We now use our helper function to build the date correctly.
    const startTime = createDateFromParts(date, startTimeStr).getTime();
    const endTime = createDateFromParts(date, endTimeStr).getTime();
    const duration = durationToSeconds(durationStr);

    return {
      startTime,
      endTime,
      duration,
      breaks: [],
      notes,
    };
  });

  // Filter out any rows that might have resulted in invalid dates (NaN timestamps)
  return sessions.filter(session => !isNaN(session.startTime) && !isNaN(session.endTime));
}