import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { TRIP_TO_TREES_CONFIG } from "@/lib/tripToTrees";

interface Props {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabledValue?: string;
}

export function LocationSelect({ id, value, onChange, placeholder = "Search a city", disabledValue }: Props) {
  const [open, setOpen] = useState(false);
  const selected = TRIP_TO_TREES_CONFIG.locations.find((l) => l.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-card font-normal",
            !selected && "text-muted-foreground",
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <span className="truncate">{selected ? selected.label : placeholder}</span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search locations..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {TRIP_TO_TREES_CONFIG.locations
                .filter((l) => l.value !== disabledValue)
                .map((l) => (
                  <CommandItem
                    key={l.value}
                    value={l.label}
                    onSelect={() => {
                      onChange(l.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === l.value ? "opacity-100" : "opacity-0")}
                    />
                    {l.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
