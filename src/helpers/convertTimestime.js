const setDigit = value => {
  return `0${value}`.substr(-2);
};

const separateValueDate = (datetimestamp, type, withSecond) => {
  var dt = new Date(datetimestamp * type);
  var date = setDigit(dt.getDate());
  var month = setDigit(dt.getMonth()+1);
  var year = dt.getFullYear();
  var hour = setDigit(dt.getHours());
  var minute = setDigit(dt.getMinutes());
  var second = setDigit(dt.getSeconds());

  return `${date}-${month}-${year} ${hour}:${minute}${withSecond ? `:${second}` : ``}`;
};

const TypeMillisecond = datetimestamp => {
  return separateValueDate(datetimestamp, 1, true);
};

const TypeMillisecondWithoutSecond = datetimestamp => {
  return separateValueDate(datetimestamp, 1, false);
};

const TypeSecond = datetimestamp => {
  return separateValueDate(datetimestamp, 1000, true);
};

const TypeSecondWithoutSecond = datetimestamp => {
  return separateValueDate(datetimestamp, 1000, false);
};

const convertTimesTime = {
  TypeMillisecond: TypeMillisecond,
  TypeMillisecondWithoutSecond: TypeMillisecondWithoutSecond,
  TypeSecond: TypeSecond,
  TypeSecondWithoutSecond: TypeSecondWithoutSecond
};

export default convertTimesTime;
