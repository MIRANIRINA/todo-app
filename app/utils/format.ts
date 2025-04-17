
export const formatDate = (date: Date | string): string => {
  if (!date) return "N/A";
  const newDate = typeof date === "string" ? new Date(date) : date;
  return newDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    pending: "En attente",
    in_progress: "En cours",
    completed: "Terminée",
  };
  return statuses[status] || "Inconnu";
};
