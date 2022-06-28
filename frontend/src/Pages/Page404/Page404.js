import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Page404(){
    return(
        <div className='page404 d-flex justify-content-center align-items-center h-100'>
            <div className='container'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-10'>
                        <div className='content404 text-center'>
                            <h1>404</h1>
                            <span className='weight-300'>PAGE NOT FOUND</span>
                            <Link to='/report' className='font-detail mt-3'>Back to home page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404;