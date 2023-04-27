/**
 * @description date object to string
 * @param {Object|String} dateObject Date object
 * @param {String} format date format
 */
const dateObjectToString = (date:string | number | Date, format = 'yyyy-mm-dd') => {
    const dateObject = new Date(date);
    switch (format) {
      case 'yyyy-mm-dd':
        return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
      case 'yyyy_mm_dd':
        return `${dateObject.getFullYear()}_${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, '0')}_${dateObject.getDate().toString().padStart(2, '0')}`;
      case 'h:i a':
        // eslint-disable-next-line no-case-declarations
        let hours = dateObject.getHours();
        // eslint-disable-next-line no-case-declarations
        const minutes = dateObject.getMinutes();
        // eslint-disable-next-line no-case-declarations
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours || 12;
        return `${hours
          .toString()
          .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      default:
        return date;
    }
  };
  

  export { dateObjectToString };