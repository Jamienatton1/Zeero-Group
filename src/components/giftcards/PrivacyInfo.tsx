import { useState } from "react";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PrivacyInfoProps {
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

/**
 * Accessible info icon: opens on hover, click/tap and keyboard focus.
 * Dismissible with Escape, ~320px wide and collision aware.
 */
export const PrivacyInfo = ({ className, side = "top", align = "end" }: PrivacyInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Data and privacy information"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className,
          )}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        collisionPadding={16}
        className="w-80 space-y-2 text-xs leading-relaxed text-muted-foreground"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <p>
          We do not store recipient email addresses or names, and we will not send anything other than
          the greeting card. The list is uploaded to our mailing software to send the emails and the
          local data is then deleted in line with GDPR. Our mailing provider is SOC 2 accredited.
        </p>
        <p>
          Prefer to use your own email system and designs? We can supply tree codes to add to your own
          gift cards — contact{" "}
          <a
            href="mailto:gifts@zeerogroup.com"
            className="font-medium text-primary underline underline-offset-2"
          >
            gifts@zeerogroup.com
          </a>
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default PrivacyInfo;
