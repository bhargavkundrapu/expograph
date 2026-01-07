# White & Green Theme Update Guide

## Pattern for Updating Pages

### Color Replacements:
- `bg-black` → `bg-white`
- `bg-gray-900` → `bg-white` or `bg-green-50`
- `bg-gray-800` → `bg-green-50` or `bg-white`
- `bg-gray-700` → `bg-green-100`
- `text-white` → `text-gray-900` or `text-green-700`
- `text-gray-400` → `text-gray-600` or `text-gray-700`
- `text-gray-300` → `text-gray-700`
- `border-gray-800` → `border-green-200`
- `border-gray-700` → `border-green-300`
- `bg-gradient-to-br from-*-400 to-*-500` → `bg-green-600` or `bg-green-500`

### Remove All Hover Effects:
- Remove all `hover:` classes
- Remove all `group-hover:` classes
- Remove `transition-transform`, `transition-all`, `transition-colors` related to hover
- Keep only `active:scale-95` for buttons

### Responsive Classes:
- Add `sm:`, `md:`, `lg:` prefixes for spacing, text sizes, padding
- Use `flex-col sm:flex-row` for responsive layouts
- Use `text-sm sm:text-base` for responsive text
- Use `p-4 sm:p-6` for responsive padding

### Gradient Colors → Green:
- `from-cyan-400 to-blue-500` → `bg-green-600`
- `from-purple-400 to-pink-500` → `bg-green-600`
- `from-emerald-400 to-teal-500` → `bg-green-600`
- `from-indigo-400 to-purple-500` → `bg-green-600`
- `from-pink-400 to-rose-500` → `bg-green-600`
- `from-teal-400 to-cyan-500` → `bg-green-600`
- `from-amber-400 to-orange-500` → `bg-green-600`
- `from-yellow-400 to-amber-500` → `bg-green-600`

### Keep Functionality:
- All onClick handlers
- All state management
- All API calls
- All routing
- All form submissions
- All conditional rendering

