import React from 'react'
import { Editor } from './editor';
import {Toolbar} from './toolbar';
interface DoucmentIdPageProps {
  params: Promise<{ documentId: string }>;
}
const DocumentPage = async ({ params }: DoucmentIdPageProps) => {
  const awaitedParams = await params;
  const { documentId } = awaitedParams;
  return (
    <>
    <Toolbar/>
    <Editor  />
    </>
  )
}

export default DocumentPage