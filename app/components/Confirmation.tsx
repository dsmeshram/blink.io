import { Button } from '@nextui-org/react'
import React from 'react'

const Confirmation = (prop: any) => {

    function on_action(type: any){
        prop.callback(type)
    }

    return (
        <div className='gap-4'>
            <p>{prop.message}</p>

            <div className='flex gap-4 justify-end mt-4'>
                <Button  onClick={()=>on_action("cancel")}>Cancel</Button>
                <Button color='secondary' onClick={()=>on_action("yes")}>Yes</Button>
            </div>
        </div>
    )
}

export default Confirmation