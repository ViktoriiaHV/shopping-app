import { CartProduct, cartReducer } from "./cartReducer";

function createProduct({
  id = "id",
  name = "name",
  description = "description",
  price = 100,
  imgUrl = "imgUrl",
  quantity = 1,
  totalPrice = 100,
}: Partial<CartProduct> = {}): CartProduct {
  return {
    id,
    name,
    description,
    price,
    imgUrl,
    quantity,
    totalPrice,
  };
}

describe("cartReducer", () => {
  describe("ADD_TO_CART", () => {
    it("should add product to cart", () => {
      //given:
      const product = createProduct({ price: 25, id: "1" });

      //when:
      const result = cartReducer(
        { products: [], total: 0 },
        { type: "ADD_TO_CART", payload: product }
      );

      //then:
      expect(result).toEqual({ products: [product], total: 25 });
    });

    it("should update quantity and total price", () => {
      //given:
      const product = createProduct({ price: 25, id: "1" });
      const existingProduct = createProduct({ price: 30, id: "2" });

      //when:
      const result = cartReducer(
        { products: [existingProduct, product], total: 55 },
        { type: "ADD_TO_CART", payload: { ...product } }
      );

      //then:
      expect(result).toEqual({
        products: [
          existingProduct,
          { ...product, quantity: 2, totalPrice: 50 },
        ],
        total: 80,
      });
    });

    it("should add another product", () => {
      //given:
      const existingProduct = createProduct({ price: 30, id: "2" });
      const product = createProduct({ price: 25, id: "1" });

      //when:
      const result = cartReducer(
        { products: [existingProduct], total: existingProduct.price },
        { type: "ADD_TO_CART", payload: product }
      );

      //then:
      expect(result).toEqual({
        products: [existingProduct, product],
        total: 55,
      });
    });
  });

  describe("REMOVE_FROM_CART", () => {
    it("should remove the only product", () => {
      //given:
      const product = createProduct({ price: 25, id: "1" });

      //when:
      const result = cartReducer(
        { products: [product], total: 25 },
        { type: "REMOVE_FROM_CART", payload: product }
      );

      //then:
      expect(result).toEqual({ products: [], total: 0 });
    });

    it("should update quantity and total price", () => {
      //given:
      const product = createProduct({
        price: 25,
        id: "1",
        quantity: 2,
        totalPrice: 50,
      });

      //when:
      const result = cartReducer(
        { products: [product], total: 50 },
        { type: "REMOVE_FROM_CART", payload: { ...product } }
      );

      //then:
      expect(result).toEqual({
        products: [{ ...product, quantity: 1, totalPrice: 25 }],
        total: 25,
      });
    });

    it("should remove one of the existing products", () => {
      //given:
      const product = createProduct({ price: 25, id: "1" });
      const product2 = createProduct({ price: 15, id: "2" });

      //when:
      const result = cartReducer(
        { products: [product, product2], total: 40 },
        { type: "REMOVE_FROM_CART", payload: product }
      );

      //then:
      expect(result).toEqual({ products: [product2], total: 15 });
    });
  });

  describe("EMPTY_CART", () => {
    it("should empty the cart", () => {
      const result = cartReducer(
        {
          products: [createProduct(), createProduct()],
          total: 1000,
        },
        { type: "EMPTY_CART" }
      );

      expect(result).toEqual({
        products: [],
        total: 0,
      });
    });
  });

  describe("REMOVE_ITEM", () => {
    it("should remove the product if 1", () => {
      const product = createProduct({ price: 25, id: "1", quantity: 1, totalPrice: 25 });
      const product2 = createProduct({ price: 15, id: "2", quantity: 2, totalPrice: 30 });

      const result = cartReducer(
        { products: [product, product2], total: 55 },
        { type: "REMOVE_ITEM", payload: product }
      );

      expect(result).toEqual({
        products: [product2],
        total: 30,
      });
    });

    it("should remove the product if more than 1", () => {
      const product = createProduct({ price: 25, id: "1", quantity: 3, totalPrice: 75 });
      const product2 = createProduct({ price: 15, id: "2", quantity: 2, totalPrice: 30 });

      const result = cartReducer(
        { products: [product, product2], total: 105 },
        { type: "REMOVE_ITEM", payload: product }
      );

      expect(result).toEqual({
        products: [product2],
        total: 30,
      });
    });
  });
});
