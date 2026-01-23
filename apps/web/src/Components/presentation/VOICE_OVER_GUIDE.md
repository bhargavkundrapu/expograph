# Voice-Over Feature Guide

The presentation module supports **multiple ways** to add and edit voice-overs for your slides. Here's a comprehensive guide to all available options:

## 🎤 Voice-Over Methods

### 1. **Text-to-Speech (TTS)** - Browser Built-in
**Best for:** Quick narration, consistent voice, no recording needed

**Features:**
- Uses browser's native Speech Synthesis API
- Multiple voice options (varies by browser/OS)
- Adjustable speed (0.5x - 2.0x)
- Adjustable pitch (0 - 2.0)
- Adjustable volume (0% - 100%)
- Real-time preview
- No file uploads needed

**How to use:**
1. Select a slide
2. Go to "Voice" tab
3. Choose "Text-to-Speech" mode
4. Enter your text
5. Select voice from dropdown
6. Adjust speed, pitch, volume sliders
7. Click "Preview Voice" to test
8. Enable "Auto-play on slide show" if desired

**Available Voices:**
- Depends on your operating system
- Windows: Microsoft voices (Zira, David, etc.)
- macOS: Apple voices (Alex, Samantha, etc.)
- Linux: Festival, eSpeak voices
- Chrome: Google voices

### 2. **Upload Audio File** - Pre-recorded Audio
**Best for:** Professional narration, music, sound effects, custom voices

**Features:**
- Upload MP3, WAV, OGG, WebM files
- Full control over audio quality
- Can use professional voice actors
- Supports background music
- Auto-play option

**How to use:**
1. Select a slide
2. Go to "Voice" tab
3. Choose "Upload Audio" mode
4. Click "Choose File" and select audio file
5. Preview plays automatically
6. Enable "Auto-play on slide show" if desired

**Supported Formats:**
- MP3 (most compatible)
- WAV (high quality)
- OGG (open source)
- WebM (web optimized)

### 3. **Record Audio** - Browser Recording
**Best for:** Quick recordings, personal narration, live demos

**Features:**
- Record directly in browser
- No external software needed
- Real-time recording timer
- Instant playback
- Re-record option
- Auto-play option

**How to use:**
1. Select a slide
2. Go to "Voice" tab
3. Choose "Record" mode
4. Click "Start Recording"
5. Grant microphone permission
6. Speak your narration
7. Click "Stop Recording"
8. Preview your recording
9. Re-record if needed
10. Enable "Auto-play on slide show" if desired

**Requirements:**
- Microphone access permission
- Modern browser (Chrome, Firefox, Edge, Safari)

## 🎛️ Voice Editing Options

### For Text-to-Speech:

1. **Voice Selection**
   - Choose from available system voices
   - Different voices for different languages
   - Male/Female options available

2. **Speed Control** (0.5x - 2.0x)
   - 0.5x = Very slow
   - 1.0x = Normal speed
   - 1.5x = Fast
   - 2.0x = Very fast

3. **Pitch Control** (0 - 2.0)
   - Lower values = Deeper voice
   - 1.0 = Normal pitch
   - Higher values = Higher voice

4. **Volume Control** (0% - 100%)
   - Adjust playback volume
   - Doesn't affect audio file volume

### For Uploaded/Recorded Audio:

1. **Volume Control** (0% - 100%)
   - Adjust playback volume
   - Useful for balancing audio levels

2. **Auto-play Toggle**
   - Enable to play automatically when slide appears
   - Disable for manual playback

## 🔧 Advanced Features

### Auto-Play Configuration
- **Per-slide control:** Each slide can have its own auto-play setting
- **Global control:** Can be enabled/disabled per slide
- **Smooth transitions:** Voice-over stops when navigating away

### Multiple Voice-Overs Per Slide
- You can have different voice-overs for different fragments
- Each fragment can trigger its own narration
- Useful for step-by-step explanations

### Voice-Over Management
- **Preview:** Test voice-over before saving
- **Remove:** Delete voice-over from slide
- **Edit:** Modify settings anytime
- **Replace:** Switch between TTS, Upload, or Record modes

## 📊 Comparison Table

