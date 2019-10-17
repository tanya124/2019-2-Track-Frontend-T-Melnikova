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


function GetString(num){
  const map = new Map([[0, "bytes"], [1, "KB"], [2, "MB"], [3, "GB"]]);
  let key = 0;
  let tmp = num;
  while(tmp >= 1024){
    key++;
    tmp = Math.trunc(tmp / 1024);
  }

  if(key > 3){
        let ans = Math.floor(num / (1024**3) * 100) / 100;
    return ans.toString() + " GB";
  } else {
        let ans = Math.floor(num / (1024**key) * 100) / 100;
        return ans.toString() + " " + map.get(key);
  }
}


export default function convertBytesToHuman(bytes) {
  if(typeof bytes == "number" && bytes >= 0 && bytes !== Infinity && isInteger(bytes)) {
    return GetString(bytes);
  } else {
    return false;
  }
}
