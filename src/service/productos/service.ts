import { Response, request } from "../service";
import "../service";
import { GetProductOptionsResponse, Product, ProductPost, ProductPut } from "./interface";

export async function GetAllProducts(): Promise<Response<Product[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: "/api/Products"
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}

export async function GetProduct(id: string): Promise<Response<Product>> {
  try {
    console.log("ID: ", id);
    return await request({
      method: "GET",
      endpoint: `/api/Product/${id}`
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function GetProductOptions(id: string): Promise<Response<GetProductOptionsResponse[]>> {
  try {
    console.log("ID: ", id);
    return await request({
      method: "GET",
      endpoint: `/api/Product/products/${id}/options`
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function GetProductImages(id: string): Promise<Response<string[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Product/${id}/images`
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}

export async function DeleteProduct(id: string): Promise<Response<Product[]>> {
  try {
    return await request({
      method: "DELETE",
      endpoint: `/api/Products/${id}`
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function PostProduct(productPost: ProductPost) {
  try {
    const formData = new FormData();
    Object.keys(productPost).forEach((key) => {
      if (productPost[key as keyof ProductPost] != null)
        formData.append(key, productPost[key as keyof ProductPost]!);
    });
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "POST",
      endpoint: `/api/Product?Name=${productPost.name}&Price=${productPost.price}&WholesalePrice=${productPost.wholesalePrice}&MaxOrder=${productPost.maxOrder}&SubcategoryId=${productPost.subcategoryId}`,
      headers: {
        "Content-Type": `multipart/form-data;`
      },
      formData: formData
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function PutProduct(productPut: ProductPut) {
  try {
    const formData = new FormData();
    Object.keys(productPut).forEach((key) => {
      if (productPut[key as keyof ProductPut])
        formData.append(key, productPut[key as keyof ProductPost]!);
    });
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "PUT",
      endpoint: `/api/Product/${productPut.id}`,
      headers: {
        "Content-Type": `multipart/form-data;`
      },
      formData: formData
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function DeleteProductImage(id: string,position:number) {
  try {
    
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "DELETE",
      endpoint: `/api/Product/${id}/remove-image?position=${position}`,
      
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function PostProductImage(id:string,image:File) {
  try {
    const formData = new FormData();
    
        formData.append("image", image);
    
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "POST",
      endpoint: `/api/Product/${id}/add-image`,
      headers: {
        "Content-Type": `multipart/form-data;`
      },
      formData: formData
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
