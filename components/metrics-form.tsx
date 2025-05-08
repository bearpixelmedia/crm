"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MetricsForm() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Measurements</CardTitle>
        <CardDescription>Record your latest body measurements.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Metrics</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Measurements</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 pt-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" type="number" placeholder="Enter your weight" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body-fat">Body Fat (%)</Label>
                <Input id="body-fat" type="number" placeholder="Enter your body fat percentage" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input id="bmi" type="number" placeholder="Enter your BMI" />
              </div>
            </form>
          </TabsContent>
          <TabsContent value="detailed" className="space-y-4 pt-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date-detailed">Date</Label>
                <Input id="date-detailed" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (in)</Label>
                  <Input id="chest" type="number" placeholder="Chest" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (in)</Label>
                  <Input id="waist" type="number" placeholder="Waist" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Hips (in)</Label>
                  <Input id="hips" type="number" placeholder="Hips" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biceps">Biceps (in)</Label>
                  <Input id="biceps" type="number" placeholder="Biceps" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thighs">Thighs (in)</Label>
                  <Input id="thighs" type="number" placeholder="Thighs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calves">Calves (in)</Label>
                  <Input id="calves" type="number" placeholder="Calves" />
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Measurements</Button>
      </CardFooter>
    </Card>
  )
}
