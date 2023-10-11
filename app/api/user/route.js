import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function POST(req, res){
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const result = await prisma.user.create({
            data: reqBody
        });
        await prisma.$disconnect(); // Disconnect from the database when done
        return NextResponse.json({ status: "Success", data: result });
    } catch (err) {
        console.error("Error:", err);
        await prisma.$disconnect();
        return NextResponse.json({status:'fail', error:err.message})
    }
}
