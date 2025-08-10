"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "bg-[#222222] border-[.5px] border-gray-600 rounded-md py-2 px-3 outline-none h-full",
        // style: "height: 100%; min-height: 100%;"
      },
    },
  })

  return (
      <div className="flex-1 overflow-y-hidden">
        <EditorContent editor={editor} className="h-full" />
      </div>
  )
}

export default TextEditor
