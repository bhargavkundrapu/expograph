/**
 * Premium TypeScript Utility Functions
 * Type-safe utility functions for instant use
 */

import type { ApiResponse, Permission, User } from './types';

/**
 * Type-safe API response handler
 */
export function handleApiResponse<T>(
  response: ApiResponse<T>
): T {
  if (!response.ok || !response.data) {
    throw new Error(response.error?.message || 'API request failed');
  }
  return response.data;
}

/**
 * Type-safe permission checker
 */
export function hasPermission(
  permissions: string[],
  permission: Permission
): permissions is Permission[] {
  return permissions.includes(permission);
}

/**
 * Type-safe user validator
 */
export function isValidUser(user: unknown): user is User {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'email' in user &&
    typeof (user as User).id === 'string' &&
    typeof (user as User).email === 'string'
  );
}

/**
 * Type-safe array unwrapper
 */
export function unwrapArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }
  if (data && typeof data === 'object' && 'data' in data) {
    const nested = (data as { data: unknown }).data;
    return Array.isArray(nested) ? (nested as T[]) : [];
  }
  return [];
}

/**
 * Type-safe object unwrapper
 */
export function unwrapObject<T>(data: unknown): T | null {
  if (data && typeof data === 'object') {
    if ('data' in data) {
      return (data as { data: unknown }).data as T;
    }
    return data as T;
  }
  return null;
}
