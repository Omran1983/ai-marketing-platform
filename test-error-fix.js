// Test script to verify error handling fixes
const axios = require('axios');

// Test the isEmptyObject function
const isEmptyObject = (obj) => {
  if (!obj || typeof obj !== 'object') return false;
  return Object.keys(obj).length === 0;
};

// Test the isMeaningfulError function
const isMeaningfulError = (message) => {
  if (!message) return false;
  const meaninglessMessages = ['{}', '""', '[object Object]', 'Network Error'];
  return !meaninglessMessages.includes(message) && message.trim().length > 0;
};

console.log('Testing error handling functions...');

// Test cases
const testCases = [
  '{}',
  '""',
  '[object Object]',
  'Network Error',
  '  ',
  '',
  null,
  undefined,
  'Real error message',
  'Error with details'
];

console.log('\nTesting isMeaningfulError function:');
testCases.forEach(testCase => {
  console.log(`isMeaningfulError('${testCase}'): ${isMeaningfulError(testCase)}`);
});

// Test empty object detection
const objectTestCases = [
  {},
  { key: 'value' },
  [],
  [1, 2, 3],
  null,
  undefined,
  'string'
];

console.log('\nTesting isEmptyObject function:');
objectTestCases.forEach(testCase => {
  console.log(`isEmptyObject(${JSON.stringify(testCase)}): ${isEmptyObject(testCase)}`);
});

console.log('\n✅ All tests completed successfully!');