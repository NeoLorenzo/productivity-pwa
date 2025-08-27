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
    'Completed Tasks', 'Notes', 'Location (Lat,Lon)'
  ];
  const actualHeaders = headerLine.split(',').map(h => h.trim());

  // A simple check for the first few headers is often sufficient and more flexible
  if (expectedHeaders.slice(0, 4).join() !== actualHeaders.slice(0, 4).join()) {
    throw new Error(
      `Invalid CSV headers. Expected headers to start with: "${expectedHeaders.slice(0, 4).join(', ')}".`
    );
  }

  const sessions = lines.map((line) => {
    const values = parseCSVLine(line);
    
    const date = values[0]?.trim();
    const startTimeStr = values[1]?.trim();
    const endTimeStr = values[2]?.trim();
    const durationStr = values[3]?.trim();
    const sessionScore = parseInt(values[4], 10) || 0;
    const completedTasksStr = values[5]?.trim();
    const notesStr = values[6]?.trim();
    const locationStr = values[7]?.trim();

    const startTime = createDateFromParts(date, startTimeStr).getTime();
    const endTime = createDateFromParts(date, endTimeStr).getTime();
    const duration = durationToSeconds(durationStr);

    let location = null;
    if (locationStr) {
      const [lat, lon] = locationStr.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lon)) {
        location = { lat, lon };
      }
    }

    // Gemini Note: We combine the notes and completed tasks fields for preservation,
    // as we cannot re-link tasks to the database.
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
      breaks: [], // Imported sessions don't have detailed break data
      completedTasks: [], // We store task info in notes
    };
  });

  // Filter out any rows that might have resulted in invalid dates (NaN timestamps)
  return sessions.filter(session => !isNaN(session.startTime) && !isNaN(session.endTime));
}