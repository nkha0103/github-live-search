import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsersByInput, resetSearchData } from './searchSlide'
import rateLimitApi from '../../../api/rateLimitApi'

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [percentCompleted, setPercentCompleted] = useState(0)
    const loading = useSelector(state => state.search.loadingStatus)
    const searchData = useSelector(state => state.search.searchData)
    const dispatch = useDispatch()

    let searchTimeout

    let currentPercentCompleted = 0
    let maxPercent = 90

    const handleInputChange = (inputValue) => {
        if (currentPercentCompleted != 0) {
            currentPercentCompleted = 0
            setPercentCompleted(currentPercentCompleted)
        }

        clearTimeout(searchTimeout)
        if (!inputValue) {
            setSearchValue('')
            dispatch(resetSearchData())
            return
        }

        searchTimeout = setTimeout(() => {
            setSearchValue(inputValue)
        }, 1000)
    }

    const handleSearchProgress = (progressEvent) => {
        console.log('completed: ', progressEvent)
        // Because the progressEvent does note have total value
        // We need to simulate the percentage caculation
        if (maxPercent > currentPercentCompleted) {
            currentPercentCompleted += 30
            setPercentCompleted(currentPercentCompleted)
        }
    }

    const renderProgres = () => {
        return ((loading || searchData.length > 0) &&
            <div className='progress w-80 h-1 m-auto'>
                <div className={`progress-bar bg-green-500 h-1 w-${percentCompleted}`}></div>
            </div>
        )
    }

    const handleSearch = async () => {
        try {
            if (!searchValue) return

            if (searchValue.length < 3) return alert('please input at least 3 characters')

            // Alert if API rate limit is exceeded
            const rateLimit = await rateLimitApi.getRateLimit()
            console.log('API rate limit remaining is ', rateLimit.rate.remaining)
            if (rateLimit.rate.remaining === 0) {
                const nextTime = new Date(rateLimit.rate.reset * 1000)
                const message = `Sorry!!! Rate limit exceeded. Try again after ${nextTime.toLocaleTimeString()}`
                alert(message)
                return
            }

            currentPercentCompleted = 10
            setPercentCompleted(currentPercentCompleted)

            await dispatch(searchUsersByInput({ searchValue, handleSearchProgress })).unwrap()

            setTimeout(() => {
                currentPercentCompleted = 100
                setPercentCompleted(currentPercentCompleted)
            }, 500);
        } catch (error) {
            console.log(error)
            setTimeout(() => {
                currentPercentCompleted = 0
                setPercentCompleted(currentPercentCompleted)
            }, 3000);
            alert(error.message)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [searchValue])

    return (
        <div className='search-input mt-14 mb-10'>
            <form onSubmit={(e) => e.preventDefault()}
                className='text-center'>
                <input type='text'
                    name='search'
                    className='border-2 border-gray-400 p-2 w-80'
                    placeholder='Enter search keyword'
                    onChange={(e) => handleInputChange(e.currentTarget.value)}
                />
                {renderProgres()}
            </form>
        </div>
    )
}

export default Search
