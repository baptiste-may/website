import type { AstroComponent } from "@lucide/astro";
import { BriefcaseBusiness, House, Info, PencilLine, Telescope } from "@lucide/astro";

export const drawerName = "navigation-drawer";

export type NavigationLink = {
  to: string;
  label: string;
  icon: AstroComponent;
  hideLabel?: boolean;
  positionLeft?: boolean;
};

export const navigationLinks: NavigationLink[] = [
  { to: "/", label: "Accueil", icon: House },
  { to: "/jobs", label: "Expériences", icon: BriefcaseBusiness },
  { to: "/projects", label: "Projets", icon: Telescope },
  { to: "/contact", label: "Contact", icon: PencilLine, positionLeft: true },
  { to: "/info", label: "Informations", icon: Info, hideLabel: true, positionLeft: true },
];
