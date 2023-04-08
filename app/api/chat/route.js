import { NextResponse } from "next/server";

// export const runtime = 'experimental-edge';
// export const runtime = 'nodejs'
export const config = {
   bodyParser: true,
};
export async function POST(request) {
   try {
      const [val] = new URLSearchParams(request.nextUrl.search);
      if (!val) {
         return NextResponse.json({
            error: "No prompt provided",
         });
      }
      const prompt = val[1];
      if (val[0] !== "prompt") {
         return NextResponse.json({
            error: "No prompt provided",
         });
      }
      if (!prompt) {
         return NextResponse.json({
            error: "No prompt Value",
         });
      }

      return NextResponse.json({
         ...(await openAI(prompt)),
      });
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         error: error.message,
      });
   }
}

async function openAI(prompt) {
   try {
      const res = await fetch("https://chatbot.theb.ai/api/chat-process", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
         },
         body: JSON.stringify({
            prompt,
         }),
      });
      if (!res.ok) {
         throw new Error("Something error ...");
      }
      const d = await res.text();
      return d.split("\n");;
   } catch (err) {
      throw new Error("Something error ...");
   }
}
