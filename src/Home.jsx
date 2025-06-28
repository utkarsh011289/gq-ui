import React from 'react'
//import { useQuery } from '@apollo/client';
import { GET_STUDENTS } from './graphql/queries/GET_STUDENTS';
import { useLazyQuery } from '@apollo/client';





 const Home = () => {
  const [getStudents, { loading, error, data }] = useLazyQuery(GET_STUDENTS);

  const handleClick=( )=>{
        getStudents();
        }
 /* const { loading, data, error } = useQuery(GET_STUDENTS)*/
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return <div>
    <button className='btn btn-primary mb-3 mt-3' onClick={handleClick}>Get Users</button>
   {data && <table className='table table-bordered'>
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
    </table> }
  </div>
}

export default Home;
