import { useState, useRef, useEffect } from "react";
import { FiMic, FiUpload, FiPlay, FiPause, FiSquare, FiTrash2, FiVolume2, FiSettings } from "react-icons/fi";

export default function VoiceOverEditor({ slide, onUpdate }) {
  const [voiceMode, setVoiceMode] = useState(slide.voiceOver?.mode || "tts"); // tts, upload, record
  const [ttsText, setTtsText] = useState(slide.voiceOver?.ttsText || slide.content?.title || "");
  const [selectedVoice, setSelectedVoice] = useState(slide.voiceOver?.voice || "default");
  const [voiceSpeed, setVoiceSpeed] = useState(slide.voiceOver?.speed || 1.0);
  const [voicePitch, setVoicePitch] = useState(slide.voiceOver?.pitch || 1.0);
  const [voiceVolume, setVoiceVolume] = useState(slide.voiceOver?.volume || 1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(slide.voiceOver?.audioUrl || null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const synthRef = useRef(null);

  // Get available TTS voices
  const getAvailableVoices = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  };

  const [availableVoices, setAvailableVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = getAvailableVoices();
      setAvailableVoices(voices);
    };
    
    loadVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // TTS Playback
  const handleTTSPlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!ttsText.trim()) {
      alert("Please enter text for voice-over");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(ttsText);
    const voice = availableVoices.find(v => v.name === selectedVoice) || availableVoices[0];
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = voiceSpeed;
    utterance.pitch = voicePitch;
    utterance.volume = voiceVolume;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  // Audio Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      alert("Please upload an audio file");
      return;
    }

    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setVoiceMode("upload");
    
    onUpdate({
      voiceOver: {
        mode: "upload",
        audioUrl: url,
        fileName: file.name,
      },
    });
  };

  // Audio Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsRecording(false);
        setRecordingTime(0);
        
        onUpdate({
          voiceOver: {
            mode: "record",
            audioUrl: url,
            recordedAt: new Date().toISOString(),
          },
        });

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Recording failed:", error);
      alert("Microphone access denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  // Play uploaded/recorded audio
  const handleAudioPlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Delete voice-over
  const handleDelete = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setTtsText("");
    setIsPlaying(false);
    
    onUpdate({
      voiceOver: null,
    });
  };

  // Save TTS settings
  const saveTTSSettings = () => {
    onUpdate({
      voiceOver: {
        mode: "tts",
        ttsText,
        voice: selectedVoice,
        speed: voiceSpeed,
        pitch: voicePitch,
        volume: voiceVolume,
      },
    });
  };

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (audioUrl && voiceMode === "upload") {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Voice-Over</h3>
        {(audioUrl || ttsText) && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
          >
            <FiTrash2 className="w-4 h-4" />
            Remove
          </button>
        )}
      </div>

      {/* Mode Selection */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setVoiceMode("tts")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            voiceMode === "tts"
              ? "bg-blue-500 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Text-to-Speech
        </button>
        <button
          onClick={() => setVoiceMode("upload")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            voiceMode === "upload"
              ? "bg-blue-500 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Upload Audio
        </button>
        <button
          onClick={() => setVoiceMode("record")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            voiceMode === "record"
              ? "bg-blue-500 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Record
        </button>
      </div>

      {/* TTS Mode */}
      {voiceMode === "tts" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Text to Speak
            </label>
            <textarea
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              onBlur={saveTTSSettings}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text for voice-over..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => {
                setSelectedVoice(e.target.value);
                saveTTSSettings();
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableVoices.length > 0 ? (
                availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} {voice.lang && `(${voice.lang})`}
                  </option>
                ))
              ) : (
                <option value="default">Default Voice</option>
              )}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Speed: {voiceSpeed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSpeed}
                onChange={(e) => {
                  setVoiceSpeed(parseFloat(e.target.value));
                  saveTTSSettings();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pitch: {voicePitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={voicePitch}
                onChange={(e) => {
                  setVoicePitch(parseFloat(e.target.value));
                  saveTTSSettings();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Volume: {Math.round(voiceVolume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceVolume}
                onChange={(e) => {
                  setVoiceVolume(parseFloat(e.target.value));
                  saveTTSSettings();
                }}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={handleTTSPlay}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            {isPlaying ? (
              <>
                <FiPause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <FiPlay className="w-4 h-4" />
                Preview Voice
              </>
            )}
          </button>
        </div>
      )}

      {/* Upload Mode */}
      {voiceMode === "upload" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Supported formats: MP3, WAV, OGG, WebM
            </p>
          </div>

          {audioUrl && (
            <div className="space-y-2">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
              />
              <button
                onClick={handleAudioPlay}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <FiPause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <FiPlay className="w-4 h-4" />
                    Play Audio
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Record Mode */}
      {voiceMode === "record" && (
        <div className="space-y-4">
          <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-md">
            {isRecording ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Recording...</span>
                </div>
                <div className="text-2xl font-mono font-bold">
                  {formatTime(recordingTime)}
                </div>
                <button
                  onClick={stopRecording}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center gap-2 mx-auto"
                >
                  <FiSquare className="w-4 h-4" />
                  Stop Recording
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <FiMic className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-slate-600">
                  {audioUrl ? "Re-record audio" : "Click to start recording"}
                </p>
                <button
                  onClick={startRecording}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2 mx-auto"
                >
                  <FiMic className="w-4 h-4" />
                  {audioUrl ? "Record Again" : "Start Recording"}
                </button>
              </div>
            )}
          </div>

          {audioUrl && !isRecording && (
            <div className="space-y-2">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
              />
              <button
                onClick={handleAudioPlay}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <FiPause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <FiPlay className="w-4 h-4" />
                    Play Recording
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Auto-play Settings */}
      {(audioUrl || ttsText) && (
        <div className="pt-4 border-t border-slate-200">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={slide.voiceOver?.autoplay || false}
              onChange={(e) => {
                onUpdate({
                  voiceOver: {
                    ...slide.voiceOver,
                    autoplay: e.target.checked,
                  },
                });
              }}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Auto-play on slide show</span>
          </label>
        </div>
      )}
    </div>
  );
}
