"use client"
import React from 'react'
import { BoldIcon, ChevronDownIcon, Icon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, RedoIcon, RemoveFormattingIcon, SpellCheckIcon, Underline, UnderlineIcon, Undo2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@radix-ui/react-separator';
import { lb } from 'date-fns/locale';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Level } from '@tiptap/extension-heading';
interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;

}
const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    const fonts = [
        { label: "Sans Serif", value: "Arial, sans-serif" },
        { label: "Serif", value: "Georgia, serif" },
        { label: "Monospace", value: "'Courier New', monospace" },
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "'Times New Roman'" },
        { label: "Courier New", value: "'Courier New'" },
        { label: "Verdana", value: "Verdana" },
        { label: "Tahoma", value: "Tahoma" }
    ];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    )}>
                    <span className='truncate'>
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}

                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {(() => {
                    const headingSizeMap: Record<number, string> = {
                        1: '32px',
                        2: '24px',
                        3: '20px',
                        4: '18px',
                        5: '16px',
                    };
                    let currentFontSize = '16px';
                    if (editor) {
                        for (let level = 1; level <= 5; level++) {
                            if (editor.isActive('heading', { level })) {
                                currentFontSize = headingSizeMap[level];
                                break;
                            }
                        }
                    }

                    return fonts.map(({ label, value }) => (
                        <button
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                            key={value}
                            className={
                                cn(
                                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ",
                                    editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                                )
                            }
                            style={{ fontFamily: value, fontSize: currentFontSize }}
                        >
                            <span className='text-sm'>{label}</span>
                        </button>
                    ));
                })()}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeadingLevelButton=()=>{
    const {editor}=useEditorStore();
    const headings=[
        {label:"Normal text",value:0,fontsize:'16px' },
        {label:"Heading 1",value:1,fontsize:'32px' },
        {label:"Heading 2",value:2,fontsize:'24px' },
        {label:"Heading 3",value:3,fontsize:'20px' },
        {label:"Heading 4",value:4,fontsize:'18px' },
        {label:"Heading 5",value:5,fontsize:'16px' },
    ];
    const getCurrentHeading=()=>{
        for(let level=1;level<=5;level++){
            if(editor?.isActive('heading',{level})){
                return `Heading ${level}`
            }
        }
        return "Normal text";
    }
        return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    )}>
                    <span className='truncate'>
                            
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />

                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {headings.map(({label,value,fontsize})=>(
                    <button 
                    onClick={()=>{
                        if(value===0){
                            editor?.chain().focus().setParagraph().run();
                        }else{
                            editor?.chain().focus().toggleHeading({level:value as Level}).run();
                        }
                    }}
                    key={value}
                    style={{fontSize:fontsize}}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ",
                    (value===0 && !editor?.isActive('heading')) || editor?.isActive('heading',{level:value}) ? "bg-neutral-200/80":""
                    )}>
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
        )
}
const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}>
            <Icon className='size-4' />
        </button>
    )
}
export const Toolbar = () => {
    const { editor } = useEditorStore();
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: RedoIcon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    }
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                    isActive: editor?.isActive("bold")
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                    isActive: editor?.isActive("italic")
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                    isActive: editor?.isActive("underline")
                }
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => { /* TODO: Implement Comment Functionality */ },
                    isActive: false
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: false
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
                    isActive: false
                }
            ],
            []
        ];

    return (
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-3xl min-h-10 flex items-center gap-x-0.5 overflow-x-auto'>
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <FontFamilyButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {/* TODO:Heading */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <HeadingLevelButton/>
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            {/* TODO:Text color */}
            {/* TODO: Highlight Color */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {/* TODO: Link */}
            {/* TODO: Image */}
            {/* TODO: Align */}
            {/* TODO: Line height */}
            {/* TODO: List */}
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    )
}

