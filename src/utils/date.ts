export default function getTimeAndDate(timestamp: number) {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
  const day = date.toLocaleDateString();
  return `${day} ${time}`;
}
