import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from './currentPage'

export default configureStore({
    reducer: {
        currentPage: currentPageReducer
    }
})