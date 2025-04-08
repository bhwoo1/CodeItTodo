import ItemPage from '@/app/components/items/ItemPage';
import React from 'react'

type PageProps = {
    params: {
      itemId: string;
    };
  };

export default async function page({params}: PageProps) {
    const {itemId} = await params;
  return (
    <div className='lg:mx-96 my-12'>
        <ItemPage itemId={Number(itemId)} />
    </div>
  )
}
