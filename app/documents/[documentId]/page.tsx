import React from 'react'
import { Editor } from './editor';
interface DoucmentIdPageProps {
  params: Promise<{ documentId: string }>;
}
const DocumentPage = async ({ params }: DoucmentIdPageProps) => {
  const awaitedParams = await params;
  const { documentId } = awaitedParams;
  return (
    <Editor  />
  )
}

export default DocumentPage