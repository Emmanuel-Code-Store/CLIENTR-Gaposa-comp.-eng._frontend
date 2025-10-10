// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { format } from "date-fns"
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Download,
//   Edit,
//   Eye,
//   FileText,
//   MoreVertical,
//   Printer,
//   Share2,
//   Star,
//   Tag,
//   Trash2,
//   User,
//   Plus,
// } from "lucide-react"

// // Mock data for a single eNote
// const mockENote = {









"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  MoreVertical,
  Printer,
  Share2,
  Star,
  Tag,
  Trash2,
  User,
  Plus,
} from "lucide-react"

// ----------------- Types -----------------
interface Author {
  id: string
  name: string
  avatar: string
  email: string
  department: string
}

interface Attachment {
  id: string
  name: string
  size: string
  type: string
  url: string
}

interface Collaborator {
  id: string
  name: string
  avatar: string
}

interface ENote {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  author: Author
  category: string
  tags: string[]
  status: string
  priority: string
  attachments: Attachment[]
  collaborators: Collaborator[]
  version: string
  isStarred: boolean
  viewCount: number
}

// ----------------- Mock Data -----------------
const mockENote: ENote = {
  id: "note-123456",
  title: "Project Requirements Documentation",
  content: `# Project Overview

This document outlines the requirements for the new customer portal project.

## Key Features

1. **User Authentication**
   - Email/password login
   - Social media integration
   - Two-factor authentication

2. **Dashboard**
   - Activity summary
   - Recent transactions
   - Quick actions menu

3. **Account Management**
   - Profile editing
   - Subscription management
   - Payment methods

## Timeline

- **Phase 1**: Authentication and basic profile (2 weeks)
- **Phase 2**: Dashboard and account features (3 weeks)
- **Phase 3**: Payment integration and testing (2 weeks)

## Technical Requirements

- React frontend with TypeScript
- Node.js backend with Express
- MongoDB database
- AWS hosting environment

Please refer to the attached technical specification for detailed API requirements.`,
  createdAt: new Date(2023, 10, 15, 9, 30),
  updatedAt: new Date(2023, 10, 18, 14, 45),
  author: {
    id: "user-789",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "alex.johnson@example.com",
    department: "Product Development",
  },
  category: "Documentation",
  tags: ["requirements", "project", "development"],
  status: "Active",
  priority: "High",
  attachments: [
    {
      id: "attach-1",
      name: "technical_specs.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      url: "#",
    },
    {
      id: "attach-2",
      name: "wireframes.zip",
      size: "5.7 MB",
      type: "application/zip",
      url: "#",
    },
  ],
  collaborators: [
    {
      id: "user-456",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "user-789",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  version: "1.2",
  isStarred: true,
  viewCount: 24,
}

// Simple Markdown renderer (in a real app, you'd use a proper Markdown library)
function renderMarkdown(markdown: string) {
  // This is a very simplified markdown renderer
  // In a real app, use a library like react-markdown
  const html = markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/\n\n/g, "<br/><br/>")

  return { __html: html }
}

export default function ENotePage() {
  const router = useRouter()
  const params = useParams()
  const [note] = useState<ENote>(mockENote) 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  // In a real app, you would fetch the note data based on the ID
  useEffect(() => {
    // Example fetch call (commented out)
    // const fetchNote = async () => {
    //   try {
    //     const response = await fetch(`/api/enotes/${params.id}`);
    //     const data = await response.json();
    //     setNote(data);
    //   } catch (error) {
    //     console.error("Error fetching note:", error);
    //   }
    // };
    // fetchNote();

    // For demo purposes, we're using the mock data
    console.log("Note ID:", params.id)
  }, [params.id])

  const handleDelete = () => {
    // In a real app, you would make an API call to delete the note
    console.log("Deleting note:", note.id)
    setIsDeleteDialogOpen(false)
    router.push("/enotes")
  }

  const handleShare = (email: string) => {
    // In a real app, you would make an API call to share the note
    console.log("Sharing note:", note.id, "with:", email)
    setIsShareDialogOpen(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, you would generate a downloadable file
    console.log("Downloading note:", note.id)
  }

  if (!note) {
    return <div className="container mx-auto py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push("/enotes")} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">Created: {format(note.createdAt, "MMM d, yyyy")}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">Last updated: {format(note.updatedAt, "MMM d, yyyy 'at' h:mm a")}</span>
            <Eye className="h-4 w-4 mr-1" />
            <span>{note.viewCount} views</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={() => setIsShareDialogOpen(true)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={() => router.push(`/enotes/edit/${note.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/enotes/version-history/${note.id}`)}>
                <FileText className="h-4 w-4 mr-2" />
                Version History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw Content</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="print:shadow-none">
                <CardContent className="p-6">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={renderMarkdown(note.content)} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="raw">
              <Card>
                <CardContent className="p-6">
                  <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm font-mono">{note.content}</pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {note.attachments.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {note.attachments.map((attachment: Attachment) => (
                    <li key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-blue-500" />
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-sm text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Note Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium">Author</h3>
                </div>
                <div className="flex items-center ml-6">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                    <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{note.author.name}</p>
                    <p className="text-sm text-gray-500">{note.author.department}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium">Category & Tags</h3>
                </div>
                <div className="ml-6">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-2">{note.category}</Badge>
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium">Status & Priority</h3>
                </div>
                <div className="ml-6 flex space-x-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{note.status}</Badge>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{note.priority}</Badge>
                </div>
              </div>

              {note.collaborators.length > 0 && (
                <div>
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <h3 className="font-medium">Collaborators</h3>
                  </div>
                  <div className="ml-6">
                    <div className="flex -space-x-2">
                      {note.collaborators.map((collaborator: Collaborator) => (
                        <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                          <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full ml-1"
                        onClick={() => setIsShareDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium">Version</h3>
                </div>
                <div className="ml-6">
                  <p>
                    Version {note.version}{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => router.push(`/enotes/version-history/${note.id}`)}
                    >
                      View history
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                  <h4 className="font-medium">Technical Specification</h4>
                  <p className="text-sm text-gray-500">Updated 3 days ago</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                  <h4 className="font-medium">UI/UX Design Guidelines</h4>
                  <p className="text-sm text-gray-500">Updated 1 week ago</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                  <h4 className="font-medium">Project Timeline</h4>
                  <p className="text-sm text-gray-500">Updated 2 weeks ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Related Notes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Note</DialogTitle>
            <DialogDescription>Share this note with team members or external collaborators.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="Enter email address" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permission">Permission</Label>
              <select
                id="permission"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="view">Can view</option>
                <option value="comment">Can comment</option>
                <option value="edit">Can edit</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea id="message" placeholder="Add a message..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleShare("example@example.com")}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}