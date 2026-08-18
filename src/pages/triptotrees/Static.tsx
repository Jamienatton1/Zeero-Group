import { useState } from "react";
import { T2TPlaceholder } from "@/components/triptotrees/T2TLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function TripToTreesScript() {
  return (
    <T2TPlaceholder
      title="Script"
      description="Suggested wording your team can use when talking to travellers about planting trees for their trip."
    />
  );
}

export function TripToTreesFaq() {
  return (
    <T2TPlaceholder
      title="FAQ"
      description="Answers to the questions travel advisors and travellers most often ask about tree planting and offsetting."
    />
  );
}

export function TripToTreesForestInfo() {
  return (
    <T2TPlaceholder
      title="Forest Info"
      description="Where our trees are planted, the species used, and the communities supported by each planting site."
    />
  );
}

export function TripToTreesAccount() {
  const [formData, setFormData] = useState({
    email: "test_giannis@trees4travel.com",
    firstName: "Giannis",
    lastName: "Par",
    password: "",
  });

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="space-y-8 p-8 sm:p-12">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              className="h-10 rounded-none border-0 border-b border-border bg-transparent px-0 text-sm shadow-none ring-0 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wide text-foreground">
              First Name
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              className="h-10 rounded-none border-0 border-b border-border bg-transparent px-0 text-sm shadow-none ring-0 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wide text-foreground">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              className="h-10 rounded-none border-0 border-b border-border bg-transparent px-0 text-sm shadow-none ring-0 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-foreground">
              Change Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange("password")}
              className="h-10 rounded-none border-0 border-b border-border bg-transparent px-0 text-sm shadow-none ring-0 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <Button className="h-11 w-full max-w-xs bg-foreground text-background hover:bg-foreground/90">
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="h-11 w-full max-w-xs border-foreground text-foreground hover:bg-foreground/5"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
