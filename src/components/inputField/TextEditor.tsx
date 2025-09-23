'use client'
import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './textEditor.css' // custom overrides
import { FieldError, UseFormRegister } from 'react-hook-form'

interface TextEditorProps {
    label: string
    name: string
    placeholder?: string
    register: UseFormRegister<any>
    error?: FieldError
    required?: boolean
}

const TextEditor: React.FC<TextEditorProps> = ({
    label,
    name,
    placeholder = 'Write something...',
    register,
    error,
    required = false,
}) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const quillRef = useRef<Quill | null>(null)

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder,
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ header: [1, 2, 3, false] }],
                        [{ align: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                },
            })
        }
    }, [placeholder])

    return (
        <div className="flex flex-col items-start gap-2 flex-1 w-full">
            {/* Label */}
            <label
                htmlFor={name}
                className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%]"
                style={{
                    fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                }}
            >
                {label} {required && '*'}
            </label>

            {/* Editor */}
            <div
                id={name}
                className={`editor-container w-full rounded border-[1.5px] 
                    ${error ? 'border-red-500' : 'border-[#E6E6E6]'} 
                    bg-white`}
                style={{
                    fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                }}
                // register hook to track field
                {...register(name, { required })}
            >
                <div ref={editorRef} />
            </div>

            {/* Error message */}
            {error && (
                <span className="text-red-500 text-xs capitalize">
                    {error.message || `${label} is required`}
                </span>
            )}
        </div>
    )
}

export default TextEditor
