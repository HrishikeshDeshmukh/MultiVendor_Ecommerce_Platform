import connectDb from '@/lib/connectDB';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import User from '@/app/model/user.model';

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { shopName, shopAddress, gstNumber } = await req.json()
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = await User.findOneAndUpdate({ email: session?.user?.email },
            {
                shopName,
                shopAddress,
                gstNumber,
                verificationStatus: 'pending',
                requestAt: new Date()

            }, { new: true })

        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Details updated successfully", user })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}