import {
  Briefcase,
  Building2,
  GraduationCap,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  school: GraduationCap,
  briefcase: Briefcase,
  building: Building2,
  cart: ShoppingCart,
};

export function ProjectIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Briefcase;
  return <Icon size={size} />;
}
