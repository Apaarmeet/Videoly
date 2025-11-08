import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request: NextRequest){
    try{
       const {email,password} =  await request.json()

       if(!email || !password){
        return NextResponse.json(
            {error: "Email and Password are required"},
            {status: 400}
        )
       }

       await connectToDatabase()

      const existingUser = await User.findOne({email})
      if(existingUser){
        return NextResponse.json(
            {error: "User already registered"},
            {status: 400}
        )
      }

     await User.create({email,password})
     return NextResponse.json(
        {message: "User registered Successfully"},
        {status: 200}
        )

    } catch(error){
        console.error("Registeration error:", error)
        return NextResponse.json(
            {error: "failed register user"},
            {status: 400}
        )
    }
}