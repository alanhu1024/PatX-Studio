import { TalkToSalesPage } from "@/components"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talk to Sales - PatX Studio',
  description: 'Contact our sales team for PatX Studio - AI Patent Claim Charts',
  alternates: {
    canonical: 'https://patx.ai/talk-to-sales',
  },
};

export default function TalkToSales() {
  return <TalkToSalesPage />
}
