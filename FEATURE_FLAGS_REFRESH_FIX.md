# Feature Flags Refresh Fix

## Problem
When SuperAdmin disabled features in the Feature Flags page, the changes were not reflecting in the Student portal. Disabled features were still showing because the `useFeatureFlags` hook only loaded flags once on mount and never refetched.

## Root Cause
1. **No Refetch Mechanism**: The `useFeatureFlags` hook only loaded flags once when the component mounted
2. **No Cross-Component Communication**: When SuperAdmin toggled a flag, other components (like Student portal) had no way to know about the change
3. **No Polling**: Flags were never automatically refreshed

## Solution

### 1. Added Automatic Polling (`apps/web/src/hooks/useFeatureFlags.js`)
- Flags are now automatically refetched every **30 seconds**
- Ensures all portals stay in sync with the latest flag values

### 2. Added Custom Event System
- When SuperAdmin toggles a flag, it fires a `feature-flags-updated` custom event
- All `useFeatureFlags` hooks listen to this event and immediately refetch
- Works across all components in the same browser tab/window

### 3. Added Cross-Tab Sync
- Uses `localStorage` to sync flags across different browser tabs/windows
- When flags are updated, a timestamp is stored in `localStorage`
- Other tabs detect the change via `storage` event and refetch flags

### 4. Added Manual Refetch Function
- The hook now returns a `refetch()` function that can be called manually
- Useful for forcing an immediate refresh if needed

## Implementation Details

### `useFeatureFlags` Hook Changes
```javascript
// Now includes:
- Automatic polling every 30 seconds
- Custom event listener for 'feature-flags-updated'
- Storage event listener for cross-tab sync
- Manual refetch() function
```

### `SuperAdminFeatureFlags` Changes
```javascript
// After toggling a flag:
1. Updates the flag in the database
2. Reloads flags in SuperAdmin page
3. Fires 'feature-flags-updated' event
4. Updates localStorage timestamp
```

## How It Works

1. **Immediate Update (Same Tab)**:
   - SuperAdmin toggles flag → Event fired → All components refetch immediately

2. **Automatic Polling**:
   - Every 30 seconds, all components refetch flags from the server
   - Ensures sync even if events are missed

3. **Cross-Tab Sync**:
   - SuperAdmin updates flag in Tab 1
   - Tab 2 detects localStorage change
   - Tab 2 automatically refetches flags

## Testing

1. **Same Tab Test**:
   - Open Student portal in one tab
   - Open SuperAdmin Feature Flags in another tab (same browser)
   - Disable a feature in SuperAdmin
   - Student portal should update within 1-2 seconds (via event)

2. **Polling Test**:
   - Disable a feature in SuperAdmin
   - Wait up to 30 seconds
   - Student portal should update automatically

3. **Cross-Tab Test**:
   - Open Student portal in Tab 1
   - Open SuperAdmin in Tab 2
   - Disable a feature in Tab 2
   - Tab 1 should detect and update (via storage event)

## Benefits

- ✅ **Real-time Updates**: Changes reflect immediately in the same tab
- ✅ **Automatic Sync**: No manual refresh needed
- ✅ **Cross-Tab Support**: Works across multiple browser tabs
- ✅ **Reliable**: Polling ensures sync even if events fail
- ✅ **Backward Compatible**: Existing code continues to work

## Performance

- Polling interval: 30 seconds (configurable)
- Event-based updates: Immediate (< 1 second)
- Minimal overhead: Only refetches when needed
- Efficient: Uses AbortController to cancel in-flight requests

