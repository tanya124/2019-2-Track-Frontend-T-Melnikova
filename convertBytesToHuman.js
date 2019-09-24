/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

function isInteger(num) {
  return (num ^ 0) === num;
}


export default function convertBytesToHuman(bytes) {
  if(typeof bytes == "number" && bytes >= 0 && bytes !== Infinity && isInteger(bytes)) {
    return bytes;
  } else {
    return false;
  }
}
