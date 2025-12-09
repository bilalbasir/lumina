'use client';
import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: { message?: string };
  required?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  label,
  name,
  placeholder = 'Write something...',
  value,
  onChange,
  error,
  required = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

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
      });

      // Sync changes with parent component
      quillRef.current.on('text-change', () => {
        const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
        onChange(html);
      });
    }

    // Set initial value when the editor loads or value changes
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || '';
    }
  }, [placeholder, value, onChange]);

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
        className={`editor-container w-full rounded border-[1.5px] ${
          error ? 'border-red-500' : 'border-[#E6E6E6]'
        } bg-white`}
        style={{
          fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
        }}
      >
        <div ref={editorRef} />
      </div>

      {/* Error */}
      {error && (
        <span className="text-red-500 text-xs capitalize">
          {error.message || `${label} is required`}
        </span>
      )}
    </div>
  );
};

export default TextEditor;
