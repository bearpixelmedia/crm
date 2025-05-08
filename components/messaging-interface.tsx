"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, Smile } from "lucide-react"

export function MessagingInterface() {
  const [clients] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "Thanks for the workout plan!",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      lastMessage: "I'll try to complete the workout today",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Emma Wilson",
      lastMessage: "How should I modify the exercise?",
      time: "Yesterday",
      unread: 1,
      online: true,
    },
    {
      id: "4",
      name: "James Rodriguez",
      lastMessage: "Looking forward to our session tomorrow",
      time: "Monday",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Olivia Smith",
      lastMessage: "I've updated my measurements in the app",
      time: "Sunday",
      unread: 0,
      online: false,
    },
  ])

  const [messages] = useState([
    {
      id: "1",
      sender: "client",
      text: "Hi! I wanted to ask about the new workout program you sent me.",
      time: "10:15 AM",
    },
    {
      id: "2",
      sender: "trainer",
      text: "Of course! What questions do you have about it?",
      time: "10:18 AM",
    },
    {
      id: "3",
      sender: "client",
      text: "For the squat exercise, should I be using a barbell or dumbbells?",
      time: "10:20 AM",
    },
    {
      id: "4",
      sender: "trainer",
      text: "Great question! For the first two weeks, I recommend using dumbbells to focus on form. After that, we can transition to a barbell to increase the weight.",
      time: "10:25 AM",
    },
    {
      id: "5",
      sender: "client",
      text: "That makes sense. Thanks for the workout plan!",
      time: "10:30 AM",
    },
  ])

  const [selectedClient, setSelectedClient] = useState(clients[0])
  const [newMessage, setNewMessage] = useState("")

  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="grid grid-cols-12 h-[600px]">
          {/* Client List */}
          <div className="col-span-3 border-r h-full overflow-y-auto">
            <div className="p-4">
              <Input placeholder="Search conversations..." className="mb-4" />
              <div className="space-y-2">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted/50 ${
                      selectedClient.id === client.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=40&width=40&query=${client.name}`}
                          alt={client.name}
                        />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {client.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <div className="font-medium truncate">{client.name}</div>
                        <div className="text-xs text-muted-foreground">{client.time}</div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">{client.lastMessage}</div>
                    </div>
                    {client.unread > 0 && (
                      <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        {client.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-9 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`/abstract-geometric-shapes.png?height=40&width=40&query=${selectedClient.name}`}
                    alt={selectedClient.name}
                  />
                  <AvatarFallback>
                    {selectedClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedClient.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedClient.online ? "Online" : "Offline"}</div>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "trainer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "trainer" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div>{message.text}</div>
                    <div
                      className={`text-xs mt-1 ${message.sender === "trainer" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
