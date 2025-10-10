"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Search,
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Home,
  Compass,
  Clock,
  ThumbsUp,
  Settings,
  Bell,
  Menu,
  Star,
  Eye,
  Calendar,
  Monitor,
  Camera,
  Video,
  RepeatIcon as Record,
  RotateCcw,
  Layers,
  Wifi,
  WifiOff,
  AirplayIcon as Broadcast,
  VideoIcon,
  Plus,
  Trash2,
  LayoutIcon,
  SlidersHorizontal,
  Sliders,
  Users,
  Globe,
  HardDrive,
  Moon,
  Sun,
  BarChart2,
  Share2,
  Bookmark,
  BookmarkPlus,
  History,
  Trash,
  HelpCircle,
  LogOut,
} from "lucide-react"

export default function LiveStream() {
  const [currentMode, setCurrentMode] = useState<"viewer" | "producer">("viewer")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  // Viewer Mode States
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(35)
  const [videoVolume, setVideoVolume] = useState(70)
  const [subtitles, setSubtitles] = useState(false)
  const [quality, setQuality] = useState("1080p")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [viewerSettings, setViewerSettings] = useState({
    notifications: true,
    autoplay: true,
    darkMode: true,
    subtitlesLanguage: "English",
    downloadQuality: "1080p",
    restrictedMode: false,
    location: "United States",
  })

  // Producer Mode States
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [streamDuration, setStreamDuration] = useState(0)
  const [viewers, setViewers] = useState(0)
  const [bitrate, setBitrate] = useState(2500)
  const [fps, setFps] = useState(30)

  const [activeScene, setActiveScene] = useState("scene1")
  const [streamKey, setStreamKey] = useState("****-****-****-****")
  const [streamPlatform, setStreamPlatform] = useState("custom")
  const [streamTitle, setStreamTitle] = useState("My Awesome Stream")
  const [streamDescription, setStreamDescription] = useState("Welcome to my live stream!")
  const [streamTags, setStreamTags] = useState("gaming,live,tutorial")
  const [streamPrivacy, setStreamPrivacy] = useState("public")
  const [streamLatency, setStreamLatency] = useState("normal")
  const [streamResolution] = useState("1080p")
  const [streamCodec, setStreamCodec] = useState("h264")
  const [streamServer, setStreamServer] = useState("rtmp://live.example.com/app")

  // Audio Mixer States
  const [audioChannels, setAudioChannels] = useState([
    { id: "master", name: "Master", level: 75, muted: false, solo: false, gain: 0, pan: 0, fx: [] },
    { id: "mic", name: "Microphone", level: 80, muted: false, solo: false, gain: 0, pan: 0, fx: ["noise_reduction"] },
    { id: "system", name: "System Audio", level: 60, muted: false, solo: false, gain: 0, pan: 0, fx: [] },
    {
      id: "music",
      name: "Background Music",
      level: 40,
      muted: false,
      solo: false,
      gain: -5,
      pan: 0,
      fx: ["equalizer"],
    },
    { id: "sfx", name: "Sound Effects", level: 50, muted: false, solo: false, gain: 0, pan: 0, fx: [] },
  ])

  // Sources States
  const [inputSources, setInputSources] = useState([
    { id: "camera1", name: "Camera 1", type: "camera", active: true, settings: { resolution: "1080p", fps: 30 } },
    { id: "camera2", name: "Camera 2", type: "camera", active: false, settings: { resolution: "720p", fps: 30 } },
    { id: "screen", name: "Screen Share", type: "screen", active: false, settings: { resolution: "1080p", fps: 60 } },
    { id: "media", name: "Media Player", type: "media", active: false, settings: { file: "intro.mp4" } },
    {
      id: "browser",
      name: "Browser Source",
      type: "browser",
      active: false,
      settings: { url: "https://app.com" },
    },
  ])

  // Scenes States
  const [scenes] = useState([
    {
      id: "scene1",
      name: "Main Scene",
      sources: ["camera1", "browser"],
      layout: "standard",
      transition: "fade",
      transitionDuration: 500,
    },
    {
      id: "scene2",
      name: "Game Scene",
      sources: ["screen", "camera1"],
      layout: "picture-in-picture",
      transition: "slide",
      transitionDuration: 800,
    },
    {
      id: "scene3",
      name: "Interview Scene",
      sources: ["camera1", "camera2"],
      layout: "split-screen",
      transition: "fade",
      transitionDuration: 500,
    },
    {
      id: "scene4",
      name: "Break Scene",
      sources: ["media", "browser"],
      layout: "fullscreen",
      transition: "fade",
      transitionDuration: 1000,
    },
  ])

  
  // useEffect(() => {
  //   let interval: NodeJS.Timeout
  //   if (isStreaming) {
  //     interval = setInterval(() => {
  //       setStreamDuration((prev) => prev + 1)
  //       setViewers((prev) => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
  //       setBitrate((prev) => {
  //         const variation = Math.floor(Math.random() * 200) - 100
  //         return Math.max(500, Math.min(8000, prev + variation))
  //       })
  //       setFps((prev) => {
  //         const variation = Math.random() < 0.1 ? Math.floor(Math.random() * 5) - 2 : 0
  //         return Math.max(24, Math.min(60, prev + variation))
  //       })
  //     }, 1000)
  //   }
  //   return () => clearInterval(interval)
  // }, [isStreaming])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStreaming) {
      interval = setInterval(() => {
        setStreamDuration((prev) => prev + 1)
        setViewers((prev) => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
        setBitrate((prev) => {
          const variation = Math.floor(Math.random() * 200) - 100
          return Math.max(500, Math.min(8000, prev + variation))
        })
        setFps((prev) => {
          const variation = Math.random() < 0.1 ? Math.floor(Math.random() * 5) - 2 : 0
          return Math.max(24, Math.min(60, prev + variation))
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartStream = () => {
    setIsStreaming(true)
    setViewers(Math.floor(Math.random() * 50) + 10)
  }

  const handleStopStream = () => {
    setIsStreaming(false)
    setStreamDuration(0)
    setViewers(0)
  }

  const categories = ["Trending", "Movies", "TV Shows", "Documentaries", "Sports", "Music", "Gaming", "News"]

  const videos = [
    {
      id: 1,
      title: "Epic Adventure Movie Trailer",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "2:34",
      views: "1.2M",
      uploadDate: "2 days ago",
      channel: "MovieTrailers",
      channelAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      isLive: false,
    },
    {
      id: 2,
      title: "🔴 LIVE: Tech Review Stream",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "LIVE",
      views: "856",
      uploadDate: "streaming now",
      channel: "TechReviews",
      channelAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      isLive: true,
    },
    {
      id: 3,
      title: "Cooking Masterclass: Italian Cuisine",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "28:15",
      views: "432K",
      uploadDate: "3 days ago",
      channel: "ChefMaster",
      channelAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      isLive: false,
    },
    {
      id: 4,
      title: "🔴 LIVE: Gaming Tournament",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "LIVE",
      views: "2.1K",
      uploadDate: "streaming now",
      channel: "GameHub",
      channelAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      isLive: true,
    },
  ]

  const toggleAudioChannelMute = (channelId: string) => {
    setAudioChannels(
      audioChannels.map((channel) => (channel.id === channelId ? { ...channel, muted: !channel.muted } : channel)),
    )
  }

  const updateAudioChannelLevel = (channelId: string, level: number[]) => {
    setAudioChannels(
      audioChannels.map((channel) => (channel.id === channelId ? { ...channel, level: level[0] } : channel)),
    )
  }

  const toggleSourceActive = (sourceId: string) => {
    setInputSources(
      inputSources.map((source) => (source.id === sourceId ? { ...source, active: !source.active } : source)),
    )
  }

  const switchScene = (sceneId: string) => {
    setActiveScene(sceneId)
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Unified Header */}
      <header
        className={`sticky top-0 z-50 border-b ${theme === "dark" ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-gray-200"
          } backdrop-blur supports-[backdrop-filter]:bg-opacity-60`}
      >
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <Play className="h-4 w-4 text-primary-foreground fill-current" />
            </div>
            <span className="font-bold text-xl">StreamFlix Pro</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2 ml-6">
            <Button
              variant={currentMode === "viewer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentMode("viewer")}
            >
              <VideoIcon className="h-4 w-4 mr-2" />
              Watch
            </Button>
            <Button
              variant={currentMode === "producer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentMode("producer")}
            >
              <Broadcast className="h-4 w-4 mr-2" />
              Stream
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search videos, channels, playlists..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            {currentMode === "producer" && (
              <>
                <Badge
                  variant={isStreaming ? "destructive" : "secondary"}
                  className={isStreaming ? "animate-pulse" : ""}
                >
                  {isStreaming ? "LIVE" : "OFFLINE"}
                </Badge>
                {isRecording && (
                  <Badge variant="destructive" className="animate-pulse">
                    <Record className="h-3 w-3 mr-1" />
                    REC
                  </Badge>
                )}
                <div className="text-sm text-muted-foreground">
                  {viewers} viewers • {formatTime(streamDuration)}
                </div>
              </>
            )}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="mr-2"
                  >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Unified Sidebar */}
        <aside
          className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden border-r ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
        >
          <div className="p-4 space-y-4">
            {/* Viewer Navigation */}
            {currentMode === "viewer" && (
              <>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-3 h-4 w-4" />
                    Home
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Compass className="mr-3 h-4 w-4" />
                    Explore
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Clock className="mr-3 h-4 w-4" />
                    Watch Later
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ThumbsUp className="mr-3 h-4 w-4" />
                    Liked Videos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <History className="mr-3 h-4 w-4" />
                    History
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bookmark className="mr-3 h-4 w-4" />
                    Subscriptions
                  </Button>
                </nav>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2 px-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button key={category} variant="ghost" className="w-full justify-start text-sm">
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Producer Navigation */}
            {currentMode === "producer" && (
              <>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Monitor className="mr-3 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Camera className="mr-3 h-4 w-4" />
                    Sources
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Layers className="mr-3 h-4 w-4" />
                    Scenes
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Volume2 className="mr-3 h-4 w-4" />
                    Audio Mixer
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart2 className="mr-3 h-4 w-4" />
                    Analytics
                  </Button>
                </nav>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2 px-3">Stream Status</h3>
                  <div className="space-y-2 px-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Connection</span>
                      {isStreaming ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Viewers</span>
                      <span>{viewers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Bitrate</span>
                      <span>{bitrate} kbps</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="border-t pt-4">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-3 h-4 w-4" />
                Help & Support
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-500">
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {currentMode === "viewer" ? (
            /* VIEWER MODE - YouTube-like Interface */
            <div className="p-6">
              {/* Featured Video Player */}
              <div className="mb-8">
                <Card className="overflow-hidden">
                  <div className="relative aspect-video bg-black">
                    <Image
                      src="/placeholder.svg?height=480&width=854"
                      alt="Featured Video"
                      className="w-full h-full object-cover"
                    />

                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <Slider
                            value={[videoProgress]}
                            onValueChange={(value) => setVideoProgress(value[0])}
                            max={100}
                            step={1}
                            className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-red-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-red-500"
                          />
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="text-white hover:bg-white/20"
                            >
                              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                            </Button>

                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <SkipBack className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <SkipForward className="h-5 w-5" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setIsMuted(!isMuted)}
                              className="text-white hover:bg-white/20"
                            >
                              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                            </Button>

                            <div className="w-24">
                              <Slider
                                value={[videoVolume]}
                                onValueChange={(value) => setVideoVolume(value[0])}
                                max={100}
                                step={1}
                                className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
                              />
                            </div>

                            <span className="text-sm">2:34 / 15:42</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                  {quality}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-40">
                                <div className="space-y-1">
                                  <Button
                                    variant={quality === "2160p" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("2160p")}
                                  >
                                    2160p (4K)
                                  </Button>
                                  <Button
                                    variant={quality === "1440p" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("1440p")}
                                  >
                                    1440p (2K)
                                  </Button>
                                  <Button
                                    variant={quality === "1080p" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("1080p")}
                                  >
                                    1080p (HD)
                                  </Button>
                                  <Button
                                    variant={quality === "720p" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("720p")}
                                  >
                                    720p
                                  </Button>
                                  <Button
                                    variant={quality === "480p" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("480p")}
                                  >
                                    480p
                                  </Button>
                                  <Button
                                    variant={quality === "360p" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("360p")}
                                  >
                                    360p
                                  </Button>
                                  <Button
                                    variant={quality === "auto" ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setQuality("auto")}
                                  >
                                    Auto
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                  {playbackSpeed}x
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-40">
                                <div className="space-y-1">
                                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                                    <Button
                                      key={speed}
                                      variant={playbackSpeed === speed ? "default" : "ghost"}
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => setPlaybackSpeed(speed)}
                                    >
                                      {speed}x
                                    </Button>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <Maximize className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">Epic Adventure: The Journey Begins</h1>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            2.4M views
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />2 days ago
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>4.8</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>MC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">MovieCinema</p>
                            <p className="text-sm text-muted-foreground">1.2M subscribers</p>
                          </div>
                          <Button>Subscribe</Button>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Like
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookmarkPlus className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Viewer Settings Dialog */}
              <Tabs defaultValue="recommended" className="mb-8">
                <TabsList>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="recommended">
                  {/* Video Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Recommended for you</h2>
                      <div className="flex space-x-2">
                        {categories.slice(0, 4).map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {videos.map((video) => (
                        <Card
                          key={video.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                            {video.isLive && (
                              <div className="absolute top-2 left-2">
                                <Badge variant="destructive" className="animate-pulse">
                                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                                  LIVE
                                </Badge>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 fill-current" />
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={video.channelAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{video.channel[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">{video.channel}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <span>
                                  {video.views} {video.isLive ? "watching" : "views"}
                                </span>
                                <span>•</span>
                                <span>{video.uploadDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                <span>{video.rating}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="trending">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos
                      .slice()
                      .reverse()
                      .map((video) => (
                        <Card
                          key={video.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                            {video.isLive && (
                              <div className="absolute top-2 left-2">
                                <Badge variant="destructive" className="animate-pulse">
                                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                                  LIVE
                                </Badge>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 fill-current" />
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={video.channelAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{video.channel[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">{video.channel}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <span>
                                  {video.views} {video.isLive ? "watching" : "views"}
                                </span>
                                <span>•</span>
                                <span>{video.uploadDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                <span>{video.rating}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="subscriptions">
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No subscriptions yet</h3>
                    <p className="text-muted-foreground mb-4">Subscribe to channels to see their latest videos here</p>
                    <Button>Browse Channels</Button>
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Viewer Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Playback Settings</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="autoplay">Autoplay videos</Label>
                              <Switch
                                id="autoplay"
                                checked={viewerSettings.autoplay}
                                onCheckedChange={(checked) =>
                                  setViewerSettings({ ...viewerSettings, autoplay: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="subtitles">Enable subtitles by default</Label>
                              <Switch
                                id="subtitles"
                                checked={subtitles}
                                onCheckedChange={(checked) => setSubtitles(checked)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Default Quality</Label>
                            <Select
                              value={viewerSettings.downloadQuality}
                              onValueChange={(value) =>
                                setViewerSettings({ ...viewerSettings, downloadQuality: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Auto</SelectItem>
                                <SelectItem value="1080p">1080p</SelectItem>
                                <SelectItem value="720p">720p</SelectItem>
                                <SelectItem value="480p">480p</SelectItem>
                                <SelectItem value="360p">360p</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Subtitles Language</Label>
                            <Select
                              value={viewerSettings.subtitlesLanguage}
                              onValueChange={(value) =>
                                setViewerSettings({ ...viewerSettings, subtitlesLanguage: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Spanish">Spanish</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                                <SelectItem value="Japanese">Japanese</SelectItem>
                                <SelectItem value="Chinese">Chinese</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Account Settings</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="notifications">Enable notifications</Label>
                              <Switch
                                id="notifications"
                                checked={viewerSettings.notifications}
                                onCheckedChange={(checked) =>
                                  setViewerSettings({ ...viewerSettings, notifications: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="darkMode">Dark mode</Label>
                              <Switch
                                id="darkMode"
                                checked={viewerSettings.darkMode}
                                onCheckedChange={(checked) =>
                                  setViewerSettings({ ...viewerSettings, darkMode: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="restrictedMode">Restricted mode</Label>
                              <Switch
                                id="restrictedMode"
                                checked={viewerSettings.restrictedMode}
                                onCheckedChange={(checked) =>
                                  setViewerSettings({ ...viewerSettings, restrictedMode: checked })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Content Location</Label>
                            <Select
                              value={viewerSettings.location}
                              onValueChange={(value) => setViewerSettings({ ...viewerSettings, location: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="United States">United States</SelectItem>
                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="Australia">Australia</SelectItem>
                                <SelectItem value="Germany">Germany</SelectItem>
                                <SelectItem value="France">France</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="pt-4">
                            <Button variant="destructive" size="sm">
                              <Trash className="h-4 w-4 mr-2" />
                              Clear Watch History
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            /* PRODUCER MODE - vMix-like Interface */
            <div className="h-[calc(100vh-64px)] bg-gray-900 text-white">
              <div className="flex h-full">
                {/* Main Preview Area */}
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {/* Program Output */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between text-white">
                          <span className="flex items-center">
                            <Monitor className="h-5 w-5 mr-2" />
                            Program Output
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Maximize className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=360&width=640&text=Live Stream Output"
                            alt="Program Output"
                            className="w-full h-full object-cover"
                          />
                          {isStreaming && (
                            <div className="absolute top-4 left-4">
                              <Badge variant="destructive" className="animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                LIVE
                              </Badge>
                            </div>
                          )}
                          <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-sm">
                            1920x1080 • {fps}fps
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between text-white">
                          <span className="flex items-center">
                            <Eye className="h-5 w-5 mr-2" />
                            Preview
                          </span>
                          <Button variant="ghost" size="sm">
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=360&width=640&text=Preview Window"
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-sm">Preview</div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Scenes Panel */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between text-white">
                          <span className="flex items-center">
                            <LayoutIcon className="h-5 w-5 mr-2" />
                            Scenes
                          </span>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100%-40px)] pr-4">
                          <div className="space-y-1 p-2">
                            {scenes.map((scene) => (
                              <div
                                key={scene.id}
                                className={`flex items-center justify-between p-2 rounded cursor-pointer ${activeScene === scene.id ? "bg-primary text-primary-foreground" : "hover:bg-gray-700"
                                  }`}
                                onClick={() => switchScene(scene.id)}
                              >
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${activeScene === scene.id ? "bg-white" : "bg-gray-500"
                                      }`}
                                  ></div>
                                  <span>{scene.name}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Badge variant="outline" className="text-xs">
                                    {scene.layout}
                                  </Badge>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Settings className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="p-2 border-t border-gray-700">
                        <div className="w-full flex items-center justify-between">
                          <div className="space-x-1">
                            <Button variant="ghost" size="sm">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Transition
                            </Button>
                          </div>
                          <Select defaultValue="fade">
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fade">Fade</SelectItem>
                              <SelectItem value="cut">Cut</SelectItem>
                              <SelectItem value="slide">Slide</SelectItem>
                              <SelectItem value="wipe">Wipe</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardFooter>
                    </Card>

                    {/* Audio Mixer */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between text-white">
                          <span className="flex items-center">
                            <Volume2 className="h-5 w-5 mr-2" />
                            Audio Mixer
                          </span>
                          <Button variant="ghost" size="sm">
                            <SlidersHorizontal className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100%-40px)]">
                          <div className="space-y-1 p-2">
                            {audioChannels.map((channel) => (
                              <div key={channel.id} className="p-2 rounded hover:bg-gray-700">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => toggleAudioChannelMute(channel.id)}
                                    >
                                      {channel.muted ? (
                                        <VolumeX className="h-4 w-4" />
                                      ) : (
                                        <Volume2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <span className="text-sm">{channel.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {channel.fx.length > 0 && (
                                      <Badge variant="outline" className="text-xs">
                                        FX
                                      </Badge>
                                    )}
                                    <span className="text-xs w-8 text-right">{channel.level}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-full">
                                    <Slider
                                      value={[channel.level]}
                                      onValueChange={(value) => updateAudioChannelLevel(channel.id, value)}
                                      max={100}
                                      step={1}
                                      className="flex-1"
                                      disabled={channel.muted}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-400">Gain: {channel.gain}dB</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-400">Pan: {channel.pan}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="p-2 border-t border-gray-700">
                        <div className="w-full flex items-center justify-between">
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Source
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Sliders className="h-4 w-4 mr-1" />
                            Equalizer
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                {/* Producer Control Panel */}
                <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
                  <Tabs defaultValue="stream" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                      <TabsTrigger value="stream">Stream</TabsTrigger>
                      <TabsTrigger value="sources">Sources</TabsTrigger>
                      <TabsTrigger value="audio">Audio</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stream" className="space-y-4">
                      {/* Stream Controls */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Stream Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              onClick={isStreaming ? handleStopStream : handleStartStream}
                              variant={isStreaming ? "destructive" : "default"}
                              className="w-full"
                            >
                              {isStreaming ? (
                                <>
                                  <Square className="h-4 w-4 mr-2" />
                                  Stop Stream
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Stream
                                </>
                              )}
                            </Button>

                            <Button
                              onClick={() => setIsRecording(!isRecording)}
                              variant={isRecording ? "destructive" : "outline"}
                              className="w-full"
                            >
                              {isRecording ? (
                                <>
                                  <Square className="h-4 w-4 mr-2" />
                                  Stop Rec
                                </>
                              ) : (
                                <>
                                  <Record className="h-4 w-4 mr-2" />
                                  Record
                                </>
                              )}
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Title</Label>
                            <Input
                              value={streamTitle}
                              onChange={(e) => setStreamTitle(e.target.value)}
                              placeholder="Enter stream title"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Description</Label>
                            <Textarea
                              value={streamDescription}
                              onChange={(e) => setStreamDescription(e.target.value)}
                              placeholder="Enter stream description"
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Tags</Label>
                            <Input
                              value={streamTags}
                              onChange={(e) => setStreamTags(e.target.value)}
                              placeholder="gaming,live,tutorial"
                            />
                            <p className="text-xs text-gray-400">Separate tags with commas</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Platform</Label>
                            <Select value={streamPlatform} onValueChange={setStreamPlatform}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="twitch">Twitch</SelectItem>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="custom">Custom RTMP</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Privacy</Label>
                            <Select value={streamPrivacy} onValueChange={setStreamPrivacy}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="unlisted">Unlisted</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Stream Status */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Stream Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Connection</span>
                            <div className="flex items-center space-x-1">
                              {isStreaming ? (
                                <Wifi className="h-4 w-4 text-green-500" />
                              ) : (
                                <WifiOff className="h-4 w-4 text-red-500" />
                              )}
                              <span className="text-sm text-white">{isStreaming ? "Connected" : "Disconnected"}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Viewers</span>
                            <span className="text-sm text-white">{viewers}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Duration</span>
                            <span className="text-sm text-white">{formatTime(streamDuration)}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Bitrate</span>
                            <span className="text-sm text-white">{bitrate} kbps</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">FPS</span>
                            <span className="text-sm text-white">{fps}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Resolution</span>
                            <span className="text-sm text-white">{streamResolution}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sources" className="space-y-4">
                      {/* Source Management */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white flex items-center justify-between">
                            Source Management
                            <Button variant="ghost" size="sm">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ScrollArea className="h-64">
                            <div className="space-y-2">
                              {inputSources.map((source) => (
                                <div
                                  key={source.id}
                                  className="flex items-center justify-between p-2 rounded bg-gray-600"
                                >
                                  <div className="flex items-center space-x-2">
                                    {source.type === "camera" && <Camera className="h-4 w-4" />}
                                    {source.type === "screen" && <Monitor className="h-4 w-4" />}
                                    {source.type === "media" && <Video className="h-4 w-4" />}
                                    {source.type === "browser" && <Globe className="h-4 w-4" />}
                                    <div>
                                      <span className="text-sm text-white">{source.name}</span>
                                      <div className="text-xs text-gray-400">
                                        {source.type === "camera" &&
                                          `${source.settings.resolution} • ${source.settings.fps}fps`}
                                        {source.type === "screen" &&
                                          `${source.settings.resolution} • ${source.settings.fps}fps`}
                                        {source.type === "media" && source.settings.file}
                                        {source.type === "browser" && source.settings.url}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={source.active}
                                      onCheckedChange={() => toggleSourceActive(source.id)}
                                    />
                                    <Button variant="ghost" size="sm">
                                      <Settings className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>

                          <Separator />

                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Camera className="h-4 w-4 mr-2" />
                              Camera
                            </Button>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Monitor className="h-4 w-4 mr-2" />
                              Screen
                            </Button>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Video className="h-4 w-4 mr-2" />
                              Media
                            </Button>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Globe className="h-4 w-4 mr-2" />
                              Browser
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Source Properties */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Source Properties</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-white">Resolution</Label>
                            <Select defaultValue="1080p">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2160p">3840x2160 (4K)</SelectItem>
                                <SelectItem value="1440p">2560x1440 (2K)</SelectItem>
                                <SelectItem value="1080p">1920x1080 (HD)</SelectItem>
                                <SelectItem value="720p">1280x720</SelectItem>
                                <SelectItem value="480p">854x480</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Frame Rate</Label>
                            <Select defaultValue="30">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="60">60 FPS</SelectItem>
                                <SelectItem value="30">30 FPS</SelectItem>
                                <SelectItem value="24">24 FPS</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Auto Focus</Label>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Auto Exposure</Label>
                            <Switch defaultChecked />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Brightness</Label>
                            <Slider defaultValue={[50]} max={100} step={1} />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Contrast</Label>
                            <Slider defaultValue={[50]} max={100} step={1} />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Saturation</Label>
                            <Slider defaultValue={[50]} max={100} step={1} />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="audio" className="space-y-4">
                      {/* Audio Settings */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Audio Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-white">Sample Rate</Label>
                            <Select defaultValue="48000">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="48000">48 kHz</SelectItem>
                                <SelectItem value="44100">44.1 kHz</SelectItem>
                                <SelectItem value="22050">22.05 kHz</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Audio Bitrate</Label>
                            <Select defaultValue="128">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="320">320 kbps</SelectItem>
                                <SelectItem value="256">256 kbps</SelectItem>
                                <SelectItem value="192">192 kbps</SelectItem>
                                <SelectItem value="128">128 kbps</SelectItem>
                                <SelectItem value="96">96 kbps</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Audio Channels</Label>
                            <Select defaultValue="stereo">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="stereo">Stereo</SelectItem>
                                <SelectItem value="mono">Mono</SelectItem>
                                <SelectItem value="surround">5.1 Surround</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label className="text-white">Audio Effects</Label>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-white">Noise Reduction</Label>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-white">Echo Cancellation</Label>
                                <Switch />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-white">Auto Gain Control</Label>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-white">Compressor</Label>
                                <Switch />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label className="text-white">Noise Gate Threshold</Label>
                            <Slider defaultValue={[-40]} min={-60} max={0} step={1} />
                            <p className="text-xs text-gray-400">-40 dB</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Compressor Ratio</Label>
                            <Slider defaultValue={[3]} min={1} max={10} step={0.1} />
                            <p className="text-xs text-gray-400">3:1</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Audio Monitoring */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Audio Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-white">Monitor Output</Label>
                            <Select defaultValue="default">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default">Default Audio Device</SelectItem>
                                <SelectItem value="headphones">Headphones</SelectItem>
                                <SelectItem value="speakers">Speakers</SelectItem>
                                <SelectItem value="disabled">Disabled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Monitor Volume</Label>
                            <Slider defaultValue={[75]} max={100} step={1} />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Mute Monitor</Label>
                            <Switch />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Monitor Delay</Label>
                            <span className="text-sm text-gray-400">0ms</span>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                      {/* Stream Settings */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Stream Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-white">Stream Server</Label>
                            <Input
                              value={streamServer}
                              onChange={(e) => setStreamServer(e.target.value)}
                              placeholder="rtmp://live.example.com/app"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Key</Label>
                            <div className="flex space-x-2">
                              <Input
                                type="password"
                                value={streamKey}
                                onChange={(e) => setStreamKey(e.target.value)}
                                placeholder="Enter stream key"
                              />
                              <Button variant="outline" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Video Encoder</Label>
                            <Select value={streamCodec} onValueChange={setStreamCodec}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="h264">H.264 (x264)</SelectItem>
                                <SelectItem value="h265">H.265 (HEVC)</SelectItem>
                                <SelectItem value="av1">AV1</SelectItem>
                                <SelectItem value="nvenc">NVIDIA NVENC</SelectItem>
                                <SelectItem value="quicksync">Intel Quick Sync</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Encoder Preset</Label>
                            <Select defaultValue="medium">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ultrafast">Ultra Fast</SelectItem>
                                <SelectItem value="superfast">Super Fast</SelectItem>
                                <SelectItem value="veryfast">Very Fast</SelectItem>
                                <SelectItem value="faster">Faster</SelectItem>
                                <SelectItem value="fast">Fast</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="slow">Slow</SelectItem>
                                <SelectItem value="slower">Slower</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Bitrate Control</Label>
                            <Select defaultValue="cbr">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cbr">CBR (Constant Bitrate)</SelectItem>
                                <SelectItem value="vbr">VBR (Variable Bitrate)</SelectItem>
                                <SelectItem value="crf">CRF (Constant Rate Factor)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Keyframe Interval</Label>
                            <Select defaultValue="2">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 second</SelectItem>
                                <SelectItem value="2">2 seconds</SelectItem>
                                <SelectItem value="4">4 seconds</SelectItem>
                                <SelectItem value="6">6 seconds</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Stream Latency</Label>
                            <Select value={streamLatency} onValueChange={setStreamLatency}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ultra-low">Ultra Low (1-2s)</SelectItem>
                                <SelectItem value="low">Low (2-5s)</SelectItem>
                                <SelectItem value="normal">Normal (5-15s)</SelectItem>
                                <SelectItem value="high">High (15-30s)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recording Settings */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Recording Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-white">Recording Path</Label>
                            <div className="flex space-x-2">
                              <Input defaultValue="/Users/username/Videos/Recordings" />
                              <Button variant="outline" size="icon">
                                <HardDrive className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Recording Format</Label>
                            <Select defaultValue="mp4">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mp4">MP4</SelectItem>
                                <SelectItem value="mkv">MKV</SelectItem>
                                <SelectItem value="mov">MOV</SelectItem>
                                <SelectItem value="avi">AVI</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Recording Quality</Label>
                            <Select defaultValue="high">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lossless">Lossless</SelectItem>
                                <SelectItem value="high">High Quality</SelectItem>
                                <SelectItem value="medium">Medium Quality</SelectItem>
                                <SelectItem value="low">Low Quality</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Auto-start Recording</Label>
                            <Switch />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Split Recording Files</Label>
                            <Switch />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">File Split Duration</Label>
                            <Select defaultValue="60">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                                <SelectItem value="120">2 hours</SelectItem>
                                <SelectItem value="0">No splitting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Advanced Settings */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Advanced Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">Hardware Acceleration</Label>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Multi-threading</Label>
                            <Switch defaultChecked />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">CPU Usage Preset</Label>
                            <Select defaultValue="balanced">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="performance">Performance</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                                <SelectItem value="power-saving">Power Saving</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Process Priority</Label>
                            <Select defaultValue="normal">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="above-normal">Above Normal</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="below-normal">Below Normal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-white">Auto-reconnect</Label>
                            <Switch defaultChecked />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Reconnect Delay</Label>
                            <Slider defaultValue={[10]} min={1} max={60} step={1} />
                            <p className="text-xs text-gray-400">10 seconds</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Max Reconnect Attempts</Label>
                            <Select defaultValue="5">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="unlimited">Unlimited</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Reset to Defaults</Button>
                          <Button>Save Settings</Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}