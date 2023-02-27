import { useEffect } from "react"
import { useState } from "react"

const E_Commerse = () => {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("All")
    const [catagory, setCatagory] = useState([])
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(true)

    useEffect(() => {
        fetch(`https://dummyjson.com/products`).then((res) => {
            return res.json()
        }).then((data) => {
            setProduct(data.products)
        }).catch(e => {
            console.log(e)
        })
    },[])
    useEffect(() => {
        if (search === "All") {
            let arr = product.filter((items, i) => {
                return i <= 9 * count && i >= 9 * (count - 1)
            })
            setCatagory(arr)
        } else {
            setPage(false)
            let arr = product.filter((items) =>
                items.category === search)
            setCatagory(arr)
        }
    }, [search, product, count])

    // console.log(product)
    const Prev = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const Next = () => {
        if (count < 3) {
            setCount(count + 1)
        }
    }
    return (
        <>
            <div className="main">
                <div style={{ "marginTop": "30px" }}>
                    <select onChange={(e) => { setSearch(e.target.value) }} style={{ "width": "150px", "height": "22px" }}>
                        <option value="All" selected>All</option>
                        <option value="smartphones">smartphones</option>
                        <option value="laptops">laptops</option>
                        <option value="fragrances">fragrances</option>
                        <option value="groceries">groceries</option>
                        <option value="home-decoration">home-decoration</option>
                        {/* <option value="furniture">furniture</option>
                        <option value="tops">tops</option>
                        <option value="womens-dresses">womens-dresses</option>
                        <option value="womens-shoes">womens-shoes</option>
                        <option value="mens-shirts">mens-shirts</option>
                        <option value="mens-shoes">mens-shoes</option>
                        <option value="mens-watches">mens-watches</option>
                        <option value="womens-watches">womens-watches</option>
                        <option value="womens-bags">womens-bags</option>
                        <option value="womens-jewellery">womens-jewellery</option>
                        <option value="sunglasses">sunglasses</option>
                        <option value="automotive">automotive</option>
                        <option value="motorcycle">motorcycle</option>
                        <option value="lighting">lighting</option> */}
                    </select>
                </div>

                <div style={{ "marginTop": "60px", "display": "flex" }}>
                    {catagory.map((items, i) => {
                        return (
                            <>
                                <div className="container">
                                    <div className="img-div">
                                        <img src={items.thumbnail} alt="" style={{ "width": "250px", "height": "250px", "margin": "10px 40px" }} />
                                    </div>
                                    <div className="hover-div">
                                        <img src={items.thumbnail} alt="" style={{ "width": "150px", "height": "150px", "margin": "10px" }} />
                                        <p>{items.description}</p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </>)
                    })}
                </div>
               

                {page ?
                  <div>
                  <button onClick={Prev} >Prev</button>
                  <span> {count}</span>
                  <button onClick={Next}>Next</button>

              </div> : ""
                }
            </div>
           

        </>
    )
}
export default E_Commerse