import { useState } from "react";
import { ModeSelector } from "./ModeSelector";
import { ChatInterface } from "./ChatInterface";
import { ManualInput } from "./ManualInput";

export const BudgetPlanner = () => {
  const [mode, setMode] = useState<"chat" | "manual">("chat");

  return (
    <section className="px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Plan Your Budget</h2>
        <p className="text-muted-foreground">Choose how you want to create your budget</p>
      </div>

      <ModeSelector mode={mode} onModeChange={setMode} />

      <div className="animate-fade-in">
        {mode === "chat" ? <ChatInterface /> : <ManualInput />}
      </div>
    </section>
  );
};
