"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const pageTypes = [
  { id: "homepage", name: "Homepage" },
  { id: "service-pages", name: "Service Pages" },
  { id: "blog-posts", name: "Blog Posts" },
  { id: "product-pages", name: "Product Pages" },
  { id: "about-page", name: "About Page" },
  { id: "contact-page", name: "Contact Page" },
]

const optimizationItems = [
  { id: "title-tag", name: "Title Tag", description: "Optimize the page title with target keywords" },
  {
    id: "meta-description",
    name: "Meta Description",
    description: "Create compelling meta descriptions with keywords",
  },
  { id: "heading-tags", name: "Heading Tags", description: "Properly structure H1, H2, H3 tags with keywords" },
  { id: "content-optimization", name: "Content Optimization", description: "Optimize content with target keywords" },
  { id: "image-optimization", name: "Image Optimization", description: "Add alt text and optimize image filenames" },
  { id: "internal-linking", name: "Internal Linking", description: "Add relevant internal links" },
  { id: "url-structure", name: "URL Structure", description: "Create SEO-friendly URLs" },
  { id: "schema-markup", name: "Schema Markup", description: "Implement appropriate schema markup" },
]

export function OnPageOptimizationChecklist({ projectId }) {
  const [selectedPageType, setSelectedPageType] = useState("homepage")
  const [pages, setPages] = useState([
    {
      id: "1",
      pageType: "homepage",
      url: "https://example.com",
      targetKeywords: "web design, seo services, digital marketing",
      status: "in-progress",
      completedItems: ["title-tag", "meta-description"],
    },
    {
      id: "2",
      pageType: "service-pages",
      url: "https://example.com/web-design",
      targetKeywords: "web design services, website development",
      status: "not-started",
      completedItems: [],
    },
    {
      id: "3",
      pageType: "service-pages",
      url: "https://example.com/seo-services",
      targetKeywords: "seo services, search engine optimization",
      status: "not-started",
      completedItems: [],
    },
    {
      id: "4",
      pageType: "blog-posts",
      url: "https://example.com/blog/seo-tips",
      targetKeywords: "seo tips, improve search rankings",
      status: "completed",
      completedItems: optimizationItems.map((item) => item.id),
    },
  ])
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, Record<string, string>>>({})

  const filteredPages = pages.filter((page) => page.pageType === selectedPageType)
  const currentPage = selectedPage ? pages.find((page) => page.id === selectedPage) : null

  const handleToggleItem = (pageId: string, itemId: string) => {
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          const completedItems = page.completedItems.includes(itemId)
            ? page.completedItems.filter((id) => id !== itemId)
            : [...page.completedItems, itemId]

          const status =
            completedItems.length === 0
              ? "not-started"
              : completedItems.length === optimizationItems.length
                ? "completed"
                : "in-progress"

          return { ...page, completedItems, status }
        }
        return page
      }),
    )
  }

  const handleNoteChange = (pageId: string, itemId: string, value: string) => {
    setNotes({
      ...notes,
      [pageId]: {
        ...(notes[pageId] || {}),
        [itemId]: value,
      },
    })
  }

  const getPageProgress = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId)
    if (!page) return 0
    return Math.round((page.completedItems.length / optimizationItems.length) * 100)
  }

  const handleSaveOptimization = () => {
    console.log("Saving on-page optimization:", {
      projectId,
      pages,
      notes,
    })
    // In a real app, you would save this data to your database
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>On-Page Optimization</CardTitle>
          <CardDescription>Optimize website pages for better search visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {pageTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedPageType === type.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedPageType(type.id)
                  setSelectedPage(null)
                }}
              >
                {type.name}
              </Button>
            ))}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Target Keywords</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <TableRow key={page.id} className={selectedPage === page.id ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">{page.url}</TableCell>
                    <TableCell>{page.targetKeywords}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          page.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : page.status === "in-progress"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {page.status === "completed"
                          ? "Completed"
                          : page.status === "in-progress"
                            ? "In Progress"
                            : "Not Started"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex w-[100px] items-center gap-2">
                        <Progress value={getPageProgress(page.id)} className="h-2" />
                        <span className="text-xs">{getPageProgress(page.id)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPage(selectedPage === page.id ? null : page.id)}
                      >
                        {selectedPage === page.id ? "Hide" : "Optimize"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No pages found for this type
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Button variant="outline">Add New Page</Button>

          {currentPage && (
            <Card>
              <CardHeader>
                <CardTitle>Optimize: {currentPage.url}</CardTitle>
                <CardDescription>Complete the on-page optimization checklist for this page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {optimizationItems.map((item) => (
                    <div key={item.id} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id={`${currentPage.id}-${item.id}`}
                          checked={currentPage.completedItems.includes(item.id)}
                          onCheckedChange={() => handleToggleItem(currentPage.id, item.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={`${currentPage.id}-${item.id}`} className="text-base font-medium">
                            {item.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`notes-${currentPage.id}-${item.id}`}>Implementation Notes</Label>
                        <Textarea
                          id={`notes-${currentPage.id}-${item.id}`}
                          placeholder="Enter implementation details..."
                          value={notes[currentPage.id]?.[item.id] || ""}
                          onChange={(e) => handleNoteChange(currentPage.id, item.id, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSaveOptimization}>Save Optimization</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
