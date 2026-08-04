"use client";

import { CookieHelper } from "@/helper/cookie.helper";
import {
  DotIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Settings,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { APP_CONFIG } from "@/config/app.config";

interface NavItem {
  icon: any;
  label: string;
  href: string;
  type?: "client" | "admin" | "candidate";
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboardIcon,
    label: "Clients",
    href: "/clients/admin/list",
    type: "admin",
  },
  {
    icon: UserIcon,
    label: "Candidates",
    href: "/candidates",
    type: "admin",
  },

  {
    icon: Settings,
    label: "Platform settings",
    href: "/dashboard/platform-settings",
    type: "admin",
  },
  {
    icon: DotIcon,
    label: "More",
    href: "/dashboard/more",
    type: "admin",
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
  const handleLogout = () => {
    CookieHelper.destroy({ key: "accessToken" });
    router.push("/login");
  };
  return (
    <div className="h-screen  ">
      {/* Sidebar container */}
      <div
        className={`
          ${
            isOpen
              ? "z-50 h-full w-full overflow-hidden absolute top-0 left-0"
              : "h-full"
          }
          flex flex-col
          min-h-[calc(100vh-100px)] 
          w-full
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          p-3 lg:p-4 overflow-y-auto transition-all duration-300
         
        `}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between  mb-4">
          <Link
            href={"/"}
            className={` flex items-center transition-all duration-300 $`}
          >
            <h2 className="text-primaryColor text-3xl font-semibold tracking-wide">
              {APP_CONFIG.app.siteName}
            </h2>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1">
          <div className="space-y-2">
            {navItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                    hover:text-whiteColor hover:bg-whiteColor text-blackColor transition-all duration-200
                    ${active ? "bg-white opacity-100 text-blackColor" : ""}
                   
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                      <item.icon
                        className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${
                          active ? "opacity-100" : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap `}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Log out section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className={`
              flex items-center hover:bg-redColor hover:text-whiteColor  cursor-pointer gap-3 px-3 py-3 
               w-full rounded-lg transition-all duration-200
             
            `}
            title={isCollapsed ? "Log Out Account" : ""}
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0">
              <LogOutIcon />
            </div>
            <span className={`text-base font-normal  whitespace-nowrap `}>
              Log Out Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
