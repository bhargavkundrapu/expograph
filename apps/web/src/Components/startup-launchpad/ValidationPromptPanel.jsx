import { STAGE_VALIDATION_PROMPTS } from "./launchpadConfig";
import PlaceholderPromptPanel from "./PlaceholderPromptPanel";

export default function ValidationPromptPanel({ stageSlug }) {
  const def = stageSlug ? STAGE_VALIDATION_PROMPTS[stageSlug] : null;
  if (!def) return null;
  return <PlaceholderPromptPanel definitionKey={stageSlug} definition={def} defaultOpen />;
}
