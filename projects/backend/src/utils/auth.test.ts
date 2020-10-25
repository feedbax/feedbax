import { addAdmin, isAdmin } from './auth';
import { addUser, isUser } from './auth';

test('should add an admin to the set', () => {
  addAdmin('jest-test');
  expect(isAdmin('jest-test')).toEqual(true);
});

test('should throw error', () => {
  expect(() => isAdmin('jest-test-invalid')).toThrowError('socket-id is not authorized for this event.');
});

test('should add an user to the set', () => {
  addUser('jest-test');
  expect(isUser('jest-test')).toEqual(true);
});

test('should throw error', () => {
  expect(() => isUser('jest-test-invalid')).toThrowError('socket-id is not authorized for this event.');
});
