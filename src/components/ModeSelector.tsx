import { MessageSquare, PenLine } from "lucide-react";

interface ModeSelectorProps {
  mode: "chat" | "manual";
  onModeChange: (mode: "chat" | "manual") => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex gap-2 p-1 glass-card rounded-lg">
      <button
        onClick={() => onModeChange("chat")}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
          mode === "chat"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        <span className="font-medium">AI Chat</span>
      </button>
      <button
        onClick={() => onModeChange("manual")}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
          mode === "manual"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <PenLine className="w-4 h-4" />
        <span className="font-medium">Manual Input</span>
      </button>
    </div>
  );
};
