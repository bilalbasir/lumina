'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

interface TipTapEditorProps {
    label: string
    name: string
    control: Control<any>
    error?: FieldError
    required?: boolean
    placeholder?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-[#E6E6E6] bg-greyscale50">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded text-sm hover:bg-white transition-colors border ${editor.isActive('bold') ? 'bg-white border-[#00634F] text-[#00634F] font-bold' : 'border-transparent'}`}
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded text-sm hover:bg-white transition-colors border ${editor.isActive('italic') ? 'bg-white border-[#00634F] text-[#00634F] italic' : 'border-transparent'}`}
            >
                I
            </button>
            <div className="w-[1px] h-6 bg-[#E6E6E6] mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1 rounded text-sm hover:bg-white transition-colors border ${editor.isActive('heading', { level: 1 }) ? 'bg-white border-[#00634F] text-[#00634F] font-bold' : 'border-transparent'}`}
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1 rounded text-sm hover:bg-white transition-colors border ${editor.isActive('heading', { level: 2 }) ? 'bg-white border-[#00634F] text-[#00634F] font-bold' : 'border-transparent'}`}
            >
                H2
            </button>
            <div className="w-[1px] h-6 bg-[#E6E6E6] mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 rounded text-sm hover:bg-white transition-colors border ${editor.isActive('bulletList') ? 'bg-white border-[#00634F] text-[#00634F]' : 'border-transparent'}`}
            >
                • List
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-3 py-1 rounded text-sm hover:bg-white transition-colors border ${editor.isActive('orderedList') ? 'bg-white border-[#00634F] text-[#00634F]' : 'border-transparent'}`}
            >
                1. List
            </button>
        </div>
    )
}

// Sub-component to manage editor state independently
const EditorInner = ({ value, onChange, onBlur, placeholder, error }: any) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Highlight,
            Typography,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            // Improved empty detection: Check if there's any text content or meaningful nodes
            const text = editor.getText().trim()
            if (text === '' && editor.getHTML() === '<p></p>') {
                onChange('')
            } else {
                onChange(html)
            }
        },
        onBlur: () => {
            onBlur?.()
        },
        editorProps: {
            attributes: {
                class: 'prose focus:outline-none min-h-[150px] p-4 max-w-none text-sm leading-[150%] text-[#686868]',
                style: 'font-family: Onest, -apple-system, Roboto, Helvetica, sans-serif;',
                'data-placeholder': placeholder,
            },
        },
    })

    // Sync external value changes (like form resets or initial data)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            const currentHTML = editor.getHTML()
            // Only update if the content is meaningfully different to avoid cursor jumps
            if (value !== currentHTML) {
                editor.commands.setContent(value || '', { emitUpdate: false })
            }
        }
    }, [value, editor])

    return (
        <div className={`w-full rounded border-[1.5px] overflow-hidden bg-white transition-all
            ${error ? 'border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.1)]' : 'border-[#E6E6E6] focus-within:border-[#00634F]'}`}
        >
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
    label,
    name,
    control,
    error,
    required = false,
    placeholder = 'Write description...'
}) => {
    return (
        <div className="flex flex-col items-start gap-2 flex-1 w-full">
            <label
                className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
                {label} {required && '*'}
            </label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `${label} is required` : false,
                    validate: (val) => {
                        if (!required) return true;
                        // Better check for effectively empty content
                        const isEffectivelyEmpty = !val || val === '<p></p>' || val.trim() === '';
                        if (isEffectivelyEmpty) return `${label} is required`;
                        return true;
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <EditorInner
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        error={error}
                    />
                )}
            />

            {error && (
                <span className="text-red-500 text-xs mt-1">
                    {error.message}
                </span>
            )}

            <style jsx global>{`
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .ProseMirror {
                    min-height: 150px;
                }
                .ProseMirror h1 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    line-height: 1.2;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    color: #131313;
                }
                .ProseMirror h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-top: 0.75rem;
                    margin-bottom: 0.5rem;
                    color: #131313;
                }
                .ProseMirror p {
                    margin-bottom: 0.5rem;
                }
                .ProseMirror ul {
                    list-style-type: disc !important;
                    padding-left: 1.5rem !important;
                    margin-top: 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                }
                .ProseMirror ol {
                    list-style-type: decimal !important;
                    padding-left: 1.5rem !important;
                    margin-top: 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                }
                .ProseMirror li {
                    margin-top: 0.25rem !important;
                    margin-bottom: 0.25rem !important;
                }
                .ProseMirror blockquote {
                    border-left: 3px solid #E6E6E6;
                    padding-left: 1rem;
                    color: #686868;
                    font-style: italic;
                }
            `}</style>
        </div>
    )
}

export default TipTapEditor
