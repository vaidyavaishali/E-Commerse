import { useEffect } from "react"
import { useState } from "react"

const E_Commerse = () => {

    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("smartphones")
    const [count, setCount] = useState(0)
    const [descData, setDescData] = useState([])
    const [mouseHover, setMousehover] = useState(false)
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${search}?skip=${count * 1}&limit=4`).then((res) => {
            return res.json()
        }).then((data) => {
            setProduct(data.products)
        }).catch(e => {
            console.log(e)
        })
    }, [count, search])
    const Prev = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    const Next = () => {
        if (count < 2) {
            setCount(count + 1)
        }
    }

    const SeeDescription = (id) => {
        setMousehover(true)
        const arr = product.filter((items) => id === items.id)
        console.log(arr)
        setDescData(arr)
    }
    // console.log(descData)

    return (
        <>
            <div style={{ "marginTop": "30px" }}>
                <select onChange={(e) => { setSearch(e.target.value) }} style={{ "width": "150px", "height": "22px" }}>
                    <option value="smartphones">smartphones</option>
                    <option value="laptops">laptops</option>
                    <option value="fragrances">fragrances</option>
                    <option value="groceries">groceries</option>
                    <option value="home-decoration">home-decoration</option>
                    <option value="furniture">furniture</option>
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
                    <option value="lighting">lighting</option>
                </select>
            </div>

            <div style={{ "marginTop": "60px", "display": "flex" }}>
                {product.map((items, i) => {
                    return (
                        <>
                            {mouseHover ?
                                <span onClick={() => { setMousehover(false) }} style={{ "width": "330px", "height": "250px", "margin": "10px auto", "textAlign": "center", "display": "flex", "background": "#ccc", "justifyContent": "space-around" }} key={i} >
                                    <span>
                                        <img src={items.thumbnail} alt="Not Found" style={{ "width": "100px", "height": "150px", "margin": "10px" }} />
                                    </span>
                                    <span style={{ "margin": "10px auto", "textAlign": "center" }}>
                                        Description
                                        {items.description}
                                    </span>

                                </span> :
                                <span style={{ "width": "350px", "height": "250px", "margin": "10px auto", "textAlign": "center", "display": "flex", "justifyContent": "space-around" }}   >
                                    <img src={items.thumbnail} alt="Not Found" style={{ "width": "270px", "height": "270px", "margin": "auto" }} onClick={() => { SeeDescription(items.id) }} />
                                </span>


                            }
                        </>


                    )
                })}
            </div>
            <div>
                <button onClick={Prev} >Prev</button>
                <span> {count + 1}</span>
                <button onClick={Next}>Next</button>

            </div>

        </>
    )
}
export default E_Commerse