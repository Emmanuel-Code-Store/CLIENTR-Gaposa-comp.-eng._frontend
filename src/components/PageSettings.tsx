import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus } from "lucide-react"

export default function PageSettings() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Page Settings</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Page
        </Button>
      </div>

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Pages</CardTitle>
              <CardDescription>View and manage all pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Input placeholder="Search pages..." className="max-w-sm" />
                <Button variant="outline">Search</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Home</TableCell>
                    <TableCell>/</TableCell>
                    <TableCell>Home Template</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Published
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">About Us</TableCell>
                    <TableCell>/about</TableCell>
                    <TableCell>Standard Page</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Published
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Contact</TableCell>
                    <TableCell>/contact</TableCell>
                    <TableCell>Contact Template</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Published
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Programs</TableCell>
                    <TableCell>/programs</TableCell>
                    <TableCell>Listing Template</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Draft
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 4 of 24 pages</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Templates</CardTitle>
              <CardDescription>Manage the templates used for creating new pages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Pages Using</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Home Template</TableCell>
                    <TableCell>Template for the homepage with hero section and featured content</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Standard Page</TableCell>
                    <TableCell>Basic page template with header, content area, and sidebar</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Contact Template</TableCell>
                    <TableCell>Template with contact form and map integration</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Listing Template</TableCell>
                    <TableCell>Template for displaying lists of items with filtering</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menus</CardTitle>
              <CardDescription>Configure the navigation menus for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Navigation</Label>
                <div className="rounded-md border p-4">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>Home</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>About Us</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>Programs</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>Contact</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Menu Item
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Footer Navigation</Label>
                <div className="rounded-md border p-4">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>Privacy Policy</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>Terms of Service</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <span>Contact</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Menu Item
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Navigation</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Permissions</CardTitle>
              <CardDescription>Configure who can view and edit pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Page Permissions</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="view-public" defaultChecked />
                    <Label htmlFor="view-public">Public pages are visible to all users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="require-login" />
                    <Label htmlFor="require-login">Require login to view all pages</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Role-Based Permissions</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>View Pages</TableHead>
                      <TableHead>Edit Pages</TableHead>
                      <TableHead>Create Pages</TableHead>
                      <TableHead>Delete Pages</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Administrator</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Editor</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Author</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Subscriber</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Permissions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
