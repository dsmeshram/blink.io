'use client'
import { Skeleton } from '@nextui-org/react'
import React from 'react'

const EventLoading = () => {
    const array = [...Array(9)];
    return (
        <div className="w-full gap-3">
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="flex gap-4 text-center item-center m-4">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default EventLoading