import { siteConfig } from "@/config/site";
import Navigation from "../Navigation";
import MobileNav from "../MobileNav";
import ProfileAvatar from "../profileAvatar";
import { currentUser } from "@/data";

export default function AdminHeader() {
  return (
    <div>
      <header className=" w-full border-b fixed z-50 bg-background">
        <nav className="container mx-auto flex items-center h-16 w-full max-w-screen-xl">
          <div className="flex items-center gap-2">
            <img src={siteConfig.logo} alt="Logo" className="h-8 gap-2" />
            <div className="text-lg font-semibold">{siteConfig.name}</div>
          </div>
          <div className="ml-auto">
            <Navigation items={siteConfig.adminMainNav} />
            <MobileNav items={siteConfig.adminMainNav} />
          </div>
          <div className="ml-4">
            <ProfileAvatar user={currentUser} />
          </div>
        </nav>
      </header>
    </div>
  );
}
