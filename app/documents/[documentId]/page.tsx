import React from 'react'
interface DoucmentIdPageProps{
    params:Promise<{documentId:string}>;
}
const DocumentPage = async({params}:DoucmentIdPageProps) => {
    const awaitedParams=await params;
    const {documentId}=awaitedParams;
  return (
    <div>DocumentPage:{documentId} </div>
  )
}

export default DocumentPage