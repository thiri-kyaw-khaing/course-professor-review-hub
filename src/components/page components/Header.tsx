import { siteConfig } from "@/config/site";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className=" w-full border-b fixed z-50 bg-background">
      <nav className="container mx-auto flex items-center h-16 w-full max-w-screen-xl">
        <div className="text-lg font-semibold">{siteConfig.name}</div>
        <div className="ml-auto">
          <Navigation items={siteConfig.mainNav} />
        </div>
      </nav>
    </header>
  );
}
