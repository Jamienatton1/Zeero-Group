import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendCardsTab from "@/components/giftcards/SendCardsTab";
import OrdersTab from "@/components/giftcards/OrdersTab";

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
            </TabsList>

            <TabsContent value="send">
              <SendCardsTab />
            </TabsContent>
            <TabsContent value="orders">
              <OrdersTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default GiftCards;
