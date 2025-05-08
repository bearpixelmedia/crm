"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Heart, MessageSquare, MoreHorizontal, PenSquare, Share2, ThumbsUp, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CommunityHub() {
  const [discussions] = useState([
    {
      id: "1",
      author: "Sarah Johnson",
      authorRole: "Certified Personal Trainer",
      avatar: "/placeholder.svg?height=40&width=40&query=Sarah",
      title: "How do you handle clients who want to lose weight but aren't willing to change their diet?",
      content:
        "I'm struggling with a few clients who have weight loss goals but are resistant to making dietary changes. They want results from exercise alone. What strategies have worked for you in similar situations?",
      date: "2 hours ago",
      likes: 24,
      comments: 18,
      tags: ["Client Management", "Nutrition", "Weight Loss"],
    },
    {
      id: "2",
      author: "Michael Chen",
      authorRole: "Fitness Studio Owner",
      avatar: "/placeholder.svg?height=40&width=40&query=Michael",
      title: "Best software for managing multiple trainers and class schedules?",
      content:
        "I'm expanding my studio and need recommendations for software that can handle multiple trainers, class schedules, and client management. What are you using and what do you like/dislike about it?",
      date: "Yesterday",
      likes: 15,
      comments: 22,
      tags: ["Business Tools", "Studio Management"],
    },
    {
      id: "3",
      author: "Emma Wilson",
      authorRole: "Nutrition Coach",
      avatar: "/placeholder.svg?height=40&width=40&query=Emma",
      title: "Strategies for helping clients navigate social situations while sticking to nutrition plans",
      content:
        "Many of my clients struggle with maintaining their nutrition plans during social events, holidays, and dining out. What strategies do you recommend to help them stay on track without feeling deprived?",
      date: "2 days ago",
      likes: 32,
      comments: 27,
      tags: ["Nutrition", "Client Success", "Behavior Change"],
    },
  ])

  const [events] = useState([
    {
      id: "1",
      title: "Virtual Networking: Building Your Fitness Business",
      description:
        "Connect with other fitness professionals and share strategies for growing your business in today's market.",
      date: "May 15, 2023",
      time: "7:00 PM EST",
      host: "FitTrack Business Team",
      attendees: 42,
      image: "/placeholder.svg?height=200&width=300&query=virtual networking event",
    },
    {
      id: "2",
      title: "Workshop: Advanced Program Design for Special Populations",
      description:
        "Learn how to create effective training programs for clients with special needs or medical conditions.",
      date: "May 22, 2023",
      time: "1:00 PM EST",
      host: "Dr. James Rodriguez",
      attendees: 35,
      image: "/placeholder.svg?height=200&width=300&query=fitness workshop",
    },
    {
      id: "3",
      title: "Panel Discussion: The Future of Fitness Technology",
      description:
        "Industry experts discuss emerging technologies and how they will shape the future of fitness coaching.",
      date: "June 5, 2023",
      time: "3:00 PM EST",
      host: "FitTrack Innovation Team",
      attendees: 67,
      image: "/placeholder.svg?height=200&width=300&query=fitness technology panel",
    },
  ])

  const [resources] = useState([
    {
      id: "1",
      title: "Client Assessment Templates",
      description: "Comprehensive templates for initial client assessments, progress tracking, and goal setting.",
      downloads: 1245,
      rating: 4.8,
      category: "Templates",
      author: "FitTrack Team",
      image: "/placeholder.svg?height=100&width=100&query=assessment template",
    },
    {
      id: "2",
      title: "Nutrition Tracking Spreadsheet",
      description: "Easy-to-use spreadsheet for clients to track their daily nutrition and macros.",
      downloads: 987,
      rating: 4.6,
      category: "Tools",
      author: "Emma Wilson",
      image: "/placeholder.svg?height=100&width=100&query=nutrition spreadsheet",
    },
    {
      id: "3",
      title: "Marketing Guide for Fitness Professionals",
      description: "Step-by-step guide to marketing your fitness business and attracting ideal clients.",
      downloads: 1532,
      rating: 4.9,
      category: "Guides",
      author: "Michael Chen",
      image: "/placeholder.svg?height=100&width=100&query=marketing guide",
    },
    {
      id: "4",
      title: "Exercise Video Library",
      description: "Collection of professionally filmed exercise demonstrations for form and technique.",
      downloads: 2156,
      rating: 4.7,
      category: "Videos",
      author: "FitTrack Team",
      image: "/placeholder.svg?height=100&width=100&query=exercise library",
    },
  ])

  return (
    <div className="mt-6">
      <Tabs defaultValue="discussions">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="mt-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">Start a Discussion</CardTitle>
                <CardDescription>Share your questions, insights, or challenges with the community.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <Input placeholder="Discussion title" />
                  <Textarea placeholder="What's on your mind?" className="min-h-[100px]" />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Client Management</Badge>
                    <Badge variant="outline">Nutrition</Badge>
                    <Badge variant="outline">Business</Badge>
                    <Badge variant="outline">Training</Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      + Add Tag
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button>
                  <PenSquare className="mr-2 h-4 w-4" />
                  Post Discussion
                </Button>
              </CardFooter>
            </Card>

            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                        <AvatarFallback>
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{discussion.author}</div>
                        <div className="text-sm text-muted-foreground">{discussion.authorRole}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">{discussion.date}</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Save</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                          <DropdownMenuItem>Hide</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">{discussion.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">{discussion.content}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <div className="text-sm">Hosted by: {event.host}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Register</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="p-4">
                  <div className="flex gap-4">
                    <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                      <img
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription className="mt-1">{resource.description}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{resource.category}</Badge>
                        <div className="text-sm text-muted-foreground">By {resource.author}</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{resource.downloads} downloads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(resource.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <span className="text-sm ml-1">{resource.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Download</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
