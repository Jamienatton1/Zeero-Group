import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendCardsTab from "@/components/giftcards/SendCardsTab";
import OrdersTab from "@/components/giftcards/OrdersTab";
import CardDesignsTab from "@/components/giftcards/CardDesignsTab";
import GiftCardSettingsTab from "@/components/giftcards/GiftCardSettingsTab";

const GiftCards = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Gift Cards" subtitle="Send trees as a gift — one recipient or thousands" />

        <main className="flex-1 overflow-auto p-8">
          <Tabs defaultValue="send">
            <TabsList className="mb-6">
              <TabsTrigger value="send">Send cards</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="designs">Card designs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <SendCardsTab />
            </TabsContent>
            <TabsContent value="orders">
              <OrdersTab />
            </TabsContent>
            <TabsContent value="designs">
              <CardDesignsTab />
            </TabsContent>
            <TabsContent value="settings">
              <GiftCardSettingsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default GiftCards;
