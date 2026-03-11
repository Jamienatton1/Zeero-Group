import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OperationsDashboard } from "@/components/operations/OperationsDashboard";
import { OperationsOrganisations } from "@/components/operations/OperationsOrganisations";

const Operations = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Internal admin panel — product usage, organisations & activity</p>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="organisations">Organisations</TabsTrigger>
              <TabsTrigger value="users" disabled className="opacity-40">Users</TabsTrigger>
              <TabsTrigger value="revenue" disabled className="opacity-40">Revenue</TabsTrigger>
              <TabsTrigger value="notifications" disabled className="opacity-40">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <OperationsDashboard />
            </TabsContent>

            <TabsContent value="organisations">
              <OperationsOrganisations />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Operations;
