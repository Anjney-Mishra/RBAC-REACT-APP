const posts = [
    {
        id:1,
        title:"Product 1",
        description:"This is the body of product 1",
        category:"Electronics",
    },
    {
        id:2,
        title:"Product 2",
        description:"This is the body of product 2",
        category:"Outdoor",
    },
    {
        id:3,
        title:"Product 3",
        description:"This is the body of product 3",
        category:"Clothing",
    },
    {
        id:4,
        title:"Product 4",
        description:"This is the body of product 4",
        category:"Toys",
    },
    {
        id:5,
        title:"Product 5",
        description:"This is the body of product 5",
        category:"Electronics",
    },
    {
        id:6,
        title:"Product 6",
        description:"This is the body of product 6",
        category:"Clothing",
    }
]

export const initialiseProductsToLS = () => {
    const existingProduct = JSON.parse(localStorage.getItem("products"));
    if(!existingProduct){
        localStorage.setItem("products",JSON.stringify(posts));
    }
}