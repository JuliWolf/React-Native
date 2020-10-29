class Product {
    constructor(id, ownerId, title, imageUrl, description, price, pushToken) {
        this.id = id;
        this.ownerId = ownerId;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.price = price;
        this.pushToken = pushToken;
    }
}

export default Product;