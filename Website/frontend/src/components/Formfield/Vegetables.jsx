import React from 'react'

export default function Vegetables({checkList,handleCheck,formData}) {
  return (
    <div className="container text-center">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            <div className="col vegetables">
                {checkList.map((item, index) => (
                    <div className='vegetable' key={index}>
                        <input value={item} name={item} type="checkbox" onChange={handleCheck} />
                        <span style={{fontSize:"16px"}}>{item}</span>
                    </div>
                ))}
            </div>
            
            <div className="col checked-vegetables">
                <div className="tex-center">
                    <span style={{fontSize:"16px"}}>Items checked</span> 
                </div>
                <div className="veg">
                    {formData.vegetables.map((veg,index)=>(
                        <p style={{fontSize:"16px"}} key={`veg${index}`}>
                            {veg}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
