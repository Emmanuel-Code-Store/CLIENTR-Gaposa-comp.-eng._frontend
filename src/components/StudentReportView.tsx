'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Printer, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function StudentReportView() {
  const router = useRouter()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Student Report Card</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Card className="border-t-8 border-t-blue-600">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-2">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="School logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold">Springfield Elementary School</h2>
            <p className="text-muted-foreground">123 Education St, Springfield</p>
            <h3 className="mt-4 text-xl font-semibold">STUDENT PROGRESS REPORT</h3>
            <p className="text-muted-foreground">First Term - Academic Year 2023-2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold w-32">Student Name:</span>
                <span>John Smith</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Student ID:</span>
                <span>ST-2023-001</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Grade/Class:</span>
                <span>Grade 1 - Section A</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold w-32">Term:</span>
                <span>First Term</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Academic Year:</span>
                <span>2023-2024</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Report Date:</span>
                <span>October 15, 2023</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Academic Performance</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Test Score</TableHead>
                    <TableHead className="text-center">Exam Score</TableHead>
                    <TableHead className="text-center">Total Score</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mathematics</TableCell>
                    <TableCell className="text-center">38/40</TableCell>
                    <TableCell className="text-center">54/60</TableCell>
                    <TableCell className="text-center">92/100</TableCell>
                    <TableCell className="text-center font-semibold">A</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">English Language</TableCell>
                    <TableCell className="text-center">35/40</TableCell>
                    <TableCell className="text-center">50/60</TableCell>
                    <TableCell className="text-center">85/100</TableCell>
                    <TableCell className="text-center font-semibold">B</TableCell>
                    <TableCell>Very Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Science</TableCell>
                    <TableCell className="text-center">37/40</TableCell>
                    <TableCell className="text-center">52/60</TableCell>
                    <TableCell className="text-center">89/100</TableCell>
                    <TableCell className="text-center font-semibold">B</TableCell>
                    <TableCell>Very Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Social Studies</TableCell>
                    <TableCell className="text-center">39/40</TableCell>
                    <TableCell className="text-center">55/60</TableCell>
                    <TableCell className="text-center">94/100</TableCell>
                    <TableCell className="text-center font-semibold">A</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Art</TableCell>
                    <TableCell className="text-center">38/40</TableCell>
                    <TableCell className="text-center">53/60</TableCell>
                    <TableCell className="text-center">91/100</TableCell>
                    <TableCell className="text-center font-semibold">A</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Physical Education</TableCell>
                    <TableCell className="text-center">36/40</TableCell>
                    <TableCell className="text-center">51/60</TableCell>
                    <TableCell className="text-center">87/100</TableCell>
                    <TableCell className="text-center font-semibold">B</TableCell>
                    <TableCell>Very Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Music</TableCell>
                    <TableCell className="text-center">37/40</TableCell>
                    <TableCell className="text-center">52/60</TableCell>
                    <TableCell className="text-center">89/100</TableCell>
                    <TableCell className="text-center font-semibold">B</TableCell>
                    <TableCell>Very Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Computer Studies</TableCell>
                    <TableCell className="text-center">39/40</TableCell>
                    <TableCell className="text-center">56/60</TableCell>
                    <TableCell className="text-center">95/100</TableCell>
                    <TableCell className="text-center font-semibold">A</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90.25%</div>
                <p className="text-xs text-muted-foreground">Grade: A (Excellent)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Class Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3rd</div>
                <p className="text-xs text-muted-foreground">Out of 32 students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">19 out of 20 school days</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Character Development</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trait</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Punctuality</TableCell>
                    <TableCell className="text-center">Excellent</TableCell>
                    <TableCell>Always arrives on time</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Neatness</TableCell>
                    <TableCell className="text-center">Very Good</TableCell>
                    <TableCell>Maintains a clean and organized workspace</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Behavior</TableCell>
                    <TableCell className="text-center">Excellent</TableCell>
                    <TableCell>Well-behaved and respectful</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Participation</TableCell>
                    <TableCell className="text-center">Very Good</TableCell>
                    <TableCell>Actively participates in class activities</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Teamwork</TableCell>
                    <TableCell className="text-center">Excellent</TableCell>
                    <TableCell>Works well with others</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h4 className="font-semibold mb-1">Class Teacher&apos;s Comment:</h4>
                <p>
                  John is an exceptional student who consistently demonstrates a strong work ethic and enthusiasm for
                  learning. He excels in all subjects, particularly in Mathematics and Social Studies. He is always
                  willing to help his peers and contributes positively to class discussions. Keep up the excellent work,
                  John!
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="font-semibold mb-1">Principal&apos;s Comment:</h4>
                <p>
                  John has shown remarkable academic progress this term. His dedication to his studies and exemplary
                  behavior make him a role model for his peers. We are proud of his achievements and encourage him to
                  maintain this standard. Well done!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-16">
                <Image
                  src="/placeholder.svg?height=64&width=128"
                  alt="Class Teacher's Signature"
                  width={128}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="mt-2 pt-2 border-t w-48 text-center">
                <p className="font-semibold">Mrs. Rebecca Johnson</p>
                <p className="text-sm text-muted-foreground">Class Teacher</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16">
                <Image
                  src="/placeholder.svg?height=64&width=128"
                  alt="Principal's Signature"
                  width={128}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="mt-2 pt-2 border-t w-48 text-center">
                <p className="font-semibold">Dr. Jane Smith</p>
                <p className="text-sm text-muted-foreground">Principal</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block p-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="School Stamp"
                width={80}
                height={80}
                className="object-contain mx-auto opacity-50"
              />
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>This report was generated on October 15, 2023</p>
            <p>Springfield Elementary School - Nurturing Minds, Building Futures</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}