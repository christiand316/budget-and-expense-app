import React, { useEffect, useState } from "react";
import axios from "axios";
import NewGroupForm from "./NewGroupForm";
import GroupItem from "./GroupItem";

const BASE_URL = "http://localhost:3000";

function GroupSelect({ userData, activeGroup }) {
    const [isAddingGroup, setAddingGroup] = useState(false)
    const [userGroup, setUserGroup] = useState(null)


    async function addGroup(resObj) {
        const response = await axios.post(`${BASE_URL}/api/groups`, resObj)

        if (response.status === 200) {
            const budgetResponse = await axios.post(`${BASE_URL}/api/budgets`, { groupId: response.data.id })
        }
    }


    async function deleteGroup(id) {
        await axios.delete(`${BASE_URL}/api/groups/${id}`)
    
    }


    function handleAddGroup() {
        setAddingGroup(true)
    }
    function handleDoneAdding() {
        setAddingGroup(false)
    }

    function findGroup(id) {
        userGroup.forEach((group) => {
            if (group.id === id) {
                activeGroup(group)
            }
        })
    }
    useEffect(() => {
        async function fetchUserGroup() {
            const response = await axios
                .get(`${BASE_URL}/api/groups/${userData.id}`)

            if (response.status === 200) {
                return setUserGroup(response.data)
            }
        }
        fetchUserGroup()
    }, [userGroup])


    return (
        <div>
            {isAddingGroup ? (
                <>
                    <NewGroupForm addGroup={addGroup} handleDoneAdding={handleDoneAdding} ownerId={userData.id} />
                </>
            ) : (
                <>
                    <h1>Purchases</h1> <button className="add-expense" onClick={handleAddGroup}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-square"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></svg></button>
                </>
            )}
            {userGroup ? (
                <>
                    <div>
                        {userGroup.map((item, index) => (
                            <GroupItem
                                id={item.id}
                                ownerId={item.ownerId}
                                name={item.name}
                                key={index}
                                deleteGroup={deleteGroup}
                                findGroup={findGroup} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p> You must make a group</p>
                </>
            )}

        </div>
    )
}

export default GroupSelect

/**
 * if groups exist, map over them? otherwise display "you must make a group"
 */