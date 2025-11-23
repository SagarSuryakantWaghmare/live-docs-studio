"use client"

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
import {useEditorStore} from '@/store/use-editor-store';
export  const Editor = () => {
    const {setEditor}=useEditorStore();
    console.log("Toolbar Editor ", setEditor)
    const editor = useEditor({
        onCreate({editor}){
            setEditor(editor);
        },
        onDestroy(){
            setEditor(null);
        },
        onUpdate(){
            setEditor(editor);
        },
        onSelectionUpdate({editor}){
            setEditor(editor);
        },
        onFocus({editor}){
            setEditor(editor);
        },
        onBlur({editor}){
            setEditor(editor);
        },
        onContentError({editor}){
            setEditor(editor);
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                style: "padding-left:56px; padding-right:56px; font-size:16px; line-height:1.5;",
                class: "focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions: [
            StarterKit,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            TaskItem.configure({
                nested: true,
            }),
            Image,
            Image.configure({
                resize: {
                    enabled: true,
                    alwaysPreserveAspectRatio: true,
                },
            }),
            Dropcursor,
        ],
        content: `<table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>`
    })
    return (
        <div className='w-full flex justify-center overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className='py-4 print:py-0 print:w-full print:min-w-0'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}