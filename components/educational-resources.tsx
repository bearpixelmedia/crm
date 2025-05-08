"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Play, Star, Users } from "lucide-react"

export function EducationalResources() {
  const [courses] = useState([
    {
      id: "1",
      title: "Nutrition Strategies to Boost Fat Loss Results",
      description: "Learn effective nutrition strategies to help your clients achieve sustainable fat loss results.",
      duration: "3 hours",
      level: "Intermediate",
      students: 245,
      rating: 4.8,
      image: "/diverse-nutrition-learning.png",
      category: "nutrition",
    },
    {
      id: "2",
      title: "The Partnership Playbook",
      description:
        "Build successful partnerships with other fitness professionals and businesses to grow your client base.",
      duration: "2.5 hours",
      level: "Beginner",
      students: 178,
      rating: 4.6,
      image: "/collaborative-growth.png",
      category: "business",
    },
    {
      id: "3",
      title: "Beating Burnout for Coaches",
      description: "Strategies to maintain work-life balance and prevent burnout in your fitness coaching career.",
      duration: "2 hours",
      level: "All Levels",
      students: 312,
      rating: 4.9,
      image: "/thriving-coach.png",
      category: "wellness",
    },
    {
      id: "4",
      title: "Advanced Program Design",
      description: "Master the art of creating effective, personalized training programs for diverse client needs.",
      duration: "4 hours",
      level: "Advanced",
      students: 203,
      rating: 4.7,
      image: "/diverse-fitness-journey.png",
      category: "training",
    },
    {
      id: "5",
      title: "Client Acquisition Mastery",
      description: "Proven strategies to attract and convert new clients for your fitness business.",
      duration: "3.5 hours",
      level: "Intermediate",
      students: 287,
      rating: 4.8,
      image: "/connecting-for-growth.png",
      category: "business",
    },
    {
      id: "6",
      title: "Mobility Training Fundamentals",
      description:
        "Learn how to assess and improve your clients' mobility for better performance and injury prevention.",
      duration: "2.5 hours",
      level: "Beginner",
      students: 156,
      rating: 4.5,
      image: "/diverse-mobility-flow.png",
      category: "training",
    },
  ])

  const [webinars] = useState([
    {
      id: "1",
      title: "Mastering FitTrack: Elevate Your Fitness Business",
      description: "Learn how to leverage all FitTrack features to optimize your coaching business.",
      date: "May 15, 2023",
      time: "2:00 PM EST",
      presenter: "Sarah Johnson",
      role: "Head of Customer Success",
      image: "/energetic-fitness-webinar.png",
    },
    {
      id: "2",
      title: "Client Retention Strategies That Work",
      description: "Discover proven methods to keep clients engaged and committed to their fitness journey.",
      date: "May 22, 2023",
      time: "1:00 PM EST",
      presenter: "Michael Chen",
      role: "Business Development Specialist",
      image: "/growing-relationships.png",
    },
    {
      id: "3",
      title: "Building Your Online Fitness Community",
      description: "Learn how to create and nurture an engaged online community around your fitness brand.",
      date: "June 5, 2023",
      time: "3:00 PM EST",
      presenter: "Emma Wilson",
      role: "Community Manager",
      image: "/placeholder.svg?height=200&width=300&query=online fitness community",
    },
  ])

  const [articles] = useState([
    {
      id: "1",
      title: "GLP-1s & the Future of Fitness: What Every Coach Needs to Know",
      excerpt: "Learn how weight loss medications are reshaping client coaching and how to adapt your approach.",
      date: "April 25, 2023",
      readTime: "4 min read",
      category: "Trends",
      image: "/placeholder.svg?height=200&width=300&query=weight loss medication",
    },
    {
      id: "2",
      title: "5 Ways to Boost Your Productivity as a Fitness Coach",
      excerpt: "Practical tips to streamline your workflow and serve more clients without burning out.",
      date: "April 18, 2023",
      readTime: "3 min read",
      category: "Productivity",
      image: "/placeholder.svg?height=200&width=300&query=productivity tips",
    },
    {
      id: "3",
      title: "How to Create Engaging Workout Programs That Keep Clients Coming Back",
      excerpt: "Design workout programs that deliver results and keep your clients motivated and engaged.",
      date: "April 10, 2023",
      readTime: "5 min read",
      category: "Program Design",
      image: "/placeholder.svg?height=200&width=300&query=workout program design",
    },
  ])

  return (
    <div className="mt-6">
      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : course.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : course.level === "Advanced"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      }
                    >
                      {course.level}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={webinar.image || "/placeholder.svg"}
                    alt={webinar.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button variant="outline" className="rounded-full h-12 w-12 p-0">
                      <Play className="h-6 w-6" />
                      <span className="sr-only">Play webinar</span>
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">{webinar.title}</CardTitle>
                  <CardDescription>{webinar.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {webinar.date} at {webinar.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {webinar.presenter}, {webinar.role}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Register Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  <Button variant="outline">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
