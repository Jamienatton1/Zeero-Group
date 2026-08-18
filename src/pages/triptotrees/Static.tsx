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
    confirmPassword: "",
  });

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();

  return (
    <T2TLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal details and password for Trip to Trees.
          </p>
        </div>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-semibold text-brand-foreground">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="truncate text-sm text-muted-foreground">{formData.email}</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:ml-auto">
              Travel advisor
            </span>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border py-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Personal details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                Email
              </Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange("email")} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">
                First name
              </Label>
              <Input id="firstName" value={formData.firstName} onChange={handleChange("firstName")} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">
                Last name
              </Label>
              <Input id="lastName" value={formData.lastName} onChange={handleChange("lastName")} className="h-10" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border py-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Change password
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                New password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">
                Confirm new password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className="h-10"
              />
            </div>
            <p className="text-xs text-muted-foreground sm:col-span-2">
              Leave blank if you do not want to change your password.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            className="border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            Delete account
          </Button>
          <Button className="sm:min-w-[160px]">Save changes</Button>
        </div>
      </div>
    </T2TLayout>
  );
}

