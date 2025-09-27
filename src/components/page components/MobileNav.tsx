import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";
import { MenuIcon } from "lucide-react";
interface MobileNavProps {
  items?: MainNavItem[];
}
export default function MobileNav({ items }: MobileNavProps) {
  return (
    <>
      <div className="lg:hidden flex">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              {items?.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-md font-medium transition-colors pl-4",
                    "hover:text-red-700"
                  )}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
