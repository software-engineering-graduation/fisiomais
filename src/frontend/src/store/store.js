import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from './currentPage'
import mediaDetailReducer from './mediaDetail'

export default configureStore({
    reducer: {
        currentPage: currentPageReducer,
        mediaDetail: mediaDetailReducer
    }
})