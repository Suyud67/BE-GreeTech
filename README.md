# ⚠ Attention ⚠
Sorry this API cannot access for a moment

# BE-GreeTech
  API for GreeTech App build with:
- [NodeJs](https://nodejs.org/)
- Database [MongoDB](https://www.mongodb.com/)
- Hosting API [Render](render.com)

## How to use this API?
  Main URL: https://be-greetech.onrender.com <br/>
  You can use this command for using the API:
  - `/products` get all plant product
  - `/product/detail/:id` get a plant product by id product
  - `/product/add` add a plant product
  
  ### Handle POST Request
  To insert data form use FormData() and you dont need to use `enctype="multipart/data-form` in your form</br>
  ```
  const product = new FormData();
  product.append(fieldName, value) // this is for add your data from field form
  ```
  or if you use upload file method in your form area use this:
  ```
  const product = new FormData();
  product.append(fieldName, objectImg, objectImgName)
  // to get objectImg use files[0] on your field input (type="file")
  // to get obejctImgName use files[0].name from object objectImg
  ```
  example:
  ```
  const product = new FormData();
  product.append('img_product', plant.img_product, plant.img_product.name);
  ```
## Open Discuss
  If you have any suggestion or idea for this API, you can pull and we will discuss it.
