import { ClerkProvider, UserButton} from "@clerk/nextjs";
import Image from "next/image";
import { Component } from "react";
export default function Home() {
  return (
  <div>
      Home
      <UserButton />
  </div>);
}
