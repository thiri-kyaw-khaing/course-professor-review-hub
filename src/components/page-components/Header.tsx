import { siteConfig } from "@/config/site";
import Navigation from "./Navigation";
import ProfileAvatar from "./profileAvatar";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className=" w-full border-b fixed z-50 bg-background">
      <nav className="container mx-auto flex items-center h-16 w-full max-w-screen-xl">
        <div className="flex items-center gap-2">
          <img src={siteConfig.logo} alt="Logo" className="h-8 gap-2" />
          <div className="text-lg font-semibold">{siteConfig.name}</div>
        </div>
        <div className="ml-auto">
          <Navigation items={siteConfig.mainNav} />
          <MobileNav items={siteConfig.mainNav} />
        </div>
        <div className="ml-4">
          <ProfileAvatar />
        </div>
      </nav>
    </header>
    //      <nav className="container mx-auto flex items-center h-16 w-full max-w-screen-xl">
    //   <Navigation items={siteConfig.mainNav} />
    //   <MobileNav items={siteConfig.mainNav} />
    //   <div className="flex flex-1 justify-end mr-8 lg:mr-12 gap-4">
    //     <CartSheet />
    //     <ModeToggle />
    //     <AuthDropDown user={User} />
    //   </div>
    // </nav>
  );
}
