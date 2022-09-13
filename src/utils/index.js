export function dateParser(dateString, withoutYear = false) {
  if (dateString) {
    const date = new Date(dateString);
    if (withoutYear) {
      return date.toDateString().slice(0, -4);
    } else {
      return date.toDateString();
    }
  } else {
    return undefined;
  }
}
