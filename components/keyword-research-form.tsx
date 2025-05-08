"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"

type Keyword = {
  id: string
  keyword: string
  searchVolume: string
  difficulty: string
  intent: string
  priority: string
  notes: string
}

export function KeywordResearchForm({ projectId, clientId }) {
  const [seedKeywords, setSeedKeywords] = useState("")
  const [competitorUrls, setCompetitorUrls] = useState("")
  const [keywords, setKeywords] = useState<Keyword[]>([
    {
      id: "1",
      keyword: "web design agency",
      searchVolume: "2,400",
      difficulty: "67",
      intent: "commercial",
      priority: "high",
      notes: "Main service keyword",
    },
    {
      id: "2",
      keyword: "seo services",
      searchVolume: "6,600",
      difficulty: "72",
      intent: "commercial",
      priority: "high",
      notes: "Core service offering",
    },
    {
      id: "3",
      keyword: "digital marketing company",
      searchVolume: "5,400",
      difficulty: "75",
      intent: "commercial",
      priority: "medium",
      notes: "Broader term, higher competition",
    },
    {
      id: "4",
      keyword: "website redesign cost",
      searchVolume: "1,300",
      difficulty: "45",
      intent: "informational",
      priority: "medium",
      notes: "Good for blog content",
    },
    {
      id: "5",
      keyword: "how to improve website seo",
      searchVolume: "2,900",
      difficulty: "38",
      intent: "informational",
      priority: "low",
      notes: "Good for educational content",
    },
  ])
  const [newKeyword, setNewKeyword] = useState({
    keyword: "",
    searchVolume: "",
    difficulty: "",
    intent: "informational",
    priority: "medium",
    notes: "",
  })

  const handleAddKeyword = () => {
    if (newKeyword.keyword.trim() === "") return

    const id = (keywords.length + 1).toString()
    setKeywords([...keywords, { id, ...newKeyword }])
    setNewKeyword({
      keyword: "",
      searchVolume: "",
      difficulty: "",
      intent: "informational",
      priority: "medium",
      notes: "",
    })
  }

  const handleDeleteKeyword = (id: string) => {
    setKeywords(keywords.filter((keyword) => keyword.id !== id))
  }

  const handleSaveKeywords = () => {
    console.log("Saving keyword research:", {
      projectId,
      clientId,
      seedKeywords,
      competitorUrls,
      keywords,
    })
    // In a real app, you would save this data to your database
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Research</CardTitle>
          <CardDescription>Research and identify target keywords for this project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="seed-keywords">Seed Keywords</Label>
              <Textarea
                id="seed-keywords"
                placeholder="Enter seed keywords, one per line..."
                value={seedKeywords}
                onChange={(e) => setSeedKeywords(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Enter initial keywords related to the client's business and services
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitor-urls">Competitor URLs</Label>
              <Textarea
                id="competitor-urls"
                placeholder="Enter competitor URLs, one per line..."
                value={competitorUrls}
                onChange={(e) => setCompetitorUrls(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Enter URLs of competitors to analyze their keyword strategy
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Target Keywords</h3>
              <Button variant="outline" size="sm" onClick={() => handleSaveKeywords()}>
                Save Keywords
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>{keyword.searchVolume}</TableCell>
                    <TableCell>{keyword.difficulty}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          keyword.intent === "commercial"
                            ? "bg-blue-100 text-blue-800"
                            : keyword.intent === "transactional"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                        }
                      >
                        {keyword.intent}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          keyword.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : keyword.priority === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {keyword.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{keyword.notes}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteKeyword(keyword.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Card>
              <CardHeader>
                <CardTitle>Add New Keyword</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="new-keyword">Keyword</Label>
                    <Input
                      id="new-keyword"
                      placeholder="Enter keyword"
                      value={newKeyword.keyword}
                      onChange={(e) => setNewKeyword({ ...newKeyword, keyword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search-volume">Search Volume</Label>
                    <Input
                      id="search-volume"
                      placeholder="Monthly searches"
                      value={newKeyword.searchVolume}
                      onChange={(e) => setNewKeyword({ ...newKeyword, searchVolume: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Input
                      id="difficulty"
                      placeholder="0-100"
                      value={newKeyword.difficulty}
                      onChange={(e) => setNewKeyword({ ...newKeyword, difficulty: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intent">Intent</Label>
                    <select
                      id="intent"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newKeyword.intent}
                      onChange={(e) => setNewKeyword({ ...newKeyword, intent: e.target.value })}
                    >
                      <option value="informational">Informational</option>
                      <option value="commercial">Commercial</option>
                      <option value="transactional">Transactional</option>
                      <option value="navigational">Navigational</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newKeyword.priority}
                      onChange={(e) => setNewKeyword({ ...newKeyword, priority: e.target.value })}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about this keyword"
                    value={newKeyword.notes}
                    onChange={(e) => setNewKeyword({ ...newKeyword, notes: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <Button onClick={handleAddKeyword}>
                    <Plus className="mr-2 h-4 w-4" /> Add Keyword
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
