# Presentation Builder Module

A comprehensive, premium presentation creation and management system built with reveal.js and integrated with multiple advanced libraries.

## Features

### Core Presentation Features
- ✅ **Full reveal.js Integration** - Professional presentation framework
- ✅ **Multiple Slide Types** - Title, Content, Code, Image, Video, Chart, Math, Diagram (Mermaid), Quiz
- ✅ **Slide Management** - Add, delete, duplicate, reorder slides
- ✅ **Rich Content Editing** - CodeMirror for code editing, markdown support
- ✅ **Backgrounds** - Colors, gradients, images, videos
- ✅ **Transitions** - Multiple transition effects (fade, slide, convex, concave, zoom)
- ✅ **Fragments** - Step-by-step content reveals with animations
- ✅ **Configuration Panel** - Comprehensive settings for all features

### Reveal.js Plugins
- ✅ **Markdown** - Write slides in Markdown
- ✅ **Highlight.js** - Syntax highlighting for code blocks
- ✅ **Math (KaTeX)** - Mathematical equations with LaTeX
- ✅ **Speaker Notes** - Private notes for presenters
- ✅ **Search** - Full-text search across slides
- ✅ **Zoom** - Alt+Click to zoom into elements

### Advanced Integrations
- ✅ **Chart.js** - Interactive charts and graphs
- ✅ **Mermaid.js** - Flowcharts, sequence diagrams, Gantt charts
- ✅ **CodeMirror** - Live code editing in slides
- ✅ **Dynamic Library Loading** - Libraries loaded on-demand

### Interactive Features
- ✅ **Quiz Slides** - Multiple choice, true/false questions
- ✅ **Fragment Animations** - Multiple animation types
- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Touch/Swipe** - Mobile-friendly navigation
- ✅ **Fullscreen Mode** - Professional presentation mode

## File Structure

```
apps/web/src/
├── pages/lms/superadmin/
│   └── SuperAdminPresentation.jsx    # Main presentation management page
└── Components/presentation/
    ├── PresentationBuilder.jsx      # Slide editor and builder
    ├── PresentationViewer.jsx       # reveal.js presentation player
    ├── PresentationConfigPanel.jsx # Configuration settings panel
    └── SlideEditor.jsx              # Individual slide editor
```

## Usage

### Accessing the Module

1. Navigate to SuperAdmin portal
2. Click on "Presentations" in the sidebar menu
3. You'll see the presentation list/management interface

### Creating a New Presentation

1. Click "Create New Presentation" button
2. Enter a title for your presentation
3. Start adding slides using the "Add Slide" button
4. Select slide types from the editor
5. Configure each slide's content, background, and settings
6. Use the Configuration panel to adjust global settings
7. Click "Save" to save your presentation

### Slide Types

#### Title Slide
- Main title and subtitle
- Perfect for opening slides

#### Content Slide
- Rich text content with markdown support
- Supports fragments for step-by-step reveals

#### Code Slide
- Syntax-highlighted code blocks
- Supports multiple languages (JavaScript, Python, HTML, CSS, etc.)
- Uses CodeMirror for editing

#### Image Slide
- Image with title and caption
- Supports any image URL

#### Video Slide
- Embedded videos (YouTube, Vimeo, or direct video URLs)
- Autoplay option

#### Chart Slide
- Interactive charts using Chart.js
- Supports bar, line, pie, doughnut, radar charts
- JSON data configuration

#### Math Slide
- Mathematical equations using KaTeX/LaTeX
- Supports complex mathematical notation

#### Diagram Slide (Mermaid)
- Flowcharts, sequence diagrams, Gantt charts
- Class diagrams, state diagrams, entity relationships
- Uses Mermaid.js syntax

#### Quiz Slide
- Multiple choice questions
- True/False questions
- Short answer questions
- Explanation text for answers

### Configuration Options

Access the Configuration panel by clicking the "Config" button in the builder.

#### Display Settings
- Width/Height - Presentation dimensions
- Margin - Slide margins
- Min/Max Scale - Zoom limits
- Theme - Color theme (black, white, league, beige, sky, night, serif, simple, solarized)

#### Controls
- Show Controls - Navigation arrows
- Show Progress - Progress bar
- Show Slide Numbers - Current/total slide numbers

#### Navigation
- Keyboard Navigation - Arrow keys, space, etc.
- Touch Navigation - Swipe gestures
- Overview Mode - ESC to see all slides
- Center Slides - Center alignment
- Loop Presentation - Continuous loop
- Enable Fragments - Step-by-step reveals
- Auto Animate - Automatic animations between slides

