"use client"

import {useEditor,EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import {Table} from '@tiptap/extension-table';
import {TableRow} from '@tiptap/extension-table-row';
import {TableHeader} from '@tiptap/extension-table-header';
import {TableCell} from '@tiptap/extension-table-cell';
export const Editor=()=>{
    const editor=useEditor({
        editorProps:{
            attributes:{
                style:"padding-left:56px; padding-right:56px; font-size:16px; line-height:1.5;",
                class:"focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions:[
            StarterKit,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            TaskItem.configure({
                nested: true,
            })
        ],
        content:'<p>Hello World! 🌎️</p>',
    })
    return(
        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible' >
            <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 print:w-full print:min-w-0'>
              <EditorContent editor={editor} />
            </div>
        </div>
    )
}