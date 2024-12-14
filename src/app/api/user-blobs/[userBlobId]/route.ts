import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {userBlobId: string}}){
    try {
        const {userId} = auth();
        const {userBlobId} = params;
        
        const json = await request.json();
        console.log({json});

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }
        
        await del(json.url);
        
        const userBlob = await db.userBlob.delete({
            where: {
                id: userBlobId,
                userId,
                blobUrl: json.url,
            }
        })
        
        return NextResponse.json(userBlob);
    }
    catch (error) {
        console.log("[USER_BLOB_DELETION]", error)
		return new NextResponse("Internal Error", {status: 500})
    }
}