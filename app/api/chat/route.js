import { NextResponse } from "next/server";
export const runtime = 'experimental-edge';
export async function POST(request) {
   try {
      const [val] = new URLSearchParams(request.nextUrl.search);
      if (!val) {
         throw new Error("No prompt provided");
      }
      const prompt = val[1];
      if (val[0] !== "prompt") {
         throw new Error("No prompt provided");
      }
      if (!prompt) {
         throw new Error("No prompt Value");
      }

      return NextResponse.json([
         ...(await openAI(prompt)),
      ]);
   } catch (error) {
      return NextResponse.json({
         err: true,
         msg: error.message,
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
      const data = d.split("\n");
      let result = []
      data.forEach(d => {
         result.push(JSON.parse(d))
      })
      return result;
   } catch (err) {
      throw new Error("Something error ...");
   }
}
