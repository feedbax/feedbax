import { addAdmin, isAdmin } from './auth';
import { addUser, isUser } from './auth';

test('should add an admin to the set', () => {
  addAdmin('jest-test');
  expect(isAdmin('jest-test')).toEqual(true);
});

test('should return false', () => {
  expect(isAdmin('jest-test-invalid')).toEqual(false);
});

test('should add an user to the set', () => {
  addUser('jest-test');
  expect(isUser('jest-test')).toEqual(true);
});

test('should return false', () => {
  expect(isUser('jest-test-invalid')).toEqual(false);
});
