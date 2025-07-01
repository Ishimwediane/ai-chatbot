import { NextRequest,NextResponse } from "next/server";
import axios from 'axios';
import { headers } from "next/headers";

export async function POST(req:NextRequest){
    const body = await req.json();

    try{
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model:'gpt-3.5-turbo',
                messages:body.messages,
            },
            {
                headers:{
                    'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type':'application/json',
                }
            }
        );

        const aiReply =response.data.choices[0].message;
        return NextResponse.json({reply:aiReply})
    }catch(error){
console.error('openAi error :',error);
return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
    };
    
}