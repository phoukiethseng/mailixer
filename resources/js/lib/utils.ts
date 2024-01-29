import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {htmlToText as convert} from "html-to-text";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function htmlToText(html: string): string {
    return convert(html);
}

export function getQRCodeImageHTML(name, qrCodeDataUrl): string {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body
    class="w-[400px] h-[500px] flex flex-col justify-start items-center"
  >
    <div class="w-full h-full bg-[#00B88F]">
      <div
        class="rounded-xl mt-5 bg-[#FFFFFF] w-full h-full flex flex-col justify-start items-center"
      >
        <h1
          class="font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00B88F] to-[#0092D2] text-4xl pt-5"
        >
          Mailixer
        </h1>

        <img
          class="object-center object-cover self-center my-5"
          src="${qrCodeDataUrl}"
        />

        <p class="text-slate-600 font-semibold text-lg">
          Subscribe to ${name}
        </p>
      </div>
    </div>
  </body>
</html>
`
}
