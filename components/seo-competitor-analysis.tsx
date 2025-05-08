"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Download, Plus, Trash2 } from "lucide-react"

// Sample data for the competitor analysis
const competitors = [
  {
    id: "comp1",
    name: "Competitor A",
    domain: "competitora.com",
    trafficShare: 35,
    keywordRankings: 245,
    backlinks: 1250,
    domainAuthority: 48,
    topKeywords: [
      { keyword: "web design services", position: 2, volume: 2400 },
      { keyword: "seo company", position: 3, volume: 3600 },
      { keyword: "digital marketing agency", position: 5, volume: 5400 },
    ],
    contentScore: 78,
    technicalScore: 85,
    socialScore: 62,
  },
  {
    id: "comp2",
    name: "Competitor B",
    domain: "competitorb.com",
    trafficShare: 28,
    keywordRankings: 198,
    backlinks: 980,
    domainAuthority: 42,
    topKeywords: [
      { keyword: "affordable web design", position: 1, volume: 1800 },
      { keyword: "local seo services", position: 4, volume: 1600 },
      { keyword: "small business marketing", position: 2, volume: 2200 },
    ],
    contentScore: 72,
    technicalScore: 68,
    socialScore: 75,
  },
  {
    id: "comp3",
    name: "Competitor C",
    domain: "competitorc.com",
    trafficShare: 18,
    keywordRankings: 156,
    backlinks: 720,
    domainAuthority: 38,
    topKeywords: [
      { keyword: "ecommerce website development", position: 3, volume: 1900 },
      { keyword: "wordpress website design", position: 2, volume: 2100 },
      { keyword: "social media marketing", position: 6, volume: 4800 },
    ],
    contentScore: 65,
    technicalScore: 72,
    socialScore: 58,
  },
]

// Your website data
const yourSite = {
  name: "White Fox Studios",
  domain: "whitefoxstudios.com",
  trafficShare: 19,
  keywordRankings: 178,
  backlinks: 850,
  domainAuthority: 40,
  topKeywords: [
    { keyword: "web design services", position: 4, volume: 2400 },
    { keyword: "seo services", position: 5, volume: 3600 },
    { keyword: "digital marketing agency", position: 8, volume: 5400 },
  ],
  contentScore: 70,
  technicalScore: 75,
  socialScore: 68,
}

// Combined data for charts
const allSites = [yourSite, ...competitors]

// Traffic share data for pie chart
const trafficShareData = allSites.map((site) => ({
  name: site.name,
  value: site.trafficShare,
  color: site.name === "White Fox Studios" ? "#f97316" : undefined,
}))

// Domain metrics data for radar chart
const domainMetricsData = allSites.map((site) => ({
  subject: site.name,
  "Domain Authority": site.domainAuthority,
  "Content Score": site.contentScore,
  "Technical Score": site.technicalScore,
  "Social Score": site.socialScore,
  "Keyword Rankings": site.keywordRankings / 5, // Scaled down for better visualization
  Backlinks: site.backlinks / 25, // Scaled down for better visualization
}))

// Keyword overlap data
const keywordOverlapData = [
  { name: "Competitor A", overlap: 45, unique: 200 },
  { name: "Competitor B", overlap: 38, unique: 160 },
  { name: "Competitor C", overlap: 22, unique: 134 },
]

