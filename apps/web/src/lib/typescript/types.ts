/**
 * Premium TypeScript Type Definitions
 * Common types for instant use across the application
 */

// API Response Types
export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
  isActive?: boolean;
}

export interface AuthState {
  status: 'loading' | 'authed' | 'guest';
  token: string | null;
  user: User | null;
  permissions: string[];
  permissionsLoading: boolean;
}

// Permission Types
export type Permission = 
  | 'internships:read'
  | 'internships:apply'
  | 'internships:manage'
  | 'clientlab:read'
  | 'clientlab:update'
  | 'clientlab:manage'
  | 'certificates:read'
  | 'certificates:issue'
  | 'content:read'
  | 'content:write'
  | 'progress:read'
  | 'progress:write'
  | 'submissions:read'
  | 'submissions:review'
  | 'practice:read'
  | 'practice:submit'
  | 'media:token'
  | 'workshops:manage'
  | 'leads:manage'
  | 'referrals:manage'
  | 'featureflags:manage';

// Feature Flag Types
export interface FeatureFlags {
  [key: string]: boolean;
}

// Three.js Types
export interface ThreeSceneConfig {
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  controls?: boolean;
  environment?: boolean;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
