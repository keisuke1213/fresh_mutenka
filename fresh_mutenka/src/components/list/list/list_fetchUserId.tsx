"use client" 

import React from 'react'
import useSWR from 'swr'
import List from './list'

const fetcher = url => fetch(url).then(r => r.json())
const user_id = "7677e7cd-f1bc-4124-a42d-e80f5da3fedd"

const ListFetchUserId = () => {
  const { data, error } = useSWR(`/api/goal/getCurrentGoal/${user_id}`, fetcher)

  if (!data) { return <div>loading</div> }
  const goal_id = data.goals[0].id

  console.log("goals-data", { data })
  console.log("goals-id", { goal_id });
  
  return (
    <>
      <List goalId={goal_id} />
    </>
  )
}
export default ListFetchUserId