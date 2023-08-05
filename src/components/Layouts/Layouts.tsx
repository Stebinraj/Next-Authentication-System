import React from 'react'

const Layouts = ({ navbar, main, footer }: any) => {
    return (
        <>
            <div className="container-fluid min-h-screen flex flex-col p-0">
                {navbar}
                {main}
                {footer}
            </div>
        </>
    )
}

export default Layouts