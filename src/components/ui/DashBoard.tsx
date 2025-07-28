import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import {
  LayoutDashboard,
  Layout,
  TrendingUp,
  Hash,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
  PlusCircle,
  Tag,
} from "lucide-react";
import { WelcomeGuide } from "./Welcome";
import { SidebarTrigger } from "./app-sidebar";

// Update PlatformStats interface
interface PlatformStats {
  id: string;
  name: string;
  count: number;
  gradient: string;
  icon: React.ReactNode;
}

// PlatformCard component for rendering platform stats
function PlatformCard({ name, count, gradient, icon }: PlatformStats) {
  return (
    <Card
      className={`${gradient} p-4 transition-all duration-200 hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white/20 p-2.5">{icon}</div>
        <div>
          <CardTitle className="text-sm font-medium text-white/90">
            {name}
          </CardTitle>
          <CardContent className="text-2xl font-bold text-white mt-0.5">
            {count}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Simple StatsCard component definition
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
}

export function StatsCard({ title, value, icon, gradient }: StatsCardProps) {
  return (
    <Card className={`${gradient} backdrop-blur-sm p-6`}>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-white/20 p-3">{icon}</div>
        <div>
          <CardTitle className="text-sm font-medium text-white/80">
            {title}
          </CardTitle>
          <CardContent className="text-3xl font-bold text-white mt-1">
            {value}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

// Add new interface for guide cards
interface GuideCardProps {
  title: string;
  description: string;
  type: "guide" | "blog";
  icon: React.ReactNode;
}

// Add GuideCard component
function GuideCard({ title, description, type, icon }: GuideCardProps) {
  return (
    <Card className="bg-white p-6 hover:shadow-md transition-shadow border border-gray-100">
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <div className="p-3 rounded-lg bg-purple-50">{icon}</div>
        <div>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 mb-2 inline-block">
            {type === "guide" ? "How to Use" : "Blog Post"}
          </span>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
        {description}
      </CardContent>
    </Card>
  );
}

// Add interface for content items
interface ContentItem {
  id: string;
  platform: string;
  title: string;
  link: string;
  tags?: string[];
}

export function Dashboard() {
  const [platformCounts, setPlatformCounts] = useState<Record<string, number>>({
    youtube: 0,
    twitter: 0,
    linkedin: 0,
    instagram: 0,
    notion: 0,
    eraser: 0,
    excalidraw: 0,
  });

  const [totalContent, setTotalContent] = useState(0);
  const [activeTags, setActiveTags] = useState(0);

  useEffect(() => {
    // Get content from localStorage or your API
    const savedContent = JSON.parse(
      localStorage.getItem("brainbox_content") || "[]"
    ) as ContentItem[];

    // Calculate platform counts
    const counts = savedContent.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate unique tags
    const uniqueTags = new Set(savedContent.flatMap((item) => item.tags || []));

    setPlatformCounts(counts);
    setTotalContent(savedContent.length);
    setActiveTags(uniqueTags.size);
  }, []);

  // Update platforms data to include default SVG icons
  const platforms: PlatformStats[] = [
    {
      id: "youtube",
      name: "YouTube",
      count: platformCounts.youtube || 0,
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      name: "Twitter",
      count: platformCounts.twitter || 0,
      gradient: "bg-gradient-to-r from-blue-400 to-blue-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      count: platformCounts.linkedin || 0,
      gradient: "bg-gradient-to-r from-blue-600 to-blue-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      count: platformCounts.instagram || 0,
      gradient: "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      ),
    },
    {
      id: "notion",
      name: "Notion",
      count: platformCounts.notion || 0,
      gradient: "bg-gradient-to-r from-gray-800 to-gray-900",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.126 2.77.327 3.615 1.174.845.845 1.3 1.981 1.174 3.615l-.98 13.31c-.126 1.634-.327 2.77-1.174 3.615-.845.845-1.981 1.3-3.615 1.174l-13.31-.98C.774 23.2 0 22.426 0 21.471V2.529C0 1.574.774.8 1.729.8z" />
        </svg>
      ),
    },
    {
      id: "eraser",
      name: "Eraser",
      count: platformCounts.eraser || 0,
      gradient: "bg-gradient-to-r from-[#EC2C40] to-[#00A9E5]",
      icon: <svg className="w-4 h-4 text-white" /* Eraser SVG */ />,
    },
    {
      id: "excalidraw",
      name: "Excalidraw",
      count: platformCounts.excalidraw || 0,
      gradient: "bg-gradient-to-r from-[#6965db] to-[#8783ff]",
      icon: <svg className="w-4 h-4 text-white" /* Excalidraw SVG */ />,
    },
  ];

  // Add guides and blog posts
  const guides = [
    {
      title: "Getting Started with BrainBox",
      description: `BrainBox is your personal knowledge management system designed to help you:

• Organize content from different platforms in one place
• Build a searchable library of valuable information
• Create connections between different pieces of content
• Track engagement and impact of saved content

Quick Start:
1. Click "Add Content" to save from your favorite platforms
2. Use tags to organize and find content easily
3. Track engagement metrics to see what resonates
4. Build your second brain systematically`,
      type: "guide" as const,
      icon: <LayoutDashboard className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Building Your Second Brain",
      description: `Learn how to effectively build your digital knowledge base:

• Choose what content to save (quality over quantity)
• Organize content using the PARA method:
  - Projects: Current initiatives
  - Areas: Ongoing responsibilities
  - Resources: Topics of interest
  - Archives: Inactive items

Tips:
• Review and organize weekly
• Add your own insights to saved content
• Share and connect with others
• Use tags consistently`,
      type: "blog" as const,
      icon: <Layout className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#881ae5] to-purple-700 text-white">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            {/* Add Sidebar Trigger */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden text-white" />
              <LayoutDashboard className="w-10 h-10" />
              <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatsCard
              title="Total Content"
              value={totalContent}
              icon={<Layout className="w-5 h-5 text-white" />}
              gradient="bg-white/10"
            />
            <StatsCard
              title="Active Tags"
              value={activeTags}
              icon={<Hash className="w-5 h-5 text-white" />}
              gradient="bg-white/10"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 -mt-8">
        {/* Platform Cards */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Platform Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <PlatformCard key={platform.id} {...platform} />
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-purple-50 text-gray-700 transition-colors">
                  <PlusCircle className="w-5 h-5 text-purple-600" />
                  <span>Add New Content</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-purple-50 text-gray-700 transition-colors">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <span>Manage Tags</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-purple-50 text-gray-700 transition-colors">
                  <Share2 className="w-5 h-5 text-purple-600" />
                  <span>Share Collection</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Guides & Resources
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {guides.map((guide) => (
                <GuideCard key={guide.title} {...guide} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
