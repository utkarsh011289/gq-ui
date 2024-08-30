import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STUDENTS } from './graphql/queries/GET_STUDENTS';



const Students = () => {
  const { loading, data, error } = useQuery(GET_STUDENTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <table border="2px">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Rno</th>
        <th>Location</th>
      </tr>
      {
        data?.getStudents?.map(({ _id,name,rno,loc }) => {
          return <tr>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{rno}</td>
            <td>{loc}</td>
          </tr>
        })
      }
    </table>
  )
}

export default Students;
