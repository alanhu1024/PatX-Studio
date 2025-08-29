"use client"

import { Navbar, Footer } from "@/components"
import TalkToSalesForm from "./TalkToSalesForm"

export default function TalkToSalesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-14">
        <div className="container mx-auto">
          <TalkToSalesForm isModal={false} />
        </div>
      </main>
      <Footer />
    </>
  )
}
