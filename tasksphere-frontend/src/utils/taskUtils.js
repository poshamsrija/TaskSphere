export const normalizeTasksResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.tasks)) {
    return payload.tasks;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
};

export const getTaskCreatorName = (task) => {
  if (!task) return "Unknown";

  if (task.createdByName) return task.createdByName;
  if (task.createdBy?.name) return task.createdBy.name;
  if (task.createdBy) return task.createdBy;

  return "Unknown";
};
