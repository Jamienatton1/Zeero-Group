import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, Plus, Minus, Coffee, Utensils, Wine, Copy, Eye, ChevronDown, ChevronUp, Check, Trash2 } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { toast } from "sonner";


interface FoodDrinkData {
  [date: string]: {
    meals: {
      [mealType: string]: {
        [category: string]: number;
      };
    };
    drinks: {
      [drinkType: string]: number;
    };
  };
}

const FoodDrink = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state?.eventData || {};
  
  const [foodDrinkData, setFoodDrinkData] = useState<FoodDrinkData>({});
  const [selectedDate, setSelectedDate] = useState<string>("2024-08-20");
  const [activeTab, setActiveTab] = useState("overview");
  const [beveragesExpanded, setBeveragesExpanded] = useState(false);

  // Sample event dates - in real app, this would come from eventData
  const eventDates = ["2024-08-20", "2024-08-21", "2024-08-22", "2024-08-23", "2024-08-24", "2024-08-25", "2024-08-26"];

  // Mock per-day data-entry status for the indicator pills (visual only)
  const mockDayStatus: Record<string, { meals: boolean; bev: boolean }> = {
    "2024-08-20": { meals: true, bev: false },
    "2024-08-21": { meals: true, bev: false },
    "2024-08-22": { meals: false, bev: false },
    "2024-08-23": { meals: false, bev: false },
    "2024-08-24": { meals: false, bev: false },
    "2024-08-25": { meals: false, bev: false },
    "2024-08-26": { meals: false, bev: false },
  };

  const getGridCols = (n: number) => {
    if (n <= 5) return n;
    if (n === 6) return 3;
    if (n === 8) return 4;
    return 5; // 7, 9, 10, 11+
  };

  const DaySelector = () => {
    const cols = getGridCols(eventDates.length);
    return (
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {eventDates.map(date => {
          const status = mockDayStatus[date] ?? { meals: false, bev: false };
          const d = new Date(date);
          const label = d.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });
          const isActive = date === selectedDate;

          const StatusDot = ({ label, done }: { label: string; done: boolean }) => (
            <span className="inline-flex items-center gap-1 bg-muted/60 rounded-full px-1.5 py-0.5">
              {done ? (
                <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block" />
              ) : (
                <span className="h-2 w-2 rounded-full border border-muted-foreground/40 bg-background inline-block" />
              )}
              <span className="text-[10px] font-medium text-muted-foreground">
                {label}
              </span>
            </span>
          );

          return (
            <button
              key={date}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={`flex items-center justify-between gap-2 rounded-md border h-8 px-2 transition-colors ${
                isActive
                  ? "border-emerald-700 border-2 bg-emerald-50"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-emerald-900" : "text-foreground"
                }`}
              >
                {label}
              </span>
              <div className="flex items-center gap-2">
                <StatusDot label="Meals" done={status.meals} />
                <StatusDot label="Bev" done={status.bev} />
              </div>
            </button>
          );
        })}
      </div>
    );
  };


  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Coffee Break"];
  const foodCategories = ["Poultry", "Red Meat", "Seafood", "Vegan", "Vegetarian", "Mixed Buffet", "Snacks"];
  const drinkTypes = ["Still Water", "Tap Water", "Tea/Coffee", "Wine", "Beer", "Cocktails", "Soft Drinks"];

  const updateMealData = (date: string, mealType: string, category: string, value: number) => {
    setFoodDrinkData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        meals: {
          ...prev[date]?.meals,
          [mealType]: {
            ...prev[date]?.meals?.[mealType],
            [category]: Math.max(0, value)
          }
        }
      }
    }));
  };

  const updateDrinkData = (date: string, drinkType: string, value: number) => {
    setFoodDrinkData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        drinks: {
          ...prev[date]?.drinks,
          [drinkType]: Math.max(0, value)
        }
      }
    }));
  };

  const getMealTotal = (date: string, mealType: string) => {
    const meals = foodDrinkData[date]?.meals?.[mealType] || {};
    return Object.values(meals).reduce((sum, val) => sum + val, 0);
  };

  const getDrinkTotal = (date: string) => {
    const drinks = foodDrinkData[date]?.drinks || {};
    return Object.values(drinks).reduce((sum, val) => sum + val, 0);
  };

  const getAllMealsTotal = (date: string) => {
    const dayData = foodDrinkData[date];
    if (!dayData?.meals) return 0;
    return Object.values(dayData.meals).reduce((sum, mealType) => {
      return sum + Object.values(mealType).reduce((mealSum, val) => mealSum + val, 0);
    }, 0);
  };

  const formatDayLabel = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  const copyFromDay = (kind: "meals" | "drinks", fromDate: string) => {
    if (!fromDate || fromDate === selectedDate) return;
    const source = foodDrinkData[fromDate];
    const label = formatDayLabel(fromDate);
    if (!source || !source[kind] || Object.keys(source[kind]).length === 0) {
      toast(`No ${kind} data on ${label} to copy`);
      return;
    }
    setFoodDrinkData(prev => ({
      ...prev,
      [selectedDate]: {
        meals: kind === "meals" ? JSON.parse(JSON.stringify(source.meals || {})) : (prev[selectedDate]?.meals || {}),
        drinks: kind === "drinks" ? JSON.parse(JSON.stringify(source.drinks || {})) : (prev[selectedDate]?.drinks || {}),
      },
    }));
    toast.success(`Copied ${kind} from ${label}`);
  };

  const CopyFromPrevLink = ({ kind }: { kind: "meals" | "drinks" }) => {
    const otherDates = eventDates.filter(d => d !== selectedDate);
    if (otherDates.length === 0) return null;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background text-xs text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy from previous day
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-popover z-50">
          {otherDates.map(d => (
            <DropdownMenuItem key={d} onClick={() => copyFromDay(kind, d)}>
              {formatDayLabel(d)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };







  const clearValues = () => {
    if (!selectedDate) return;
    setFoodDrinkData(prev => ({
      ...prev,
      [selectedDate]: {
        meals: {},
        drinks: {}
      }
    }));
  };

  const setAllMeals = (value: number) => {
    if (!selectedDate) return;
    const newMeals: any = {};
    mealTypes.forEach(mealType => {
      newMeals[mealType] = {};
      foodCategories.forEach(category => {
        newMeals[mealType][category] = value;
      });
    });
    setFoodDrinkData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        meals: newMeals
      }
    }));
  };

  const setAllDrinks = (value: number) => {
    if (!selectedDate) return;
    const newDrinks: any = {};
    drinkTypes.forEach(drinkType => {
      newDrinks[drinkType] = value;
    });
    setFoodDrinkData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        drinks: newDrinks
      }
    }));
  };

  const getMealIcon = (mealType: string) => {
    switch(mealType) {
      case "Breakfast": return <Coffee className="h-4 w-4" />;
      case "Lunch": return <Utensils className="h-4 w-4" />;
      case "Dinner": return <Wine className="h-4 w-4" />;
      case "Coffee Break": return <Coffee className="h-4 w-4" />;
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Food & Beverage</h1>
                  <p className="text-muted-foreground">
                    Track meals and drinks for your event: {eventData.name || "Event Name"}
                  </p>
                </div>
              </div>

              {/* Event Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Physical Attendees:</span>
                      <Badge variant="secondary">{eventData.physicalAttendees || 100}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Virtual Attendees:</span>
                      <Badge variant="secondary">{eventData.virtualAttendees || 50}</Badge>
                    </div>  
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Staff:</span>
                      <Badge variant="secondary">{eventData.staff || 10}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content with Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="meals" className="flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Meals
                  </TabsTrigger>
                  <TabsTrigger value="beverages" className="flex items-center gap-2">
                    <Wine className="h-4 w-4" />
                    Beverages
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Food & Beverage Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Meals Overview Table */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Utensils className="h-5 w-5" />
                            Meals
                          </h3>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="font-semibold">Date</TableHead>
                                  {foodCategories.map(category => (
                                    <TableHead key={category} className="text-center font-semibold min-w-[80px]">
                                      {category}
                                    </TableHead>
                                  ))}
                                  <TableHead className="text-center font-semibold bg-muted">Total Meals</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {eventDates.map(date => (
                                  <TableRow key={date}>
                                    <TableCell className="font-medium">
                                      {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'short',
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </TableCell>
                                    {foodCategories.map(category => {
                                      const total = mealTypes.reduce((sum, mealType) => {
                                        return sum + (foodDrinkData[date]?.meals?.[mealType]?.[category] || 0);
                                      }, 0);
                                      return (
                                        <TableCell key={category} className="text-center">
                                          {total || 0}
                                        </TableCell>
                                      );
                                    })}
                                    <TableCell className="text-center font-semibold bg-muted">
                                      {getAllMealsTotal(date)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <Separator />

                        {/* Drinks Overview Table */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Wine className="h-5 w-5" />
                            Beverages
                          </h3>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="font-semibold">Date</TableHead>
                                  {drinkTypes.map(drinkType => (
                                    <TableHead key={drinkType} className="text-center font-semibold min-w-[80px]">
                                      {drinkType}
                                    </TableHead>
                                  ))}
                                  <TableHead className="text-center font-semibold bg-muted">Total Drinks</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {eventDates.map(date => (
                                  <TableRow key={date}>
                                    <TableCell className="font-medium">
                                      {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'short',
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </TableCell>
                                    {drinkTypes.map(drinkType => (
                                      <TableCell key={drinkType} className="text-center">
                                        {foodDrinkData[date]?.drinks?.[drinkType] || 0}
                                      </TableCell>
                                    ))}
                                    <TableCell className="text-center font-semibold bg-muted">
                                      {getDrinkTotal(date)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Meals Tab */}
                <TabsContent value="meals" className="mt-6">
                  <div className="space-y-6">
                    {/* Date Selection and Controls */}
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <DaySelector />
                        <CopyFromPrevLink kind="meals" />
                      </CardContent>
                    </Card>

                    {/* Meal Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mealTypes.map(mealType => (
                        <Card key={mealType} className="relative">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                {getMealIcon(mealType)}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{mealType}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Total: {getMealTotal(selectedDate, mealType)} meals
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                              {foodCategories.map(category => (
                                <div key={category} className="space-y-2">
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    {category}
                                  </Label>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => updateMealData(selectedDate, mealType, category, 
                                        (foodDrinkData[selectedDate]?.meals?.[mealType]?.[category] || 0) - 1)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <Input
                                      type="number"
                                      value={foodDrinkData[selectedDate]?.meals?.[mealType]?.[category] || 0}
                                      onChange={(e) => updateMealData(selectedDate, mealType, category, 
                                        parseInt(e.target.value) || 0)}
                                      className="h-8 text-center text-xs"
                                      min="0"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => updateMealData(selectedDate, mealType, category, 
                                        (foodDrinkData[selectedDate]?.meals?.[mealType]?.[category] || 0) + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Beverages Tab */}
                <TabsContent value="beverages" className="mt-6">
                  <div className="space-y-6">
                    {/* Date Selection and Controls */}
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <DaySelector />
                        <CopyFromPrevLink kind="drinks" />
                      </CardContent>
                    </Card>

                    <Collapsible open={beveragesExpanded} onOpenChange={setBeveragesExpanded}>

                      <CollapsibleTrigger asChild>
                        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Wine className="h-5 w-5" />
                                <div>
                                   <h3 className="font-semibold">Beverages – {new Date(selectedDate).toLocaleDateString('en-US', { 
                                     weekday: 'long',
                                     month: 'long', 
                                     day: 'numeric' 
                                   })}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Total: {getDrinkTotal(selectedDate)} drinks
                                  </p>
                                </div>
                              </div>
                              {beveragesExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </div>
                          </CardContent>
                        </Card>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <Card className="mt-4">
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                              {drinkTypes.map(drinkType => (
                                <div key={drinkType} className="space-y-2">
                                  <Label className="text-xs font-medium text-muted-foreground">
                                    {drinkType}
                                  </Label>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => updateDrinkData(selectedDate, drinkType, 
                                        (foodDrinkData[selectedDate]?.drinks?.[drinkType] || 0) - 1)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <Input
                                      type="number"
                                      value={foodDrinkData[selectedDate]?.drinks?.[drinkType] || 0}
                                      onChange={(e) => updateDrinkData(selectedDate, drinkType, 
                                        parseInt(e.target.value) || 0)}
                                      className="h-8 text-center"
                                      min="0"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => updateDrinkData(selectedDate, drinkType, 
                                        (foodDrinkData[selectedDate]?.drinks?.[drinkType] || 0) + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Sticky Summary Footer */}
              {(activeTab === "meals" || activeTab === "beverages") && (
                <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border p-4 z-50">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        <span className="font-medium">Total Meals:</span>
                        <Badge variant="secondary">{getAllMealsTotal(selectedDate)}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wine className="h-4 w-4" />
                        <span className="font-medium">Total Drinks:</span>
                        <Badge variant="secondary">{getDrinkTotal(selectedDate)}</Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Previous
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={() => {
                    console.log("Food & Drink data:", foodDrinkData);
                    
                    // Get the remaining categories to navigate through
                    const categoryOrder = ["venue", "food", "travel", "accommodations", "promotion"];
                    const { selectedCategories = [] } = location.state || {};
                    const currentIndex = categoryOrder.indexOf("food");
                    
                    // Find next selected category
                    for (let i = currentIndex + 1; i < categoryOrder.length; i++) {
                      if (selectedCategories.includes(categoryOrder[i])) {
                        const nextCategory = categoryOrder[i];
                        if (nextCategory === "travel") navigate("/events/travel");
                        else if (nextCategory === "accommodations") navigate("/events/accommodations");
                        else if (nextCategory === "promotion") navigate("/events/promotion-items");
                        return;
                      }
                    }
                    
                    // If no more categories, go to questionnaire
                    navigate("/events/questionnaire");
                  }}>
                    Continue to Next Step
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FoodDrink;