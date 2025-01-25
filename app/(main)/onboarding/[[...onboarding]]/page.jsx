"use client"

import { OrganizationList, useOrganization } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding (){
    const {organization} = useOrganization();
    const router = useRouter();
    useEffect(()=>{
      if (organization?.slug) {
        router.push(`/organization/${organization.slug}`)
      }
    },[organization])
    return (
        <div className="flex justify-center items-center pt-14">
        <OrganizationList
          hidePersonal
          afterCreateOrganizationUrl="/orgs/:slug" 
          afterSelectOrganizationUrl="/orgs/:slug" 
        />
      </div>
    )
}