#### Behavior
- Hash Navigation - URL updates with slide number
- Auto Slide - Automatic progression (seconds, 0 = disabled)

#### Transitions
- Default Transition - Slide transition effect
- Transition Speed - Animation speed
- Background Transition - Background change effect

#### Plugins
Toggle individual plugins:
- Markdown
- Highlight (syntax highlighting)
- Math (equations)
- Notes (speaker notes)
- Search
- Zoom
- Chart
- Menu
- Chalkboard

### Presenting

1. Click "Present" button on any presentation
2. Use keyboard shortcuts:
   - **Arrow keys** or **Space** - Next slide
   - **Shift + Arrow** or **P** - Previous slide
   - **ESC** - Overview mode
   - **F** - Fullscreen
   - **S** - Speaker notes view
   - **Alt + Click** - Zoom
   - **?** - Help menu

### Keyboard Shortcuts

- `→`, `↓`, `Space`, `N`, `L` - Next slide
- `←`, `↑`, `P`, `H` - Previous slide
- `Home` - First slide
- `End` - Last slide
- `ESC`, `O` - Overview mode
- `F` - Fullscreen
- `S` - Speaker notes
- `B`, `.` - Pause (blackout)
- `?` - Help menu
- `Alt + Click` - Zoom
- `G` - Go to slide number
- `M` - Menu toggle

## API Integration

The module expects the following API endpoints:

### GET `/api/v1/presentations`
Fetch all presentations

### POST `/api/v1/presentations`
Create a new presentation
```json
{
  "title": "Presentation Title",
  "description": "Description",
  "slides": [...],
  "config": {...},
  "slideCount": 10,
  "status": "draft"
}
```

### PUT `/api/v1/presentations/:id`
Update a presentation

### DELETE `/api/v1/presentations/:id`
Delete a presentation

## Technical Details

### Dependencies
- `reveal.js` - Core presentation framework
- `@uiw/react-codemirror` - Code editor
- `chart.js` - Charts and graphs
- `mermaid` - Diagrams
- `katex` - Math rendering
- `highlight.js` - Syntax highlighting

### Dynamic Library Loading
Libraries are loaded on-demand via CDN when needed:
- Chart.js for chart slides
- KaTeX for math slides
- Mermaid for diagram slides

This ensures optimal performance and smaller initial bundle size.

## Customization

### Adding New Slide Types

1. Add slide type to `slideTypes` array in `SlideEditor.jsx`
2. Add rendering logic in `SlideEditor.jsx` `renderContentEditor()`
3. Add rendering logic in `PresentationViewer.jsx` `renderSlide()`
4. Update `getDefaultContent()` function

### Adding New Plugins

1. Install plugin package or add CDN link
2. Import plugin in `PresentationViewer.jsx`
3. Add to plugins array in Reveal initialization
4. Add toggle in `PresentationConfigPanel.jsx`

## Best Practices

1. **Performance**: Keep slide count reasonable (< 100 slides)
2. **Images**: Optimize images before uploading
3. **Videos**: Use compressed video formats
4. **Code**: Keep code examples concise
5. **Charts**: Provide complete data structures
6. **Mermaid**: Test diagrams before presenting
7. **Fragments**: Use fragments for step-by-step reveals
8. **Transitions**: Choose transitions that match content
9. **Themes**: Select theme based on audience and content
10. **Testing**: Always preview before presenting

## Troubleshooting

### Charts not rendering
- Ensure Chart.js is loaded (check browser console)
- Verify data structure is valid JSON
- Check chart type is supported

### Math equations not rendering
- Ensure KaTeX is loaded
- Check LaTeX syntax is correct
- Use `$$` for block equations, `$` for inline

### Mermaid diagrams not rendering
- Ensure Mermaid.js is loaded
- Check Mermaid syntax is valid
- Wait for library to initialize

### Videos not playing
- Check video URL is accessible
- Verify video format is supported
- Try different video source

## Future Enhancements

Potential features to add:
- [ ] PDF export
- [ ] Presentation recording
- [ ] Real-time collaboration
- [ ] Live polling/audience interaction
- [ ] 3D graphics (Three.js)
- [ ] Particle effects backgrounds
- [ ] Custom animations (GSAP)
- [ ] D3.js visualizations
- [ ] Audio narration
- [ ] Presentation templates
- [ ] Slide transitions preview
- [ ] Bulk slide operations
- [ ] Import from PowerPoint/Google Slides
- [ ] Export to various formats

## Support

For issues or feature requests, contact the development team or create an issue in the project repository.
