"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
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
} from "recharts"
import { ArrowUpRight, Download, ExternalLink, FileText, HelpCircle, MessageSquare, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for the charts
const trafficData = [
  { month: "Jan", organic: 1200, previous: 900 },
  { month: "Feb", organic: 1400, previous: 950 },
  { month: "Mar", organic: 1500, previous: 1000 },
  { month: "Apr", organic: 1700, previous: 1050 },
  { month: "May", organic: 2000, previous: 1100 },
  { month: "Jun", organic: 2400, previous: 1150 },
]

const keywordData = [
  { keyword: "web design services", position: 3, change: 2, volume: 2400 },
  { keyword: "seo company", position: 5, change: -1, volume: 3600 },
  { keyword: "digital marketing agency", position: 8, change: 4, volume: 5400 },
  { keyword: "local seo services", position: 4, change: 1, volume: 1800 },
  { keyword: "website development", position: 6, change: 0, volume: 4200 },
]

const taskData = [
  { name: "Initial SEO Audit", status: "completed", date: "Jan 15, 2023" },
  { name: "Keyword Research", status: "completed", date: "Feb 1, 2023" },
  { name: "On-Page Optimization", status: "completed", date: "Mar 10, 2023" },
  { name: "Content Creation", status: "in-progress", date: "Apr 5, 2023" },
  { name: "Link Building", status: "planned", date: "May 1, 2023" },
  { name: "Performance Tracking", status: "planned", date: "Jun 1, 2023" },
]

const pieData = [
  { name: "Organic Search", value: 65, color: "#f97316" },
  { name: "Direct", value: 15, color: "#3b82f6" },
  { name: "Referral", value: 10, color: "#10b981" },
  { name: "Social", value: 10, color: "#8b5cf6" },
]

export default function ClientSEODashboard() {
  const [timeframe, setTimeframe] = useState("6m")

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Performance Dashboard</h1>
          <p className="text-muted-foreground">Track your website's SEO performance and progress</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" /> Contact Your SEO Manager
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visitors coming to your site from search engines</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">2,400</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                +20%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">vs. previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of keywords ranking in top 10 positions</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">18</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                +5
              </div>
            </div>
            <p className="text-xs text-muted-foreground">vs. previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of external websites linking to yours</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">48</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                +8
              </div>
            </div>
            <p className="text-xs text-muted-foreground">vs. previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Health Score</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overall health of your website's SEO</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">82/100</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                +6
              </div>
            </div>
            <p className="text-xs text-muted-foreground">vs. previous period</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO Project Progress</CardTitle>
            <CardDescription>Current status of your SEO optimization project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <div className="mt-6 space-y-4">
              {taskData.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        task.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {task.status === "completed"
                        ? "Completed"
                        : task.status === "in-progress"
                          ? "In Progress"
                          : "Planned"}
                    </Badge>
                    <span className="font-medium">{task.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{task.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Organic Traffic Trend</CardTitle>
                <CardDescription>Monthly organic search traffic compared to previous period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="organic"
                        name="Current Period"
                        stroke="#f97316"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="previous"
                        name="Previous Period"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Breakdown of your website traffic by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
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
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Insights</CardTitle>
              <CardDescription>Key observations and recommendations for improving traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">What's Working Well</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Organic traffic has increased by 20% compared to the previous period</li>
                    <li>Blog content is driving significant traffic to the website</li>
                    <li>Mobile traffic has improved by 35% following recent optimizations</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Recommendations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Continue creating content around high-performing keywords</li>
                    <li>Improve internal linking to distribute traffic to service pages</li>
                    <li>Consider adding more call-to-actions on high-traffic pages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Keywords</CardTitle>
              <CardDescription>Keywords driving the most traffic to your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywordData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.keyword}</TableCell>
                      <TableCell>{item.position}</TableCell>
                      <TableCell>
                        <span
                          className={
                            item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : "text-gray-600"
                          }
                        >
                          {item.change > 0 ? "+" : ""}
                          {item.change}
                        </span>
                      </TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>
                        <a href="#" className="flex items-center text-blue-600 hover:underline">
                          View Page <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Position Distribution</CardTitle>
                <CardDescription>Distribution of your keyword rankings by position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { position: "1-3", count: 5, color: "#10b981" },
                        { position: "4-10", count: 13, color: "#3b82f6" },
                        { position: "11-20", count: 24, color: "#f97316" },
                        { position: "21-50", count: 38, color: "#8b5cf6" },
                        { position: "51-100", count: 52, color: "#9ca3af" },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="position" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" name="Keywords">
                        {[
                          <Cell key="1" fill="#10b981" />,
                          <Cell key="2" fill="#3b82f6" />,
                          <Cell key="3" fill="#f97316" />,
                          <Cell key="4" fill="#8b5cf6" />,
                          <Cell key="5" fill="#9ca3af" />,
                        ]}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Insights</CardTitle>
                <CardDescription>Key observations and recommendations for keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">What's Working Well</h3>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>5 keywords have moved into the top 3 positions</li>
                      <li>Local keywords are performing exceptionally well</li>
                      <li>Long-tail keywords are driving qualified traffic</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">Opportunities</h3>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Focus on moving keywords from positions 11-20 into the top 10</li>
                      <li>Target more long-tail keywords related to your services</li>
                      <li>Create content for keywords with high search volume but low competition</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Pages driving the most organic traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Traffic</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Top Keyword</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">/blog/seo-tips-2023</TableCell>
                    <TableCell>1,245</TableCell>
                    <TableCell className="text-green-600">+18%</TableCell>
                    <TableCell>seo tips 2023</TableCell>
                    <TableCell>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/services/web-design</TableCell>
                    <TableCell>986</TableCell>
                    <TableCell className="text-green-600">+24%</TableCell>
                    <TableCell>web design services</TableCell>
                    <TableCell>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/blog/local-seo-guide</TableCell>
                    <TableCell>754</TableCell>
                    <TableCell className="text-green-600">+32%</TableCell>
                    <TableCell>local seo guide</TableCell>
                    <TableCell>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/services/seo</TableCell>
                    <TableCell>682</TableCell>
                    <TableCell className="text-green-600">+15%</TableCell>
                    <TableCell>seo services</TableCell>
                    <TableCell>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/case-studies</TableCell>
                    <TableCell>521</TableCell>
                    <TableCell className="text-red-600">-5%</TableCell>
                    <TableCell>marketing case studies</TableCell>
                    <TableCell>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        View <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Content Optimizations</CardTitle>
              <CardDescription>Content improvements made in the last period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Service Pages Optimization</h3>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Updated title tags, meta descriptions, and content on all service pages to better target primary
                    keywords.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="mr-1 h-4 w-4" />
                    Completed on April 15, 2023
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Blog Content Creation</h3>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Creating 5 new blog posts targeting high-value keywords related to SEO and web design.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="mr-1 h-4 w-4" />3 of 5 posts published
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Internal Linking Structure</h3>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Improved internal linking structure to better distribute link equity and help users navigate the
                    site.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="mr-1 h-4 w-4" />
                    Completed on March 28, 2023
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Page Speed</CardTitle>
                <CardDescription>Average page load time across your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="stroke-muted-foreground/20"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        strokeWidth="10"
                      />
                      <circle
                        className="stroke-green-500"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset="56.5"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">2.1s</span>
                      <span className="text-xs text-muted-foreground">Load Time</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-500">Good</p>
                    <p className="text-xs text-muted-foreground">Improved by 0.8s from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Usability</CardTitle>
                <CardDescription>Mobile-friendliness of your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="stroke-muted-foreground/20"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        strokeWidth="10"
                      />
                      <circle
                        className="stroke-green-500"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset="28.3"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">90%</span>
                      <span className="text-xs text-muted-foreground">Score</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-500">Excellent</p>
                    <p className="text-xs text-muted-foreground">Improved by 15% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>Google's page experience metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">LCP</span>
                      <span className="text-sm text-green-500">2.1s</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">FID</span>
                      <span className="text-sm text-green-500">18ms</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">CLS</span>
                      <span className="text-sm text-amber-500">0.12</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Technical SEO Issues</CardTitle>
              <CardDescription>Current technical issues affecting your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      High
                    </Badge>
                    <div>
                      <h3 className="font-medium">Broken Links</h3>
                      <p className="text-sm text-muted-foreground">3 broken internal links found on your website</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    In Progress
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">
                      Medium
                    </Badge>
                    <div>
                      <h3 className="font-medium">Missing Alt Text</h3>
                      <p className="text-sm text-muted-foreground">12 images missing alt text</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    In Progress
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">
                      Medium
                    </Badge>
                    <div>
                      <h3 className="font-medium">Mobile Responsiveness Issues</h3>
                      <p className="text-sm text-muted-foreground">2 pages with mobile display issues</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Fixed
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Low
                    </Badge>
                    <div>
                      <h3 className="font-medium">Duplicate Meta Descriptions</h3>
                      <p className="text-sm text-muted-foreground">5 pages with duplicate meta descriptions</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Fixed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Next Steps</h2>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Schedule a Call
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Content Optimization</h3>
              <p className="text-sm text-muted-foreground">
                We'll be optimizing your service pages to improve their rankings for target keywords. This includes
                updating headers, content, and internal linking.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Link Building Campaign</h3>
              <p className="text-sm text-muted-foreground">
                We're starting a targeted link building campaign to increase your site's authority. We'll focus on
                industry-relevant websites and directories.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Technical SEO Fixes</h3>
              <p className="text-sm text-muted-foreground">
                We'll be addressing the remaining technical issues, particularly the broken links and missing alt text,
                to improve your site's crawlability and accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
