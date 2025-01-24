import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
    const {userId} = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where :{clerkUserId : userId},
    })

    if (!user) {
        throw new Error("User not found");
    }

    const organization = (await clerkClient()).organizations.getOrganization({
        slug,
    });

    if(!organization){
        return null;
    }

    const {data : membership} = 
    (await clerkClient()).organizations.getOrganizationMembershipList({
        organizationId:(await organization).id
    })

    const userMembership = membership.find(
        (member) => member.publicUserData.userId === userId
    )

    if (!userMembership) {
        return null;
    }
    return organization;
}