const savingsSchedule = (() => {
  const weekdays = [
    ['Воскресенье', 'по воскресеньям'],
    ['Понедельник', 'по понедельникам'],
    ['Вторник', 'по вторникам'],
    ['Среда', 'по средам'],
    ['Четверг', 'по четвергам'],
    ['Пятница', 'по пятницам'],
    ['Суббота', 'по субботам']
  ];
  const dateFormat = new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long'});
  const amountFormat = new Intl.NumberFormat('ru-RU');

  function nextDate(frequency, day, now = new Date()) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (frequency === 'week') {
      const date = new Date(today);
      date.setDate(today.getDate() + (Number(day) - today.getDay() + 7) % 7);
      return date;
    }
    const dateInMonth = (offset) => {
      const year = today.getFullYear();
      const month = today.getMonth() + offset;
      const last = new Date(year, month + 1, 0).getDate();
      return new Date(year, month, day === 'last' ? last : Math.min(Number(day), last));
    };
    const thisMonth = dateInMonth(0);
    return thisMonth < today ? dateInMonth(1) : thisMonth;
  }

  function label(frequency, day) {
    if (frequency === 'week') return weekdays[day][1];
    return day === 'last' ? 'в последний день месяца' : 'каждое ' + day + '-е число';
  }

  return {weekdays, nextDate, label, dateFormat, amountFormat};
})();
