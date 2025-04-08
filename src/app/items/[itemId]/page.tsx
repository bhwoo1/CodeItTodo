import ItemPage from '@/app/components/items/ItemPage';
import React from 'react'


export default async function Page({ params }: { params: { itemId: string } })  {
  return (
    <div className='lg:mx-96 my-12'>
        <ItemPage itemId={Number(params.itemId)} />
    </div>
  )
}
