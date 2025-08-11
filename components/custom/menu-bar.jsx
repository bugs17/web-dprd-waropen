"use client"

import {
  AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3,
  Highlighter, Italic, List, ListOrdered, Strikethrough
} from "lucide-react"
import { useState, useEffect } from "react"

const MenuBar = ({ editor }) => {
  const [update, setUpdate] = useState(0) // hanya untuk trigger rerender

  useEffect(() => {
    if (!editor) return
    const rerender = () => setUpdate(u => u + 1)
    editor.on('selectionUpdate', rerender)
    editor.on('transaction', rerender)
    return () => {
      editor.off('selectionUpdate', rerender)
      editor.off('transaction', rerender)
    }
  }, [editor])

  if (!editor) return null

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      isActive: editor.isActive("heading", { level: 1 }),
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <Heading2 className="size-4" />,
      isActive: editor.isActive("heading", { level: 2 }),
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 className="size-4" />,
      isActive: editor.isActive("heading", { level: 3 }),
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <Bold className="size-4" />,
      isActive: editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic className="size-4" />,
      isActive: editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <Strikethrough className="size-4" />,
      isActive: editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: <AlignLeft className="size-4" />,
      isActive: editor.isActive({ textAlign: "left" }),
      command: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: <AlignCenter className="size-4" />,
      isActive: editor.isActive({ textAlign: "center" }),
      command: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: <AlignRight className="size-4" />,
      isActive: editor.isActive({ textAlign: "right" }),
      command: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      icon: <List className="size-4" />,
      isActive: editor.isActive("bulletList"),
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered className="size-4" />,
      isActive: editor.isActive("orderedList"),
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <Highlighter className="size-4" />,
      isActive: editor.isActive("highlight"),
      command: () => editor.chain().focus().toggleHighlight().run(),
    },
  ]

  return (
    <div className="border rounded-md p-1 mb-1 bg-[#222222] flex justify-center space-x-2 z-50">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={option.command}
          className={
            option.isActive
              ? "bg-violet-400 p-2 px-2 text-white border rounded-sm"
              : "p-2 px-2 bg-muted hover:bg-violet-200 hover:text-black border rounded-sm"
          }
        >
          {option.icon}
        </button>
      ))}
    </div>
  )
}

export default MenuBar
