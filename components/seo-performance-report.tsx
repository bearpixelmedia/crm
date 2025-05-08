"use client"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, FileText, Mail } from "lucide-react"

// Sample data for the charts
const trafficData = [
  { month: "Jan", organic: 1200, direct: 900, referral: 300, social: 400 },
  { month: "Feb", organic: 1400, direct: 950, referral: 350, social: 450 },
  { month: "Mar", organic: 1500, direct: 1000, referral: 400, social: 500 },
  { month: "Apr", organic: 1700, direct: 1050, referral: 450, social: 550 },
  { month: "May", organic: 2000, direct: 1100, referral: 500, social: 600 },
  { month: "Jun", organic: 2400, direct: 1150, referral: 550, social: 650 },
]

const keywordData = [
  { keyword: "web design services", position: 3, change: 2, volume: 2400, ctr: 4.5 },
  { keyword: "seo company", position: 5, change: -1, volume: 3600, ctr: 3.2 },
  { keyword: "digital marketing agency", position: 8, change: 4, volume: 5400, ctr: 2.1 },
  { keyword: "local seo services", position: 4, change: 1, volume: 1800, ctr: 3.8 },
  { keyword: "website development", position: 6, change: 0, volume: 4200, ctr: 2.9 },
]

const conversionData = [
  { month: "Jan", conversions: 12, rate: 1.0 },
  { month: "Feb", conversions: 15, rate: 1.1 },
  { month: "Mar", conversions: 18, rate: 1.2 },
  { month: "Apr", conversions: 22, rate: 1.3 },
  { month: "May", conversions: 28, rate: 1.4 },
  { month: "Jun", conversions: 35, rate: 1.5 },
]

export function SEOPerformanceReport({ projectId, clientId }) {
  const [activeTab, setActiveTab] = useState("traffic")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">SEO Performance Report</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,400</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+5 new rankings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+8 new links</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organic Traffic</CardTitle>
              <CardDescription>Traffic sources over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="organic" stroke="#f97316" strokeWidth={2} />
                    <Line type="monotone" dataKey="direct" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="referral" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="social" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Insights</CardTitle>
              <CardDescription>Key observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Observations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Organic traffic has increased by 20% month-over-month</li>
                    <li>Mobile traffic has grown by 35% compared to the previous quarter</li>
                    <li>The bounce rate has decreased from 65% to 52%</li>
                    <li>Average session duration has increased by 45 seconds</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Recommendations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Optimize the top-performing pages for mobile to further improve engagement</li>
                    <li>Create more content around high-converting keywords</li>
                    <li>Improve page load speed for key landing pages</li>
                    <li>Implement structured data for enhanced SERP visibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>Top keyword positions and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Search Volume</TableHead>
                        <TableHead>CTR</TableHead>
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
                          <TableCell>{item.ctr}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={keywordData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="keyword" />
                      <YAxis yAxisId="left" orientation="left" stroke="#f97316" />
                      <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="position" name="Position" fill="#f97316" />
                      <Bar yAxisId="right" dataKey="volume" name="Search Volume" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Insights</CardTitle>
              <CardDescription>Key observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Observations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>5 new keywords entered the top 10 positions</li>
                    <li>"Web design services" improved by 2 positions to #3</li>
                    <li>Long-tail keywords are showing better conversion rates</li>
                    <li>Local keywords are performing well with 4 in the top 5 positions</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Recommendations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Create more content targeting "digital marketing agency" to improve its position</li>
                    <li>Optimize meta descriptions for keywords with high search volume but low CTR</li>
                    <li>Develop more long-form content around high-converting keywords</li>
                    <li>Add more local content to capitalize on strong local keyword performance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
              <CardDescription>Conversion rates and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#f97316" />
                    <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="conversions"
                      name="Conversions"
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rate"
                      name="Conversion Rate (%)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Insights</CardTitle>
              <CardDescription>Key observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Observations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Overall conversion rate has increased from 1.0% to 1.5%</li>
                    <li>Contact form submissions have increased by 25%</li>
                    <li>Mobile conversions have improved by 40%</li>
                    <li>Service pages are converting better than blog content</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-medium">Recommendations</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Optimize call-to-action buttons on high-traffic pages</li>
                    <li>Implement A/B testing on the contact form to further improve conversions</li>
                    <li>Add testimonials and case studies to service pages</li>
                    <li>Improve mobile checkout process to reduce abandonment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Save Draft
        </Button>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" /> Send to Client
        </Button>
        <Button>Generate Full Report</Button>
      </div>
    </div>
  )
}
