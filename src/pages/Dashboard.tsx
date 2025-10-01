import { Navbar } from "@/components/Navbar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { SpendingChart } from "@/components/SpendingChart";
import { FutureRecommendations } from "@/components/FutureRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[500px] mx-auto pt-20 px-6 pb-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="future">Future Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
            <SpendingChart />
          </TabsContent>

          <TabsContent value="future">
            <FutureRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;