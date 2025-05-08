"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { handleViewDetails } from "@/lib/button-actions"

export function CaseStudies() {
  const [caseStudies] = useState([
    {
      id: "1",
      title: "How Sarah Johnson Grew Her Client Base by 300% in 6 Months",
      description:
        "Learn how Sarah, a personal trainer, used FitTrack to streamline her business and attract new clients.",
      image: "/fitness-trainer-clients.png",
      category: "Client Acquisition",
      readTime: "5 min read",
      tags: ["Client Acquisition", "Marketing", "Business Growth"],
    },
    {
      id: "2",
      title: "Boosting Client Retention: Michael's Studio Success Story",
      description: "Michael Chen shares how he reduced client churn by 75% using FitTrack's engagement features.",
      image: "/fitness-studio-clients.png",
      category: "Client Retention",
      readTime: "4 min read",
      tags: ["Client Retention", "Engagement", "Studio Management"],
    },
    {
      id: "3",
      title: "Building a Thriving Online Fitness Community",
      description: "Emma Wilson explains how she built an engaged online community of 5,000+ members.",
      image: "/online-fitness-community.png",
      category: "Community Building",
      readTime: "6 min read",
      tags: ["Community", "Online Coaching", "Engagement"],
    },
    {
      id: "4",
      title: "Scaling 1:1 Coaching: James' Journey to 6 Figures",
      description: "How James Rodriguez optimized his coaching business to serve more clients without burnout.",
      image: "/personal-trainer-coaching.png",
      category: "Business Growth",
      readTime: "7 min read",
      tags: ["Scaling", "Productivity", "Income Growth"],
    },
    {
      id: "5",
      title: "From Group Classes to Premium Coaching: Olivia's Transformation",
      description: "Olivia Smith shares how she transitioned from group fitness to high-ticket coaching programs.",
      image: "/group-fitness-class.png",
      category: "Business Model",
      readTime: "5 min read",
      tags: ["Business Model", "Premium Services", "Transformation"],
    },
    {
      id: "6",
      title: "Streamlining Operations: David's Studio Efficiency Story",
      description: "How David Kim reduced administrative work by 80% and focused more on coaching clients.",
      image: "/fitness-studio-management.png",
      category: "Productivity",
      readTime: "4 min read",
      tags: ["Productivity", "Operations", "Time Management"],
    },
  ])

  const categories = [
    "All",
    "Client Acquisition",
    "Client Retention",
    "Community Building",
    "Business Growth",
    "Productivity",
  ]

  return (
    <div className="mt-6">
      <Tabs defaultValue="All">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="min-w-max">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies
                .filter((study) => category === "All" || study.category === category)
                .map((study) => (
                  <Card key={study.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{study.category}</Badge>
                        <span className="text-sm text-muted-foreground">{study.readTime}</span>
                      </div>
                      <CardTitle className="text-xl">{study.title}</CardTitle>
                      <CardDescription>{study.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => handleViewDetails(`Case Study: ${study.title}`)}>
                            Read Case Study
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{study.title}</DialogTitle>
                            <DialogDescription>
                              {study.category} • {study.readTime}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                              <img
                                src={study.image || "/placeholder.svg"}
                                alt={study.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="space-y-4">
                              <p className="text-lg font-medium">Challenge</p>
                              <p>
                                {study.description} As a {study.category.toLowerCase()} focused professional, they faced
                                significant challenges in scaling their business and maintaining client satisfaction
                                while managing their growing workload.
                              </p>

                              <p className="text-lg font-medium">Solution</p>
                              <p>
                                By implementing FitTrack's comprehensive platform, they were able to streamline their
                                workflow, automate routine tasks, and focus more on delivering exceptional service to
                                their clients. The platform's analytics and client management features were particularly
                                valuable in identifying growth opportunities.
                              </p>

                              <p className="text-lg font-medium">Results</p>
                              <p>
                                After six months of using FitTrack, they experienced significant improvements in client
                                retention, business efficiency, and overall revenue. The automated follow-ups and
                                personalized workout plans helped maintain high client engagement and satisfaction.
                              </p>

                              <div className="flex flex-wrap gap-2 mt-4">
                                {study.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
