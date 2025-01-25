"use client";

import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";

const UserMenu = () => {
  return (<ClerkProvider>
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Organizations"
          labelIcon={<ChartNoAxesGantt size={15} />}
          href="/onboarding"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
    </ClerkProvider>
  );
};

export default UserMenu;