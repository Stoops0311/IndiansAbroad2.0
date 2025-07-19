# Armesh Color Scheme Analysis

## Color Palette (OKLCH to Hex/RGB Conversion)

### Dark Theme Colors (Primary Theme)

#### Background Colors
- **Background**: `oklch(0.14 0.02 285)` → #1a1625 / rgb(26, 22, 37)
- **Card/Popover**: `oklch(0.16 0.025 285)` → #201b30 / rgb(32, 27, 48)
- **Sidebar**: `oklch(0.16 0.025 285)` → #201b30 / rgb(32, 27, 48)

#### Primary Colors (Purple)
- **Primary**: `oklch(0.65 0.25 285)` → #8b5cf6 / rgb(139, 92, 246)
- **Primary Foreground**: `oklch(0.95 0.01 285)` → #f4f3f5 / rgb(244, 243, 245)

#### Text Colors
- **Foreground**: `oklch(0.95 0.01 285)` → #f4f3f5 / rgb(244, 243, 245)
- **Muted Foreground**: `oklch(0.65 0.05 285)` → #9896a4 / rgb(152, 150, 164)

#### Secondary/Accent Colors
- **Secondary**: `oklch(0.22 0.03 285)` → #322c49 / rgb(50, 44, 73)
- **Accent**: `oklch(0.5 0.2 285)` → #6347b3 / rgb(99, 71, 179)
- **Muted**: `oklch(0.22 0.03 285)` → #322c49 / rgb(50, 44, 73)

#### Border & Input Colors
- **Border**: `oklch(0.25 0.03 285)` → #3a3451 / rgb(58, 52, 81)
- **Input**: `oklch(0.22 0.03 285)` → #322c49 / rgb(50, 44, 73)
- **Ring**: `oklch(0.65 0.25 285)` → #8b5cf6 / rgb(139, 92, 246)

#### Destructive/Error Color
- **Destructive**: `oklch(0.704 0.191 22.216)` → #ef4444 / rgb(239, 68, 68)

#### Chart Colors (Data Visualization)
- **Chart 1**: `oklch(0.7 0.25 285)` → #a78bfa / rgb(167, 139, 250)
- **Chart 2**: `oklch(0.6 0.2 265)` → #818cf8 / rgb(129, 140, 248)
- **Chart 3**: `oklch(0.5 0.15 305)` → #9061b3 / rgb(144, 97, 179)
- **Chart 4**: `oklch(0.8 0.15 285)` → #c4b5fd / rgb(196, 181, 253)
- **Chart 5**: `oklch(0.4 0.2 285)` → #4b2f91 / rgb(75, 47, 145)

### Key Characteristics

1. **Dark Purple Theme**: The entire color scheme is based on a purple hue (285° in OKLCH)
2. **High Contrast**: Very dark backgrounds (#1a1625) with light text (#f4f3f5)
3. **Consistent Hue**: Almost all colors maintain the 285° hue angle for cohesiveness
4. **Purple Gradient**: Multiple shades of purple from dark (#1a1625) to bright (#8b5cf6)
5. **Subtle Variations**: Cards and sidebars use slightly lighter backgrounds than the main background

### Button States
Based on the primary color, typical hover states would be:
- **Primary Hover**: Slightly darker purple (~#7c3aed)
- **Secondary Hover**: Slightly lighter (#3e3658)
- **Accent Hover**: Slightly darker (#563d9f)

### CSS Custom Properties Used
The design uses CSS custom properties for easy theming:
- All colors are defined as CSS variables (--background, --primary, etc.)
- The same values are used for both light and dark themes (app appears to be dark-only)
- Uses the modern OKLCH color space for better perceptual uniformity

### Tailwind Integration
- Uses Tailwind CSS v4 with custom theme configuration
- Custom variants for dark mode
- CSS variables are mapped to Tailwind color utilities
- Radius variables for consistent border radius (0.625rem base)