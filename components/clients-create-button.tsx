"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ClientsCreateButton() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    email: "your.email@example.com",
    height: "175",
    weight: "70",
    age: "30",
    fitnessLevel: "intermediate",
    goals: "Build muscle and improve overall fitness",
  })

  const handleChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the profile data
    alert("Profile updated successfully!")
    setDialogOpen(false)
  }

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <UserCircle className="mr-2 h-4 w-4" />
        My Profile
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Your Profile</DialogTitle>
              <DialogDescription>Update your personal information and fitness details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="height" className="text-right">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={profileData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={profileData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={profileData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fitness-level" className="text-right">
                  Fitness Level
                </Label>
                <Select value={profileData.fitnessLevel} onValueChange={(value) => handleChange("fitnessLevel", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goals" className="text-right">
                  Fitness Goals
                </Label>
                <Textarea
                  id="goals"
                  value={profileData.goals}
                  onChange={(e) => handleChange("goals", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
