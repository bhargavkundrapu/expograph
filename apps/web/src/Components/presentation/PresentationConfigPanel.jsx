import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function PresentationConfigPanel({ config, onUpdate, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    display: true,
    controls: true,
    navigation: true,
    behavior: true,
    transitions: true,
    plugins: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const updateConfig = (path, value) => {
    const keys = path.split(".");
    const newConfig = { ...config };
    let current = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    onUpdate(newConfig);
  };

  const togglePlugin = (pluginName) => {
    updateConfig(`plugins.${pluginName}`, !config.plugins?.[pluginName]);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="w-96 bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden"
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Configuration</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Display Settings */}
        <ConfigSection
          title="Display"
          expanded={expandedSections.display}
          onToggle={() => toggleSection("display")}
        >
          <ConfigField
            label="Width"
            type="number"
            value={config.width || 1920}
            onChange={(v) => updateConfig("width", parseInt(v))}
          />
          <ConfigField
            label="Height"
            type="number"
            value={config.height || 1080}
            onChange={(v) => updateConfig("height", parseInt(v))}
          />
          <ConfigField
            label="Margin"
            type="number"
            step="0.01"
            value={config.margin || 0.04}
            onChange={(v) => updateConfig("margin", parseFloat(v))}
          />
          <ConfigField
            label="Min Scale"
            type="number"
            step="0.1"
            value={config.minScale || 0.2}
            onChange={(v) => updateConfig("minScale", parseFloat(v))}
          />
          <ConfigField
            label="Max Scale"
            type="number"
            step="0.1"
            value={config.maxScale || 2.0}
            onChange={(v) => updateConfig("maxScale", parseFloat(v))}
          />
          <ConfigField
            label="Theme"
            type="select"
            value={config.theme || "black"}
            options={["black", "white", "league", "beige", "sky", "night", "serif", "simple", "solarized"]}
            onChange={(v) => updateConfig("theme", v)}
          />
        </ConfigSection>

        {/* Controls */}
        <ConfigSection
          title="Controls"
          expanded={expandedSections.controls}
          onToggle={() => toggleSection("controls")}
        >
          <ConfigField
            label="Show Controls"
            type="checkbox"
            value={config.controls !== false}
            onChange={(v) => updateConfig("controls", v)}
          />
          <ConfigField
            label="Show Progress"
            type="checkbox"
            value={config.progress !== false}
            onChange={(v) => updateConfig("progress", v)}
          />
          <ConfigField
            label="Show Slide Numbers"
            type="checkbox"
            value={config.slideNumber !== false}
            onChange={(v) => updateConfig("slideNumber", v)}
          />
        </ConfigSection>

        {/* Navigation */}
        <ConfigSection
          title="Navigation"
          expanded={expandedSections.navigation}
          onToggle={() => toggleSection("navigation")}
        >
          <ConfigField
            label="Keyboard Navigation"
            type="checkbox"
            value={config.keyboard !== false}
            onChange={(v) => updateConfig("keyboard", v)}
          />
          <ConfigField
            label="Touch Navigation"
            type="checkbox"
            value={config.touch !== false}
            onChange={(v) => updateConfig("touch", v)}
          />
          <ConfigField
            label="Overview Mode"
            type="checkbox"
            value={config.overview !== false}
            onChange={(v) => updateConfig("overview", v)}
          />
          <ConfigField
            label="Center Slides"
            type="checkbox"
            value={config.center !== false}
            onChange={(v) => updateConfig("center", v)}
          />
          <ConfigField
            label="Loop Presentation"
            type="checkbox"
            value={config.loop || false}
            onChange={(v) => updateConfig("loop", v)}
          />
          <ConfigField
            label="Enable Fragments"
            type="checkbox"
            value={config.fragments !== false}
            onChange={(v) => updateConfig("fragments", v)}
          />
          <ConfigField
            label="Auto Animate"
            type="checkbox"
            value={config.autoAnimate || false}
            onChange={(v) => updateConfig("autoAnimate", v)}
          />
        </ConfigSection>

        {/* Behavior */}
        <ConfigSection
          title="Behavior"
          expanded={expandedSections.behavior}
          onToggle={() => toggleSection("behavior")}
        >
          <ConfigField
            label="Hash Navigation"
            type="checkbox"
            value={config.hash !== false}
            onChange={(v) => updateConfig("hash", v)}
          />
          <ConfigField
            label="Auto Slide (seconds, 0 = disabled)"
            type="number"
            value={config.autoSlide || 0}
            onChange={(v) => updateConfig("autoSlide", parseInt(v))}
          />
        </ConfigSection>

        {/* Transitions */}
        <ConfigSection
          title="Transitions"
          expanded={expandedSections.transitions}
          onToggle={() => toggleSection("transitions")}
        >
          <ConfigField
            label="Default Transition"
            type="select"
            value={config.transition || "slide"}
            options={["none", "fade", "slide", "convex", "concave", "zoom"]}
            onChange={(v) => updateConfig("transition", v)}
          />
          <ConfigField
            label="Transition Speed"
            type="select"
            value={config.transitionSpeed || "default"}
            options={["default", "fast", "slow"]}
            onChange={(v) => updateConfig("transitionSpeed", v)}
          />
          <ConfigField
            label="Background Transition"
            type="select"
            value={config.backgroundTransition || "fade"}
            options={["fade", "slide", "convex", "concave", "zoom"]}
            onChange={(v) => updateConfig("backgroundTransition", v)}
          />
        </ConfigSection>

        {/* Plugins */}
        <ConfigSection
          title="Plugins"
          expanded={expandedSections.plugins}
          onToggle={() => toggleSection("plugins")}
        >
          {[
            "markdown",
            "highlight",
            "math",
            "notes",
            "search",
            "zoom",
            "chart",
            "menu",
            "chalkboard",
          ].map((plugin) => (
            <div key={plugin} className="flex items-center justify-between py-2">
              <label className="text-sm font-medium text-slate-700 capitalize">
                {plugin}
              </label>
              <input
                type="checkbox"
                checked={config.plugins?.[plugin] || false}
                onChange={() => togglePlugin(plugin)}
                className="w-4 h-4"
              />
            </div>
          ))}
        </ConfigSection>
      </div>
    </motion.div>
  );
}

function ConfigSection({ title, expanded, onToggle, children }) {
  return (
    <div className="border border-slate-200 rounded-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors"
      >
        <span className="font-semibold text-slate-900">{title}</span>
        {expanded ? (
          <FiChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>
      {expanded && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
}

function ConfigField({ label, type, value, onChange, options, step }) {
  if (type === "checkbox") {
    return (
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4"
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
