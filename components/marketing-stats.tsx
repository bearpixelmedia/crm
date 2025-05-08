"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, TrendingUp, TrendingDown } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const campaigns = [
  {
    id: "CAM001",
    name: "Summer Web Design Promo",
    type: "Email",
    status: "Active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    budget: "$5,000",
    spent: "$3,200",
    leads: 45,
    conversions: 12,
    roi: "+18%",
  },
  {
    id: "CAM002",
    name: "SEO Boost Package",
    type: "SEO",
    status: "Active",
    startDate: "2023-05-15",
    endDate: "2023-11-15",
    budget: "$8,000",
    spent: "$4,500",
    leads: 68,
    conversions: 15,
    roi: "+22%",
  },
  {
    id: "CAM003",
    name: "Social Media Awareness",
    type: "Social",
    status: "Completed",
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    budget: "$3,500",
    spent: "$3,500",
    leads: 120,
    conversions: 18,
    roi: "+15%",
  },
  {
    id: "CAM004",
    name: "Google Ads Winter Special",
    type: "PPC",
    status: "Planned",
    startDate: "2023-12-01",
    endDate: "2024-02-28",
    budget: "$6,000",
    spent: "$0",
    leads: 0,
    conversions: 0,
    roi: "N/A",
  },
  {
    id: "CAM005",
    name: "Content Marketing Push",
    type: "Content",
    status: "Active",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    budget: "$4,500",
    spent: "$2,200",
    leads: 35,
    conversions: 8,
    roi: "+12%",
  },
]

const performanceData = [
  {
    month: "Jan",
    visitors: 2500,
    leads: 120,
    conversions: 25,
  },
  {
    month: "Feb",
    visitors: 3000,
    leads: 150,
    conversions: 30,
  },
  {
    month: "Mar",
    visitors: 3200,
    leads: 170,
    conversions: 35,
  },
  {
    month: "Apr",
    visitors: 3800,
    leads: 190,
    conversions: 40,
  },
  {
    month: "May",
    visitors: 4200,
    leads: 210,
    conversions: 45,
  },
  {
    month: "Jun",
    visitors: 4500,
    leads: 230,
    conversions: 50,
  },
  {
    month: "Jul",
    visitors: 4800,
    leads: 250,
    conversions: 55,
  },
  {
    month: "Aug",
    visitors: 5100,
    leads: 270,
    conversions: 60,
  },
  {
    month: "Sep",
    visitors: 5400,
    leads: 290,
    conversions: 65,
  },
]

export function MarketingStats() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">268</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                +12%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">From all active campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">18.2%</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <TrendingUp className="mr-1 h-4 w-4" />
                +2.4%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">+16.8%</div>
              <div className="ml-2 flex items-center text-sm text-red-500">
                <TrendingDown className="mr-1 h-4 w-4" />
                -1.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marketing Performance</CardTitle>
          <CardDescription>Website visitors, leads, and conversions over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={performanceData}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marketing Campaigns</CardTitle>
          <CardDescription>Manage your marketing campaigns and track their performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "Active"
                          ? "default"
                          : campaign.status === "Completed"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>{campaign.spent}</TableCell>
                  <TableCell>{campaign.leads}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell className={campaign.roi.startsWith("+") ? "text-green-500" : ""}>{campaign.roi}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View analytics</DropdownMenuItem>
                        <DropdownMenuItem>Export report</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete campaign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
