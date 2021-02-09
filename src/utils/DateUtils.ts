export function formatDate(date: string | undefined) {
  if(!date) {
    return undefined;
  }

  date = date.split('T')[0];

  const day = date.split('-')[2]
  const month = date.split('-')[1]
  const year = date.split('-')[0]

  return `${day}/${month}/${year}`;
}

export function formatDateToApi(date: string) {
  const day = date.split('/')[0]
  const month = date.split('/')[1]
  const year = date.split('/')[2]

  return `${year}/${month}/${day}`;
}