| Feature | TTS | Upload | Record |
|---------|-----|--------|--------|
| Setup Time | Instant | Medium | Instant |
| Quality | Good | Excellent | Good |
| Customization | High | Low | Low |
| File Size | None | Large | Medium |
| Professional | No | Yes | No |
| Live Demo | Yes | No | Yes |
| Offline | Yes | Yes | Yes |
| Multi-language | Yes | Yes | Yes |

## 💡 Best Practices

### Text-to-Speech:
- Keep sentences short and clear
- Use punctuation for natural pauses
- Test different voices to find the best fit
- Adjust speed based on content complexity
- Use 1.0-1.2x speed for technical content

### Upload Audio:
- Use high-quality recordings (44.1kHz, 16-bit minimum)
- Keep files under 10MB for web performance
- Normalize audio levels across slides
- Use MP3 format for best compatibility
- Consider background music at low volume

### Record Audio:
- Use a good microphone for better quality
- Record in a quiet environment
- Speak clearly and at moderate pace
- Test recording levels before starting
- Keep recordings concise (under 2 minutes per slide)

## 🎯 Use Cases

### Educational Presentations:
- **TTS:** Quick explanations, consistent narration
- **Upload:** Professional course content, multiple languages
- **Record:** Personal touch, instructor's voice

### Business Presentations:
- **TTS:** Quick demos, consistent messaging
- **Upload:** Professional voice-over, branded audio
- **Record:** CEO/presenter's own voice

### Technical Presentations:
- **TTS:** Code explanations, technical terms
- **Upload:** High-quality technical narration
- **Record:** Live coding explanations

## 🔄 Switching Between Methods

You can easily switch between methods:
1. Select different mode (TTS/Upload/Record)
2. Previous voice-over is preserved
3. New method replaces old one
4. Settings are saved automatically

## 🚀 Tips & Tricks

1. **Mix Methods:** Use TTS for quick slides, Upload for important ones
2. **Consistent Volume:** Normalize all audio files to similar levels
3. **Test Playback:** Always preview before presenting
4. **Backup Audio:** Keep original audio files safe
5. **Accessibility:** Voice-overs help with accessibility
6. **Multi-language:** Use different voices for different languages
7. **Pacing:** Adjust speed based on audience (slower for beginners)

## 🐛 Troubleshooting

### TTS Not Working:
- Check browser compatibility (Chrome, Firefox, Edge work best)
- Ensure text is not empty
- Try different voice options
- Check browser console for errors

### Upload Not Working:
- Verify file format (MP3, WAV, OGG, WebM)
- Check file size (keep under 10MB)
- Ensure file is not corrupted
- Try different browser

### Recording Not Working:
- Grant microphone permissions
- Check microphone is connected
- Try different browser
- Ensure HTTPS (required for microphone access)

### Audio Not Playing:
- Check volume settings
- Verify auto-play is enabled
- Check browser audio settings
- Ensure audio file is valid

## 📝 Technical Details

### Browser Support:
- **TTS:** Chrome 33+, Firefox 49+, Safari 7+, Edge 14+
- **Upload:** All modern browsers
- **Record:** Chrome 47+, Firefox 25+, Edge 79+, Safari 11+

### File Size Limits:
- Recommended: Under 5MB per audio file
- Maximum: 10MB (may vary by browser)
- Format: MP3 recommended for best compatibility

### Audio Quality:
- **TTS:** Depends on browser/OS voices
- **Upload:** Depends on source file quality
- **Record:** Depends on microphone quality

## 🎨 Customization Options Summary

**Text-to-Speech:**
- ✅ Voice selection (multiple options)
- ✅ Speed control (0.5x - 2.0x)
- ✅ Pitch control (0 - 2.0)
- ✅ Volume control (0% - 100%)
- ✅ Real-time preview
- ✅ Auto-play option

**Upload Audio:**
- ✅ File format selection
- ✅ Volume control
- ✅ Auto-play option
- ✅ Preview playback

**Record Audio:**
- ✅ Real-time recording
- ✅ Recording timer
- ✅ Re-record option
- ✅ Volume control
- ✅ Auto-play option
- ✅ Preview playback

---

**Total Voice-Over Options: 3 Methods × Multiple Settings = Comprehensive Voice Control**

Choose the method that best fits your needs, or mix and match for different slides!
