import React from 'react'
interface LayoutHeaderProps {
    heading: string,
    subHeading?: string,
    searchBar?: React.ReactNode
    button?: React.ReactNode
}
const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>

                <p className="textH3Semi">
                    {props.heading}

                </p>
                <p className="text-[#4B5563] text-base leading-[24px]">
                    {props.subHeading}

                </p>
            </div>
            <div className="flex items-center gap-x-3">
                <div>
                    {props.searchBar}
                </div>
                <div>
                    {props.button}
                </div>
            </div>
        </div>
    )
}

export default LayoutHeader