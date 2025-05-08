"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const auditCategories = [
  {
    id: "technical",
    name: "Technical SEO",
    items: [
      { id: "crawlability", name: "Site Crawlability", description: "Check if search engines can crawl the site" },
      { id: "indexability", name: "Indexability", description: "Verify pages are being indexed properly" },
      { id: "site-speed", name: "Site Speed", description: "Analyze page load times" },
      { id: "mobile-friendly", name: "Mobile Friendliness", description: "Test mobile responsiveness" },
      { id: "https", name: "HTTPS Security", description: "Verify secure connection" },
      { id: "robots", name: "Robots.txt", description: "Check robots.txt configuration" },
      { id: "sitemap", name: "XML Sitemap", description: "Verify sitemap exists and is properly formatted" },
      { id: "structured-data", name: "Structured Data", description: "Check for proper schema markup" },
    ],
  },
  {
    id: "on-page",
    name: "On-Page SEO",
    items: [
      { id: "title-tags", name: "Title Tags", description: "Analyze title tag optimization" },
      { id: "meta-descriptions", name: "Meta Descriptions", description: "Review meta description quality" },
      { id: "headings", name: "Heading Structure", description: "Check H1, H2, H3 usage" },
      { id: "content-quality", name: "Content Quality", description: "Assess content relevance and depth" },
      { id: "image-optimization", name: "Image Optimization", description: "Check alt tags and image sizes" },
      { id: "internal-linking", name: "Internal Linking", description: "Analyze internal link structure" },
      { id: "url-structure", name: "URL Structure", description: "Review URL format and readability" },
      { id: "keyword-usage", name: "Keyword Usage", description: "Analyze keyword placement and density" },
    ],
  },
  {
    id: "off-page",
    name: "Off-Page SEO",
    items: [
      { id: "backlink-profile", name: "Backlink Profile", description: "Analyze quantity and quality of backlinks" },
      { id: "referring-domains", name: "Referring Domains", description: "Check diversity of referring domains" },
      { id: "competitor-backlinks", name: "Competitor Backlinks", description: "Compare backlinks with competitors" },
      { id: "social-signals", name: "Social Signals", description: "Assess social media presence and engagement" },
      { id: "brand-mentions", name: "Brand Mentions", description: "Track unlinked brand mentions" },
      { id: "local-citations", name: "Local Citations", description: "Check NAP consistency across directories" },
    ],
  },
  {
    id: "competitive",
    name: "Competitive Analysis",
    items: [
      { id: "competitor-keywords", name: "Competitor Keywords", description: "Identify competitor target keywords" },
      { id: "competitor-content", name: "Competitor Content", description: "Analyze competitor content strategy" },
      { id: "competitor-authority", name: "Competitor Authority", description: "Compare domain authority" },
      { id: "market-gaps", name: "Market Gaps", description: "Identify opportunities in the market" },
    ],
  },
]

export function SEOAuditChecklist({ projectId }) {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("technical")
  const [findings, setFindings] = useState<Record<string, string>>({})
  const [recommendations, setRecommendations] = useState<Record<string, string>>({})
  const [priority, setPriority] = useState<Record<string, string>>({})

  const totalItems = auditCategories.reduce((acc, category) => acc + category.items.length, 0)
  const progress = Math.round((completedItems.length / totalItems) * 100)

  const handleToggleItem = (itemId: string) => {
    if (completedItems.includes(itemId)) {
      setCompletedItems(completedItems.filter((id) => id !== itemId))
    } else {
      setCompletedItems([...completedItems, itemId])
    }
  }

  const handleFindingsChange = (itemId: string, value: string) => {
    setFindings({ ...findings, [itemId]: value })
  }

  const handleRecommendationsChange = (itemId: string, value: string) => {
    setRecommendations({ ...recommendations, [itemId]: value })
  }

  const handlePriorityChange = (itemId: string, value: string) => {
    setPriority({ ...priority, [itemId]: value })
  }

  const handleSaveAudit = () => {
    console.log("Saving SEO audit:", {
      projectId,
      completedItems,
      findings,
      recommendations,
      priority,
    })
    // In a real app, you would save this data to your database
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Audit Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {auditCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {auditCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.name} Audit</CardTitle>
                <CardDescription>
                  Complete the {category.name.toLowerCase()} audit checklist for this website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.items.map((item) => (
                    <div key={item.id} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id={item.id}
                          checked={completedItems.includes(item.id)}
                          onCheckedChange={() => handleToggleItem(item.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={item.id} className="text-base font-medium">
                            {item.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`findings-${item.id}`}>Findings</Label>
                          <Textarea
                            id={`findings-${item.id}`}
                            placeholder="Enter audit findings..."
                            value={findings[item.id] || ""}
                            onChange={(e) => handleFindingsChange(item.id, e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`recommendations-${item.id}`}>Recommendations</Label>
                          <Textarea
                            id={`recommendations-${item.id}`}
                            placeholder="Enter recommendations..."
                            value={recommendations[item.id] || ""}
                            onChange={(e) => handleRecommendationsChange(item.id, e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`priority-${item.id}`}>Priority</Label>
                        <select
                          id={`priority-${item.id}`}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={priority[item.id] || ""}
                          onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                        >
                          <option value="">Select priority</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveAudit}>Save Audit Results</Button>
      </div>
    </div>
  )
}
