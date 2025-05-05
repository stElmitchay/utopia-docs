"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Menu, Plus, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [activeDocContent, setActiveDocContent] = useState<string | null>(null)
  const [activeDocTitle, setActiveDocTitle] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [newDocTitle, setNewDocTitle] = useState("")
  const [newDocType, setNewDocType] = useState("text")
  const [newDocDescription, setNewDocDescription] = useState("")
  const [newDocColor, setNewDocColor] = useState("black")
  const [newDocEmoji, setNewDocEmoji] = useState("📄")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Initial documents
  const [documents, setDocuments] = useState<Array<{ id: string; title: string; emoji: string }>>([
    { id: "prd", title: "Product Requirements Document", emoji: "📋" },
    { id: "style-guide", title: "Style Guide", emoji: "🎨" },
    { id: "executive", title: "Executive Summary", emoji: "💼" },
  ])

  const handleDocClick = (doc: string, title: string) => {
    setSelectedDoc(doc)
    setActiveDocTitle(title)
    setActiveDocContent(doc)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleAddDocument = () => {
    if (newDocTitle.trim() === "") return

    const newDoc = {
      id: `doc-${Date.now()}`,
      title: newDocTitle,
      emoji: newDocEmoji,
    }

    setDocuments([...documents, newDoc])
    setUploadDialogOpen(false)

    // Reset form
    setNewDocTitle("")
    setNewDocDescription("")
    setNewDocType("text")
    setNewDocColor("black")
    setNewDocEmoji("📄")
    setSelectedFile(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter"> </h1>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <div className="hidden md:block">
            <Button
              className="rounded-none bg-white text-black hover:bg-white/90 uppercase tracking-wider text-sm"
              onClick={() => setUploadDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-white/10 py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <Button
                className="rounded-none bg-white text-black hover:bg-white/90 uppercase tracking-wider text-sm w-full"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Document
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter mb-6">
              Utopia
              <br />
              docs
            </h1>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* PRD Document - Large top left */}
            <div
              className="col-span-12 md:col-span-6 lg:col-span-5 cursor-pointer"
              onClick={() => handleDocClick("prd", "Product Requirements Document")}
            >
              <div className="relative bg-black border border-white/20 aspect-[4/5] overflow-hidden group">
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="text-6xl mb-4">{documents[0].emoji}</div>
                  <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">PRD</h2>
                  <div className="mt-auto">
                    <p className="text-sm uppercase tracking-wider text-white/60">Product Requirements</p>
                    <p className="text-xl font-bold mt-1">Utopia</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Style Guide - Yellow box */}
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4 cursor-pointer"
              onClick={() => handleDocClick("style-guide", "Style Guide")}
            >
              <div className="relative bg-yellow-400 border border-white/20 aspect-square overflow-hidden group">
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="text-6xl mb-4 text-black">{documents[1].emoji}</div>
                  <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2 text-black">Utopia</h2>
                  <p className="text-sm uppercase tracking-wider text-black/70">Style Guide</p>
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-black">Design System</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Executive Summary - Image box */}
            <div
              className="col-span-12 md:col-span-6 lg:col-span-3 cursor-pointer"
              onClick={() => handleDocClick("executive", "Executive Summary")}
            >
              <div className="relative bg-neutral-800 border border-white/20 aspect-[3/4] overflow-hidden group">
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="text-6xl mb-4">{documents[2].emoji}</div>
                  <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">utopia</h2>
                  <div className="mt-auto">
                    <p className="text-sm uppercase tracking-wider text-white/60">Business Model</p>
                    <p className="text-xl font-bold mt-1">Business Overview</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Dynamically added documents */}
            {documents.slice(3).map((doc) => (
              <div
                key={doc.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 cursor-pointer"
                onClick={() => handleDocClick(doc.id, doc.title)}
              >
                <div className="relative bg-black border border-white/20 aspect-square overflow-hidden group">
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="text-6xl mb-4">{doc.emoji}</div>
                    <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">
                      {doc.title.length > 20 ? doc.title.substring(0, 20) + "..." : doc.title}
                    </h2>
                    <div className="mt-auto">
                      <p className="text-sm uppercase tracking-wider text-white/60">Document</p>
                      <p className="text-xl font-bold mt-1">Utopia Platform</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}

            {/* Add Document Button */}
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4 cursor-pointer"
              onClick={() => setUploadDialogOpen(true)}
            >
              <div className="relative bg-neutral-900 border border-dashed border-white/30 aspect-square overflow-hidden group hover:border-white/60 transition-colors">
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Add New Document</h2>
                  <p className="text-sm text-white/60">Upload a new document to the collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-4 md:hidden">
        <div className="container mx-auto px-4 flex justify-center">
          <Button
            className="rounded-none bg-white text-black hover:bg-white/90 uppercase tracking-wider text-sm w-full"
            onClick={() => setUploadDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Document
          </Button>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-white/40 text-xs uppercase tracking-wider">
          <p>© 2025 Project Utopia. All rights reserved.</p>
        </div>
      </footer>

      {/* Document Dialog */}
      <Dialog open={selectedDoc !== null} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] bg-black border border-white/20 p-0 rounded-none">
          <DialogHeader className="px-6 pt-6 pb-2 border-b border-white/10">
            <DialogTitle className="text-2xl font-bold tracking-tighter">{activeDocTitle}</DialogTitle>
            <DialogDescription className="text-white/60">Utopia Documentation</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="p-6">
              {activeDocContent === "prd" && (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Overview</h3>
                    <p className="mb-4 text-white/80">
                      Utopia addresses the widespread distrust, complexity, and expense of existing voting and polling
                      systems by delivering a no-code, decentralised solution. The core benefit is instant, transparent,
                      and anonymous polls on Solana—enabling universities, organisations, and event managers to launch
                      trustworthy, flexible elections without technical barriers.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Goals</h3>
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 uppercase text-sm tracking-wider">Business Goals</h4>
                      <ul className="list-disc pl-6 space-y-2 text-white/80">
                        <li>Launch a minimum of 100 active polls within 3 months of MVP release</li>
                        <li>Achieve $5,000 in platform-generated transaction fees in the first quarter</li>
                        <li>Secure 3 partnership pilots with universities or event organisations during MVP</li>
                        <li>Attain platform reliability above 99.5% uptime</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-bold mb-3 uppercase text-sm tracking-wider">User Goals</h4>
                      <ul className="list-disc pl-6 space-y-2 text-white/80">
                        <li>Enable effortless poll creation and management without coding skills</li>
                        <li>Ensure secure, anonymous, and tamper-proof voting via blockchain</li>
                        <li>Provide poll creators with transparency and control over voting models</li>
                        <li>Deliver instant, verifiable results for voters and creators</li>
                        <li>Reduce barriers for all users to participate in trustworthy digital voting</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">User Stories</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3 uppercase text-sm tracking-wider">Poll Creator</h4>
                        <ul className="list-disc pl-6 space-y-2 text-white/80">
                          <li>
                            As a poll creator, I want to launch a poll without writing code, so that I can easily engage
                            my community or organization.
                          </li>
                          <li>
                            As a poll creator, I want to specify whether voting is single or multiple per participant,
                            so that I can model the rules that fit my use case.
                          </li>
                          <li>
                            As a poll creator, I want to decide whether my poll is free or if voters must pay, so that I
                            can monetize or cover event costs.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeDocContent === "style-guide" && (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Design Brief</h3>
                    <p className="mb-4 text-white/80">
                      A mobile-first, clean, and modern voting interface that feels trustworthy, structured, and
                      human-centred. Designed with TailwindCSS + shadcn/ui, the interface supports dark mode and
                      performs smoothly in low-bandwidth environments.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Look & Feel</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-white/20 p-4">
                        <h4 className="font-bold mb-2 uppercase text-sm tracking-wider">Visual Mood</h4>
                        <p className="text-white/80">Calm, clean, trustworthy</p>
                      </div>
                      <div className="border border-white/20 p-4">
                        <h4 className="font-bold mb-2 uppercase text-sm tracking-wider">Aesthetic</h4>
                        <p className="text-white/80">Rounded corners, soft shadows, minimal clutter</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Colour Palette</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <div className="h-20 bg-[#184E45]"></div>
                        <div className="border border-white/20 p-2 border-t-0">
                          <p className="font-bold uppercase text-sm tracking-wider">Primary</p>
                          <p className="text-xs text-white/60">#184E45</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="h-20 bg-[#A2E3DC]"></div>
                        <div className="border border-white/20 p-2 border-t-0">
                          <p className="font-bold uppercase text-sm tracking-wider">Accent 1</p>
                          <p className="text-xs text-white/60">#A2E3DC</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeDocContent === "executive" && (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Executive Summary</h3>
                    <p className="mb-4 text-white/80">
                      Utopia is a decentralized voting application built on the high-performance Solana blockchain,
                      designed to address the critical need for trust, transparency, and integrity in various voting
                      processes. Leveraging Solana's speed and low costs, we offer a secure, verifiable, and efficient
                      alternative to traditional and centralized digital voting systems.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">1. The Problem</h3>
                    <p className="mb-4 text-white/80">
                      Lack of trust in voting and election outcomes is a significant issue in many contexts, including
                      general elections, organizational polls, and public voting for events like reality shows. This
                      mistrust can stem from concerns about tampering, lack of transparency, high costs, and low voter
                      confidence.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">2. The Solution</h3>
                    <p className="mb-4 text-white/80">
                      Utopia provides a decentralized voting platform on the Solana blockchain that ensures every vote
                      is securely recorded, immutable, and publicly verifiable. Key aspects include blockchain-based
                      integrity, transparency, ease of use, and flexible service models.
                    </p>
                  </section>
                </div>
              )}

              {/* For dynamically added documents */}
              {activeDocContent !== "prd" &&
                activeDocContent !== "style-guide" &&
                activeDocContent !== "executive" &&
                activeDocContent !== null && (
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Document Content</h3>
                      <p className="mb-4 text-white/80">
                        {selectedFile
                          ? selectedFile.name
                          : "This document was recently added. Content will be available soon."}
                      </p>
                    </section>
                  </div>
                )}
            </div>
          </ScrollArea>
          <div className="p-6 border-t border-white/10 flex justify-between">
            <Button
              variant="outline"
              className="rounded-none border-white text-white"
              onClick={() => setSelectedDoc(null)}
            >
              Close
            </Button>
            <Button className="rounded-none bg-white text-black hover:bg-white/90">
              <FileText className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-2xl w-[90vw] bg-black border border-white/20 p-0 rounded-none">
          <DialogHeader className="px-6 pt-6 pb-2 border-b border-white/10">
            <DialogTitle className="text-2xl font-bold tracking-tighter">Add New Document</DialogTitle>
            <DialogDescription className="text-white/60">
              Upload a new document to the Utopia documentation collection
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="bg-black border-white/20 rounded-none mt-1"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDocDescription}
                  onChange={(e) => setNewDocDescription(e.target.value)}
                  className="bg-black border-white/20 rounded-none mt-1 h-20"
                  placeholder="Brief description of this document"
                />
              </div>

              <div>
                <Label htmlFor="emoji">Document Emoji</Label>
                <Select value={newDocEmoji} onValueChange={setNewDocEmoji}>
                  <SelectTrigger className="bg-black border-white/20 rounded-none mt-1">
                    <SelectValue placeholder="Select emoji" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20 rounded-none">
                    <SelectItem value="📄">📄 Document</SelectItem>
                    <SelectItem value="📋">📋 Clipboard</SelectItem>
                    <SelectItem value="🎨">🎨 Design</SelectItem>
                    <SelectItem value="💼">💼 Business</SelectItem>
                    <SelectItem value="📊">📊 Chart</SelectItem>
                    <SelectItem value="🔍">🔍 Research</SelectItem>
                    <SelectItem value="💡">💡 Idea</SelectItem>
                    <SelectItem value="⚙️">⚙️ Technical</SelectItem>
                    <SelectItem value="📱">📱 Mobile</SelectItem>
                    <SelectItem value="🖥️">🖥️ Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="file">Upload File</Label>
                <div className="mt-1 border border-dashed border-white/20 rounded-none p-6 text-center">
                  <Input id="file" type="file" onChange={handleFileChange} className="hidden" />
                  <Button
                    variant="outline"
                    className="rounded-none border-white/20"
                    onClick={() => document.getElementById("file")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Select File
                  </Button>
                  {selectedFile && <p className="mt-2 text-sm text-white/60">{selectedFile.name}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/10 flex justify-between">
            <Button
              variant="outline"
              className="rounded-none border-white text-white"
              onClick={() => setUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-none bg-white text-black hover:bg-white/90"
              onClick={handleAddDocument}
              disabled={!newDocTitle.trim()}
            >
              Add Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
