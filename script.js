window.onload = function() {
  startTime();
  updateTableStatuses();
};

function startTime() {
  const today = new Date();
  const clockElement = document.getElementById('txt');
  if (clockElement) {
    clockElement.innerHTML = today.toLocaleString();
  }
  setTimeout(startTime, 1000);
}

function updateTableStatuses() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tables = document.querySelectorAll('.date-table');

  tables.forEach(table => {
    // NEW LOGIC STARTS HERE
    // 1. Determine which column contains the date based on the table's ID.
    let dateColumnIndex;
    if (table.id === 'lecture-table' || table.id === 'lab-table') {
      dateColumnIndex = 1; // The 2nd column for Lectures and Labs
    } else if (table.id === 'exams-table') {
      dateColumnIndex = 3; // The 4th column ("Submission Due") for Exams
    } else {
      return; // If the table ID is unknown, skip it.
    }

    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
      // 2. Use the correct column index we just determined.
      const dateCell = row.cells[dateColumnIndex];
      if (!dateCell) return;

      // This logic cleans up various date formats like "5-Sept-2025" or "29-Aug-2025 2:30 PM"
      let dateString = dateCell.innerText.split('(')[0].trim().split('@')[0].trim().split(' ')[0].trim();
      let formattedDateString = dateString.replace(/-/g, ' ');
      let itemDate = new Date(formattedDateString);

      if (!isNaN(itemDate.getTime()) && itemDate < today) {
        row.classList.add('lecture-done');
      }
    });
  });
}