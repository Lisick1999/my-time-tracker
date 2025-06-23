const Timer = require("../models/Timer");

async function addTimeEntry(timeEntry) {
  if (timeEntry.projectId && typeof timeEntry.projectId !== "string") {
    timeEntry.projectId = timeEntry.projectId.toString();
  }

  const newTimeEntry = await Timer.create(timeEntry);

  return newTimeEntry;
}

async function getTimeEntries(userId) {
  try {
    const timers = await Timer.find({ userId }).lean();

    return timers;
  } catch (error) {
    throw error;
  }
}

module.exports = { addTimeEntry, getTimeEntries };
