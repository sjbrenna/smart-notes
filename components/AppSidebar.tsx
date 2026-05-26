import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

async function AppSidebar() {
  const user = await getUser();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-2 mb-2 text-lg">
            {user ? (
              "Your Notes"
            ) : (
              <p>
                <Link href="/login" className="underline">
                  Log in
                </Link>{" "}
                to see your notes
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupContent />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
