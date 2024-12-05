const month = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const abbreviatedMonth = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const d = new Date();

export const currentMonthName = month[d.getMonth()];

export const getMonthName = (monthNo: number) => {
  return month[monthNo];
};
export const getAbbreviatedMonthName = (monthNo: number) => {
  return abbreviatedMonth[monthNo];
};

export const getMonthArray = (numberOfMonths: number) => {
  let arr: any[] = [];
  for (let i = 0; i < numberOfMonths; i++) {
    arr.push(month[(d.getMonth() + i) % 12]);
  }
  return arr;
};

export const convertDateStringToMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  return `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
};

export const getConsecutiveYearsArray = (
  startYear: number,
  endYear: number
) => {
  let array: any[] = [];

  for (let i = Number(startYear); i <= Number(endYear); i++) {
    array.push(i);
  }
  return array;
};

export const getConsecutivePeriodsArray = (
  startYear: number,
  endYear: number
) => {
  let array: any[] = [];
  for (let i = Number(startYear); i <= Number(endYear); i++) {
    for (let j = 1; j <= 12; j++) {
      array.push({ year: i, month: j });
    }
  }
  return array;
};
