import { Item } from '@/app/Type'
import React from 'react'

function ItemMemo({item, newMemo, onMemoUpdate}: {item: Item, newMemo: string|null, onMemoUpdate: (memo: string|null) => void}) {
  return (
    <div className="w-full h-[300px] mx-4 lg:mx-0 lg:my-4 lg:w-2/3 lg:h-[400px] bg-[url('/img/memo.png')] bg-cover bg-center rounded-4xl text-center flex flex-col items-center">
        <p className='my-6 text-amber-800'>Memo</p>
        <textarea 
            value={(newMemo !== null ? newMemo : item?.memo) ?? ""}
            className="w-[300px] h-[200px] md:w-[600px] lg:w-[580px] lg:h-[300px]  resize-none rounded-lg text-center flex items-center justify-center p-[80px] lg:p-[130px]"
            onChange={(e) => onMemoUpdate(e.target.value)}
        />
    </div>

  )
}

export default ItemMemo