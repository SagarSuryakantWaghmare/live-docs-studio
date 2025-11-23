"use client"
import React from 'react'
import { BoldIcon, Icon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, RedoIcon, RemoveFormattingIcon, SpellCheckIcon, Underline, UnderlineIcon, Undo2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@radix-ui/react-separator';
interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;

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
    const {editor}=useEditorStore();
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean
    }[][] = [
        [
            {
                label:"Undo",
                icon:Undo2Icon,
                onClick:()=>editor?.chain().focus().undo().run(),
            },
            {
                label:"Redo",
                icon:RedoIcon,
                onClick:()=>editor?.chain().focus().redo().run(),
            },
            {
                label:"Print",
                icon:PrinterIcon,
                onClick:()=>window.print(),
            },
            {
                label:"Spell Check",
                icon:SpellCheckIcon,
                onClick:()=>{
                    const current=editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck",current==="false"?"true":"false");
                }
            }
        ],
        [
            {
                label:"Bold",
                icon:BoldIcon,
                onClick:()=>editor?.chain().focus().toggleBold().run(),
                isActive:editor?.isActive("bold")
            },
            {
                label:"Italic",
                icon:ItalicIcon,
                onClick:()=>editor?.chain().focus().toggleItalic().run(),
                isActive:editor?.isActive("italic")
            },
            {
                label:"Underline",
                icon:UnderlineIcon,
                onClick:()=>editor?.chain().focus().toggleUnderline().run(),
                isActive:editor?.isActive("underline")
            }
        ],
        [
            {
                label:"Comment",
                icon:MessageSquarePlusIcon,
                onClick:()=>{ /* TODO: Implement Comment Functionality */ },
                isActive:false
            },
            {
                label:"List Todo",
                icon:ListTodoIcon,
                onClick:()=>editor?.chain().focus().toggleTaskList().run(),
                isActive:false
            },
            {
                label:"Remove Formatting",
                icon:RemoveFormattingIcon,
                onClick:()=>editor?.chain().focus().clearNodes().unsetAllMarks().run(),
                isActive:false
            }
        ],
        []
    ];

    return (
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-3xl min-h-10 flex items-center gap-x-0.5 overflow-x-auto'>
            {sections[0].map((item)=>(
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {/* TODO:Font Family */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {/* TODO:Heading */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {/* TODO:Font Size */}
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {sections[1].map((item)=>(
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
            {sections[2].map((item)=>(
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    )
}

