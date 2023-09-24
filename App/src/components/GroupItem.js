import React, { useState } from "react";

function GroupItem({ id, ownerId, name, deleteGroup, findGroup }) {
    function handleDelete() {

        deleteGroup(id)
    }
    function handleSelect() {
        findGroup(id)
    }
    return (
        <div className="group-card">
            <div>
                <h3>{name}</h3>
            </div>
            <div>
                <button onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button>
            </div>
            <div>
                <button onClick={handleSelect}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg></button>
            </div>
        </div>
    )
}

export default GroupItem
