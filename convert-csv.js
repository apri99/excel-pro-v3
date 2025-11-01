function convertToCSV(data) {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(","));
  return [header, ...rows].join("\n");
}
