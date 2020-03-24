import React from 'react';
import { Checkbox } from 'semantic-ui-react'

const TickBox = ({service, checked, toggleService}) => {

    return (
        <div>
            <Checkbox
                toggle
                label={service.name}
                checked={!!checked}
                onClick={() => toggleService(service.id, checked)}
            />
        </div >
    )

}

export default TickBox
