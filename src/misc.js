export function doNothing(...props) {}

export function identity (input) {
  return input;
}

export function assignWithJoin(objectA, objectB, join) {
  if (objectB && objectB.entries) {
    for (let [key, valueB] of objectB.entries) {
      if (objectA.hasOwnProperty(key)) {
        let valueA = objectA[key];
        objectA[key] = join(valueA, valueB);
      } else {
        objectA[key] = valueB;
      }
    }
  }

  return objectA;
}

// from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
export function isValidEmail(email) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let matches = email.match(regex);
  return matches && matches.length > 0;
}
