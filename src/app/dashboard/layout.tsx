// app/dashboard/layout.tsx
import { AuthGuard } from "@/components/AuthGuard";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children } : Props) {
  return <><AuthGuard>{children}</AuthGuard></>;
;
}
