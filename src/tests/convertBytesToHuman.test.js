import convertBytesToHuman from '../../convertBytesToHuman';

/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman('string')).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman(Infinity)).toBe(false)
  expect(convertBytesToHuman(undefined)).toBe(false)
  expect(convertBytesToHuman(Symbol("id"))).toBe(false)
  expect(convertBytesToHuman(Math)).toBe(false)
  expect(convertBytesToHuman(3.14)).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe(5)
  expect(convertBytesToHuman(5.0)).toBe(5)
  expect(convertBytesToHuman(0)).toBe(0)
});


