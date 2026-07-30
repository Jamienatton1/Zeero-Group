import { useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/operations/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OperationsDashboard } from "@/components/operations/OperationsDashboard";
import { OperationsOrganisations } from "@/components/operations/OperationsOrganisations";
import { OperationsUsers } from "@/components/operations/OperationsUsers";
import { OperationsRevenue } from "@/components/operations/OperationsRevenue";
import { OperationsNotifications } from "@/components/operations/OperationsNotifications";

const Operations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "dashboard";

  return (
    <AdminLayout
      title="Operations Dashboard"
      subtitle="Internal admin panel — product usage, organisations & activity"
    >
      <Tabs value={tab} onValueChange={(v) => setSearchParams({ tab: v })} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="organisations">Organisations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <OperationsDashboard />
        </TabsContent>

        <TabsContent value="organisations">
          <OperationsOrganisations />
        </TabsContent>

        <TabsContent value="users">
          <OperationsUsers />
        </TabsContent>

        <TabsContent value="revenue">
          <OperationsRevenue />
        </TabsContent>

        <TabsContent value="notifications">
          <OperationsNotifications />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Operations;
