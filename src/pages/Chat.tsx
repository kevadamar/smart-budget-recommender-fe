import { Navbar } from "@/components/Navbar";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { BudgetPreview } from "@/components/BudgetPreview";

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[500px] mx-auto pt-16">
        <BudgetPlanner />
        <BudgetPreview />
      </div>
    </div>
  );
};

export default Chat;
