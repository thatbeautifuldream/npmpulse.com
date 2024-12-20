"use client"

import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"

interface PackageReadmeProps {
  content: string
}

export function PackageReadme({ content }: PackageReadmeProps) {
  return (
    <Card className="p-6">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  )
}

