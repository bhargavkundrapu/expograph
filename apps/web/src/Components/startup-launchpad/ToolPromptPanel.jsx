import { TOOL_AI_PROMPTS } from "./launchpadConfig";
import PlaceholderPromptPanel from "./PlaceholderPromptPanel";

export default function ToolPromptPanel({ toolId, defaultOpen = true }) {
  const def = toolId ? TOOL_AI_PROMPTS[toolId] : null;
  if (!def) return null;
  return (
    <PlaceholderPromptPanel
      definitionKey={toolId}
      definition={def}
      defaultOpen={defaultOpen}
      compact
      subtitle="Matches this tool’s checklist-fill fields, copy into ChatGPT"
    />
  );
}
