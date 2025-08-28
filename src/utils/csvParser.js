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
  // Handle multiple date formats by replacing '-' with '/'
  const sanitizedDateStr = dateStr.replace(/-/g, '/');
  const parts = sanitizedDateStr.split('/');
  if (parts.length !== 3) return new Date(NaN); // Invalid date format

  // Assuming either MM/DD/YYYY or DD/MM/YYYY. We can be more robust, but this covers most cases.
  // A common ambiguity. Let's assume DD/MM/YYYY as it's more common internationally.
  const [day, month, year] = parts.map(Number);
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

/**
 * @description A robust CSV line parser that handles quoted fields.
 * @param {string} line - A single line from a CSV file.
 * @returns {string[]} An array of field values.
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'; // Escaped quote
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
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

  const expectedHeaders = [
    'Date', 'Start Time', 'End Time', 'Work Duration', 'Session Score', 
    'Completed Tasks', 'Notes', 'Location'
  ];
  const actualHeaders = headerLine.split(',').map(h => h.trim());

  // A simple check for the first few headers is often sufficient and more flexible
  if (expectedHeaders.slice(0, 4).join() !== actualHeaders.slice(0, 4).join()) {
    throw new Error(
      `Invalid CSV headers. Expected headers to start with: "${expectedHeaders.slice(0, 4).join(', ')}".`
    );
  }

  const sessions = lines.map((line) => {
    const parsedValues = parseCSVLine(line);
    
    // Gemini Note: This is the critical fix. We now clean each value by trimming whitespace
    // and removing the surrounding quotes before we use them.
    const values = parsedValues.map(val => val.trim().replace(/^"|"$/g, ''));

    const date = values[0];
    const startTimeStr = values[1];
    const endTimeStr = values[2];
    const durationStr = values[3];
    const sessionScore = parseInt(values[4], 10) || 0;
    const completedTasksStr = values[5];
    const notesStr = values[6];
    const locationStr = values[7];

    let startTime, endTime;

    if (startTimeStr && endTimeStr) {
      startTime = createDateFromParts(date, startTimeStr).getTime();
      endTime = createDateFromParts(date, endTimeStr).getTime();
    } else {
      const baseTimestamp = createDateFromParts(date, '12:00:00').getTime();
      startTime = baseTimestamp;
      endTime = baseTimestamp;
    }

    const duration = durationToSeconds(durationStr);

    let location = null;
    if (locationStr) {
      const parts = locationStr.split(',');
      if (parts.length === 2) {
        const lat = parseFloat(parts[0].trim());
        const lon = parseFloat(parts[1].trim());
        if (!isNaN(lat) && !isNaN(lon)) {
          location = { lat, lon };
        }
      }
    }

    let combinedNotes = notesStr;
    if (completedTasksStr && completedTasksStr !== '""') {
      const taskInfo = `[Imported Tasks: ${completedTasksStr}]`;
      combinedNotes = notesStr ? `${notesStr} ${taskInfo}` : taskInfo;
    }

    return {
      startTime,
      endTime,
      duration,
      sessionScore,
      notes: combinedNotes,
      location,
      breaks: [],
      completedTasks: [],
    };
  });

  return sessions.filter(session => !isNaN(session.startTime) && !isNaN(session.endTime));
}