import React, { useState } from 'react';
import { Button } from '../Button';

function PageTest() {
    const [changesText, setChangesText] = useState(0)

    const textArr = [
        'This is 1 pages',
        'Hi the second pages',
        'Almost done! 3rd pages here',
        "Finally done"
    ]

    const handleNextButton = () => {
        if(changesText <3){
            setChangesText(changesText + 1)
        }else{
            setChangesText(changesText)
        }
    }
    return (
        <div>
            <h5 data-testid="text-alert">
            {textArr[changesText]}
            </h5>

            <Button data-testid="btn-next" primary label='Next' onClick={handleNextButton} />
        </div>
    );
}

export default PageTest;