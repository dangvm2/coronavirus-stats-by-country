export const formatNumber = (num) => {
  return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : "0";
};

export const formatDate = (date) => {
  if (!Date.parse(date)) {
    return "";
  }
  
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const hour = d.getHours();
  const min = d.getMinutes();

  return `${hour}:${min}, ${da} ${mo} ${ye}`;
};
