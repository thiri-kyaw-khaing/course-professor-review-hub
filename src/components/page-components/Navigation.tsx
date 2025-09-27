import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";
import { use } from "react";
import { useLocation } from "react-router";
interface NavigationProps {
  // Define any props if needed
  items?: MainNavItem[];
}
export default function Navigation({ items }: NavigationProps) {
  const location = useLocation();
  return (
    <>
      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {items?.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={item.href || "#"}
                    className={cn(
                      "px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-[#8B0000] text-white"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
