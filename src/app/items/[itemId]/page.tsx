import ItemPage from '@/app/components/items/ItemPage';
import React from 'react'

export default async function page({params}: {params: {itemId: number}}) {
    const {itemId} = await params;
  return (
    <div className='lg:mx-96 my-12'>
        <ItemPage itemId={itemId} />
    </div>
  )
}
