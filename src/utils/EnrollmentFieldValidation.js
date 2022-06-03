export function checkTextField(fieldValue) {
  if (typeof fieldValue === undefined || fieldValue === "") {
    return false;
  }
  return true;
}

export function checkEmailField(fieldValue) {
  ///^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/
  let regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(fieldValue)) {
    return false;
  }
  return true;
}

export function checkUCMEmailField(fieldValue) {
  //let regUCMEmail = /^[a-zA-Z0-9]+@+"ucm.es";
  let regEmail = /^[a-zA-Z0-9]+@ucm.es/;
  if (!regEmail.test(fieldValue)) {
    return false;
  }
  return true;
}

export function checkNumberField(fieldValue) {
  const numberValue = parseFloat(fieldValue);
  if (isNaN(numberValue)) {
    return false;
  }
  return true;
}

export function checkListField(fieldValue) {
  //Check that at least the list contains one element.
  if (typeof fieldValue === undefined || fieldValue.length === 0) {
    return false;
  } else {
    return true;
  }
}

export function checkDateField(fieldValue) {
  if (typeof fieldValue !== undefined && fieldValue !== "") {
    var isValid = isValidDate(fieldValue);
    if (!isValid) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

function isValidDate(dateValue) {
  try {
    var inputDate = new Date(dateValue);
    console.log("Input date: ", inputDate);
    return true;
  } catch (error) {
    return false;
  }
}

export function greaterThanCurrentDate(dateValue) {
  var inputDate = new Date(dateValue);
  var currentDate = new Date();
  if (inputDate > currentDate) {
    return false;
  } else {
    return true;
  }
}

export function greaterThanFirstDate(dateValue1, dateValue2) {
  var inputDate1 = new Date(dateValue1);
  var inputDate2 = new Date(dateValue2);
  if (inputDate2 > inputDate1) {
    return false;
  } else {
    return true;
  }
}
