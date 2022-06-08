import React from 'react'
import { useSelector } from 'react-redux'

export function UserTable() {
    const searchResultData = useSelector((state) => state.search.searchData)
    const loading = useSelector((state) => state.search.loadingStatus)
    const didSearch = useSelector((state) => state.search.didSearchStatus)

    const users = searchResultData

    return (
        <div className='users w-10/12 m-auto max-h-96 overflow-auto'>
            {loading && <p className='text-center'>Loading</p>}
            {!loading && !didSearch && <p className='text-center'>Please enter search keyword</p>}
            {!loading && didSearch && !users.length && <p className='text-center'>Have No Data</p>}
            {!loading && didSearch && users.length > 0 && <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>Avatar</th>
                        <th scope='col' className='px-6 py-3'>Login</th>
                        <th scope='col' className='px-6 py-3'>Type</th>
                        <th scope='col' className='px-6 py-3'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((userData) => (
                        <tr key={userData.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className='w-10'><img className='user-data--avatar w-6/12 rounded mx-auto' src={userData.avatar_url} alt={userData.login} /></td>
                            <td className='px-6 py-3'><a href={userData.html_url} target='_blank'>{userData.login}</a></td>
                            <td className='px-6 py-3'>{userData.type}</td>
                            <td className='px-6 py-3'>{Number.parseFloat(userData.score).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )
}

export default UserTable
