import extractDate from './ExtractDate';

it('extracts the date correctly', () => {
  const testDate = '2019-07-12T00:00:00.000Z';
  const secondTestDate = '2019-07-18T00:00:00.000Z';

  expect(extractDate(testDate)).toEqual('2019-07-12');
  expect(extractDate(secondTestDate)).toEqual('2019-07-18');
});