export function SEOCompetitorAnalysis() {
  const [activeTab, setActiveTab] = useState("overview")
  const [newCompetitor, setNewCompetitor] = useState("")

  const handleAddCompetitor = () => {
    if (newCompetitor.trim() === "") return
    console.log("Adding competitor:", newCompetitor)
    setNewCompetitor("")
    // In a real app, you would add this competitor to your database
  }

  const handleRemoveCompetitor = (id: string) => {
    console.log("Removing competitor:", id)
    // In a real app, you would remove this competitor from your database
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Competitor Analysis</h2>
          <p className="text-muted-foreground">Compare your SEO performance against your top competitors</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter competitor domain..."
            value={newCompetitor}
            onChange={(e) => setNewCompetitor(e.target.value)}
            className="w-[250px]"
          />
          <Button onClick={handleAddCompetitor}>
            <Plus className="mr-2 h-4 w-4" /> Add Competitor
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Traffic Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yourSite.trafficShare}%</div>
            <div className="mt-1 flex items-center text-xs">
              <span
                className={
                  yourSite.trafficShare > 25
                    ? "text-green-500"
                    : yourSite.trafficShare > 15
                      ? "text-amber-500"
                      : "text-red-500"
                }
              >
                {yourSite.trafficShare > 25 ? "Strong" : yourSite.trafficShare > 15 ? "Average" : "Needs Improvement"}
              </span>
              <span className="ml-1 text-muted-foreground">compared to competitors</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yourSite.keywordRankings}</div>
            <div className="mt-1 flex items-center text-xs">
              <span
                className={
                  yourSite.keywordRankings > 200
                    ? "text-green-500"
                    : yourSite.keywordRankings > 150
                      ? "text-amber-500"
                      : "text-red-500"
                }
              >
                {yourSite.keywordRankings > 200
                  ? "Strong"
                  : yourSite.keywordRankings > 150
                    ? "Average"
                    : "Needs Improvement"}
              </span>
              <span className="ml-1 text-muted-foreground">in top 100 positions</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yourSite.backlinks}</div>
            <div className="mt-1 flex items-center text-xs">
              <span
                className={
                  yourSite.backlinks > 1000
                    ? "text-green-500"
                    : yourSite.backlinks > 500
                      ? "text-amber-500"
                      : "text-red-500"
                }
              >
                {yourSite.backlinks > 1000 ? "Strong" : yourSite.backlinks > 500 ? "Average" : "Needs Improvement"}
              </span>
              <span className="ml-1 text-muted-foreground">from unique domains</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Domain Authority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yourSite.domainAuthority}/100</div>
            <div className="mt-1 flex items-center text-xs">
              <span
                className={
                  yourSite.domainAuthority > 50
                    ? "text-green-500"
                    : yourSite.domainAuthority > 30
                      ? "text-amber-500"
                      : "text-red-500"
                }
              >
                {yourSite.domainAuthority > 50
                  ? "Strong"
                  : yourSite.domainAuthority > 30
                    ? "Average"
                    : "Needs Improvement"}
              </span>
              <span className="ml-1 text-muted-foreground">overall authority score</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Share</CardTitle>
                <CardDescription>Estimated organic search traffic share in your industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficShareData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                          const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180))
                          const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180))
                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#fff"
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              fontSize={12}
                              fontWeight="bold"
                            >
                              {`${name} ${(percent * 100).toFixed(0)}%`}
                            </text>
                          )
                        }}
                      >
                        {trafficShareData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color || ["#3b82f6", "#10b981", "#8b5cf6", "#ec4899"][index % 4]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Domain Metrics Comparison</CardTitle>
                <CardDescription>Key SEO metrics compared to competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={100} data={domainMetricsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="White Fox Studios"
                        dataKey="Domain Authority"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Content Score"
                        dataKey="Content Score"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Technical Score"
                        dataKey="Technical Score"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Social Score"
                        dataKey="Social Score"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Competitor Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Traffic Share</TableHead>
                    <TableHead>Keyword Rankings</TableHead>
                    <TableHead>Backlinks</TableHead>
                    <TableHead>Domain Authority</TableHead>
                    <TableHead>Content Score</TableHead>
                    <TableHead>Technical Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-orange-50">
                    <TableCell className="font-medium">
                      {yourSite.name}
                      <div className="text-xs text-muted-foreground">{yourSite.domain}</div>
                    </TableCell>
                    <TableCell>{yourSite.trafficShare}%</TableCell>
                    <TableCell>{yourSite.keywordRankings}</TableCell>
                    <TableCell>{yourSite.backlinks}</TableCell>
                    <TableCell>{yourSite.domainAuthority}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={yourSite.contentScore} className="h-2 w-[60px]" />
                        <span className="text-xs">{yourSite.contentScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={yourSite.technicalScore} className="h-2 w-[60px]" />
                        <span className="text-xs">{yourSite.technicalScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">Your site</span>
                    </TableCell>
                  </TableRow>
                  {competitors.map((competitor) => (
                    <TableRow key={competitor.id}>
                      <TableCell className="font-medium">
                        {competitor.name}
                        <div className="text-xs text-muted-foreground">{competitor.domain}</div>
                      </TableCell>
                      <TableCell>{competitor.trafficShare}%</TableCell>
                      <TableCell>{competitor.keywordRankings}</TableCell>
                      <TableCell>{competitor.backlinks}</TableCell>
                      <TableCell>{competitor.domainAuthority}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={competitor.contentScore} className="h-2 w-[60px]" />
                          <span className="text-xs">{competitor.contentScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={competitor.technicalScore} className="h-2 w-[60px]" />
                          <span className="text-xs">{competitor.technicalScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveCompetitor(competitor.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitive Insights</CardTitle>
              <CardDescription>Key observations and recommendations based on competitor analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Strengths</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Your technical SEO score is higher than most competitors</li>
                    <li>Your content is well-optimized for key industry terms</li>
                    <li>Your site has a balanced backlink profile with quality links</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Opportunities</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      Competitor A ranks higher for "web design services" - analyze their page structure and content
                    </li>
                    <li>
                      Competitor B has more backlinks from industry directories - consider targeting similar sources
                    </li>
                    <li>Competitor C has stronger social signals - improve social media engagement</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Recommendations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Create more in-depth content around "web design services" to compete with Competitor A</li>
                    <li>Develop a targeted link building campaign focusing on quality industry directories</li>
                    <li>Improve social sharing elements on key pages to boost social signals</li>
                    <li>Optimize for local keywords where competitors are showing weakness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Overlap</CardTitle>
              <CardDescription>Keywords you share with competitors vs. unique keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={keywordOverlapData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="overlap" name="Overlapping Keywords" stackId="a" fill="#f97316" />
                    <Bar dataKey="unique" name="Unique Keywords" stackId="a" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Keyword Comparison</CardTitle>
              <CardDescription>How you rank for top keywords compared to competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Your Position</TableHead>
                    <TableHead>Competitor A</TableHead>
                    <TableHead>Competitor B</TableHead>
                    <TableHead>Competitor C</TableHead>
                    <TableHead>Difficulty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">web design services</TableCell>
                    <TableCell>2,400</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #4
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #2
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #12
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #15
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="h-2 w-[60px]" />
                        <span className="text-xs">75/100</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">seo services</TableCell>
                    <TableCell>3,600</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #5
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #3
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #7
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #11
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="h-2 w-[60px]" />
                        <span className="text-xs">82/100</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">digital marketing agency</TableCell>
                    <TableCell>5,400</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #8
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #5
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #10
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #14
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="h-2 w-[60px]" />
                        <span className="text-xs">88/100</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">local seo services</TableCell>
                    <TableCell>1,800</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #6
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #9
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #4
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #18
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="h-2 w-[60px]" />
                        <span className="text-xs">65/100</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">website development</TableCell>
                    <TableCell>4,200</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #7
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #8
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        #11
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #3
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="h-2 w-[60px]" />
                        <span className="text-xs">78/100</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Gap Analysis</CardTitle>
              <CardDescription>Keywords your competitors rank for that you don't</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Top Competitor</TableHead>
                    <TableHead>Their Position</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Opportunity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">affordable web design</TableCell>
                    <TableCell>1,800</TableCell>
                    <TableCell>Competitor B</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #1
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={62} className="h-2 w-[60px]" />
                        <span className="text-xs">62/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">small business marketing</TableCell>
                    <TableCell>2,200</TableCell>
                    <TableCell>Competitor B</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #2
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={70} className="h-2 w-[60px]" />
                        <span className="text-xs">70/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ecommerce website development</TableCell>
                    <TableCell>1,900</TableCell>
                    <TableCell>Competitor C</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #3
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="h-2 w-[60px]" />
                        <span className="text-xs">75/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">wordpress website design</TableCell>
                    <TableCell>2,100</TableCell>
                    <TableCell>Competitor C</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        #2
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="h-2 w-[60px]" />
                        <span className="text-xs">68/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">social media marketing</TableCell>
                    <TableCell>4,800</TableCell>
                    <TableCell>Competitor C</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        #6
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-[60px]" />
                        <span className="text-xs">85/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          {/* Backlinks tab content would go here */}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {/* Content tab content would go here */}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Analysis
        </Button>
      </div>
    </div>
  )
}
