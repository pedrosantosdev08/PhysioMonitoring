import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarUser() {
  return (
    <Avatar size="lg">
      <AvatarImage
        src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMzEzNS8zMTM1NzE1LnBuZw==&ts=1780321700&sig=0843b614c8bb3823c8ce5e47cb04d16923d8871adc360a3ecab15b554297d212" 
        alt="@shadcn"
        className="grayscale w-xl h-xl rounded-full"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
